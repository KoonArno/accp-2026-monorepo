import { FastifyInstance } from "fastify";
import { db } from "@accp/database";
import { registrations, ticketTypes, events, users } from "@accp/database/schema";
import { registrationListSchema, updateRegistrationSchema } from "../../schemas/registrations.schema.js";
import { eq, desc, ilike, and, count, sql } from "drizzle-orm";

export default async function (fastify: FastifyInstance) {
    // List Registrations
    fastify.get("", async (request, reply) => {
        const queryResult = registrationListSchema.safeParse(request.query);
        if (!queryResult.success) {
            return reply.status(400).send({ error: "Invalid query", details: queryResult.error.flatten() });
        }

        const { page, limit, search, eventId, status, ticketTypeId } = queryResult.data;
        const offset = (page - 1) * limit;

        try {
            const conditions = [];
            if (eventId) conditions.push(eq(registrations.eventId, eventId));
            if (status) conditions.push(eq(registrations.status, status));
            if (ticketTypeId) conditions.push(eq(registrations.ticketTypeId, ticketTypeId));
            if (search) {
                conditions.push(
                    or(
                        ilike(registrations.firstName, `%${search}%`),
                        ilike(registrations.lastName, `%${search}%`),
                        ilike(registrations.email, `%${search}%`),
                        ilike(registrations.regCode, `%${search}%`)
                    )
                );
            }

            const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

            // Count total
            const [{ totalCount }] = await db
                .select({ totalCount: count() })
                .from(registrations)
                .where(whereClause);

            // Fetch data
            const registrationList = await db
                .select({
                    id: registrations.id,
                    regCode: registrations.regCode,
                    firstName: registrations.firstName,
                    lastName: registrations.lastName,
                    email: registrations.email,
                    status: registrations.status,
                    createdAt: registrations.createdAt,
                    ticketName: ticketTypes.name,
                    eventName: events.eventName,
                    eventCode: events.eventCode,
                })
                .from(registrations)
                .leftJoin(ticketTypes, eq(registrations.ticketTypeId, ticketTypes.id))
                .leftJoin(events, eq(registrations.eventId, events.id))
                .where(whereClause)
                .orderBy(desc(registrations.createdAt))
                .limit(limit)
                .offset(offset);

            return reply.send({
                registrations: registrationList,
                pagination: {
                    page,
                    limit,
                    total: totalCount,
                    totalPages: Math.ceil(totalCount / limit),
                },
            });
        } catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ error: "Failed to fetch registrations" });
        }
    });

    // Update Registration
    fastify.patch("/:id", async (request, reply) => {
        const { id } = request.params as { id: string };
        const result = updateRegistrationSchema.safeParse(request.body);

        if (!result.success) {
            return reply.status(400).send({ error: "Invalid input", details: result.error.flatten() });
        }

        try {
            const [updatedReg] = await db
                .update(registrations)
                .set(result.data)
                .where(eq(registrations.id, parseInt(id)))
                .returning();

            if (!updatedReg) return reply.status(404).send({ error: "Registration not found" });
            return reply.send({ registration: updatedReg });
        } catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ error: "Failed to update registration" });
        }
    });
}

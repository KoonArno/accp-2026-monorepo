import { FastifyInstance } from "fastify";
import { db } from "@accp/database";
import { ticketTypes, events } from "@accp/database/schema";
import { eq, desc, ilike, and, count } from "drizzle-orm";
import { z } from "zod";

const ticketQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(20),
    search: z.string().optional(),
    eventId: z.coerce.number().optional(),
});

export default async function (fastify: FastifyInstance) {
    // List All Tickets (Global View)
    fastify.get("", async (request, reply) => {
        const queryResult = ticketQuerySchema.safeParse(request.query);
        if (!queryResult.success) {
            return reply.status(400).send({ error: "Invalid query", details: queryResult.error.flatten() });
        }

        const { page, limit, search, eventId } = queryResult.data;
        const offset = (page - 1) * limit;

        try {
            const conditions = [];
            if (eventId) conditions.push(eq(ticketTypes.eventId, eventId));
            if (search) {
                conditions.push(
                    ilike(ticketTypes.name, `%${search}%`)
                );
            }

            const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

            // Count total
            const [{ totalCount }] = await db
                .select({ totalCount: count() })
                .from(ticketTypes)
                .where(whereClause);

            // Fetch data
            const tickets = await db
                .select({
                    id: ticketTypes.id,
                    eventId: ticketTypes.eventId,
                    code: ticketTypes.groupName, // Using groupName as code/category grouping roughly
                    name: ticketTypes.name,
                    category: ticketTypes.category,
                    price: ticketTypes.price,
                    quota: ticketTypes.quota,
                    sold: ticketTypes.soldCount,
                    startDate: ticketTypes.saleStartDate,
                    endDate: ticketTypes.saleEndDate,
                    eventCode: events.eventCode,
                })
                .from(ticketTypes)
                .leftJoin(events, eq(ticketTypes.eventId, events.id))
                .where(whereClause)
                .orderBy(desc(ticketTypes.id))
                .limit(limit)
                .offset(offset);

            return reply.send({
                tickets,
                pagination: {
                    page,
                    limit,
                    total: totalCount,
                    totalPages: Math.ceil(totalCount / limit),
                },
            });
        } catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ error: "Failed to fetch tickets" });
        }
    });
}

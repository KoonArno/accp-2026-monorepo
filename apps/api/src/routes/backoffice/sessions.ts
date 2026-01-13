import { FastifyInstance } from "fastify";
import { db } from "@accp/database";
import { sessions, events } from "@accp/database/schema";
import { eq, desc, ilike, and, count } from "drizzle-orm";
import { z } from "zod";

const sessionQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(20),
    search: z.string().optional(),
    eventId: z.coerce.number().optional(),
});

export default async function (fastify: FastifyInstance) {
    // List All Sessions (Global View)
    fastify.get("", async (request, reply) => {
        const queryResult = sessionQuerySchema.safeParse(request.query);
        if (!queryResult.success) {
            return reply.status(400).send({ error: "Invalid query", details: queryResult.error.flatten() });
        }

        const { page, limit, search, eventId } = queryResult.data;
        const offset = (page - 1) * limit;

        try {
            const conditions = [];
            if (eventId) conditions.push(eq(sessions.eventId, eventId));
            if (search) {
                conditions.push(
                    ilike(sessions.sessionName, `%${search}%`)
                );
            }

            const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

            // Count total
            const [{ totalCount }] = await db
                .select({ totalCount: count() })
                .from(sessions)
                .where(whereClause);

            // Fetch data
            const sessionsList = await db
                .select({
                    id: sessions.id,
                    eventId: sessions.eventId,
                    sessionCode: sessions.sessionCode,
                    sessionName: sessions.sessionName,
                    startTime: sessions.startTime,
                    endTime: sessions.endTime,
                    room: sessions.room,
                    eventCode: events.eventCode,
                })
                .from(sessions)
                .leftJoin(events, eq(sessions.eventId, events.id))
                .where(whereClause)
                .orderBy(desc(sessions.startTime))
                .limit(limit)
                .offset(offset);

            return reply.send({
                sessions: sessionsList,
                pagination: {
                    page,
                    limit,
                    total: totalCount,
                    totalPages: Math.ceil(totalCount / limit),
                },
            });
        } catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ error: "Failed to fetch sessions" });
        }
    });
}

import { FastifyInstance } from "fastify";
import { db } from "@accp/database";
import { speakers } from "@accp/database/schema";
import { createSpeakerSchema, updateSpeakerSchema } from "../../schemas/speakers.schema.js";
import { eq, desc, ilike, or } from "drizzle-orm";

export default async function (fastify: FastifyInstance) {
    // List Speakers
    fastify.get("", async (request, reply) => {
        try {
            const speakerList = await db
                .select()
                .from(speakers)
                .orderBy(desc(speakers.createdAt));
            return reply.send({ speakers: speakerList });
        } catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ error: "Failed to fetch speakers" });
        }
    });

    // Create Speaker
    fastify.post("", async (request, reply) => {
        const result = createSpeakerSchema.safeParse(request.body);
        if (!result.success) {
            return reply.status(400).send({ error: "Invalid input", details: result.error.flatten() });
        }

        try {
            const [newSpeaker] = await db.insert(speakers).values(result.data).returning();
            return reply.status(201).send({ speaker: newSpeaker });
        } catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ error: "Failed to create speaker" });
        }
    });

    // Update Speaker
    fastify.patch("/:id", async (request, reply) => {
        const { id } = request.params as { id: string };
        const result = updateSpeakerSchema.safeParse(request.body);
        if (!result.success) {
            return reply.status(400).send({ error: "Invalid input", details: result.error.flatten() });
        }

        try {
            const [updatedSpeaker] = await db
                .update(speakers)
                .set(result.data)
                .where(eq(speakers.id, parseInt(id)))
                .returning();

            if (!updatedSpeaker) return reply.status(404).send({ error: "Speaker not found" });
            return reply.send({ speaker: updatedSpeaker });
        } catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ error: "Failed to update speaker" });
        }
    });

    // Delete Speaker
    fastify.delete("/:id", async (request, reply) => {
        const { id } = request.params as { id: string };
        try {
            const [deletedSpeaker] = await db
                .delete(speakers)
                .where(eq(speakers.id, parseInt(id)))
                .returning();

            if (!deletedSpeaker) return reply.status(404).send({ error: "Speaker not found" });
            return reply.send({ success: true, message: "Speaker deleted" });
        } catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ error: "Failed to delete speaker" });
        }
    });
}

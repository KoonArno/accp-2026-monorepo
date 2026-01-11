import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";

const fastify = Fastify({ logger: true });

// Register plugins
fastify.register(cors, { origin: true });

// Health check
fastify.get("/health", async () => ({
  status: "ok",
  timestamp: new Date().toISOString(),
}));

// API root
fastify.get("/", async () => ({
  name: "ACCP Conference API",
  version: "1.0.0",
}));

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: 3002, host: "0.0.0.0" });
    console.log("🚀 API running on http://localhost:3002");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

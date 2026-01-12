import "./config/env"; // Must be first!
import Fastify from "fastify";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";

const fastify = Fastify({ logger: true });

// Register plugins
fastify.register(cors, { origin: true });
fastify.register(multipart, {
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

// Register routes
import { authRoutes } from "./routes/auth/register.js";
import loginRoutes from "./routes/auth/login.js";
import { uploadRoutes } from "./routes/upload/index.js";

fastify.register(authRoutes, { prefix: "/auth" });
fastify.register(loginRoutes, { prefix: "/auth" });
fastify.register(uploadRoutes, { prefix: "/upload" });

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

import "./config/env"; // Must be first!
import Fastify from "fastify";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";
import jwt from "@fastify/jwt";

const fastify = Fastify({ logger: true });

// Register plugins
fastify.register(cors, { origin: true });
fastify.register(multipart, {
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});
fastify.register(jwt, {
  secret: process.env.JWT_SECRET || "change-me-in-production",
});

// Register routes
import { authRoutes } from "./routes/auth/register.js";
import loginRoutes from "./routes/auth/login.js";
import { uploadRoutes } from "./routes/upload/index.js";
import backofficeLoginRoutes from "./routes/backoffice/login.js";
import backofficeUsersRoutes from "./routes/backoffice/users.js";
import backofficeVerificationsRoutes from "./routes/backoffice/verifications.js";
import backofficeEventsRoutes from "./routes/backoffice/events.js";
import backofficeSpeakersRoutes from "./routes/backoffice/speakers.js";
import backofficeRegistrationsRoutes from "./routes/backoffice/registrations.js";
import backofficeAbstractsRoutes from "./routes/backoffice/abstracts.js";
import backofficeCheckinsRoutes from "./routes/backoffice/checkins.js";
import backofficeTicketsRoutes from "./routes/backoffice/tickets.js";
import backofficeSessionsRoutes from "./routes/backoffice/sessions.js";

fastify.register(authRoutes, { prefix: "/auth" });
fastify.register(loginRoutes, { prefix: "/auth" });
fastify.register(uploadRoutes, { prefix: "/upload" });
fastify.register(backofficeLoginRoutes, { prefix: "/backoffice" });
fastify.register(backofficeUsersRoutes, { prefix: "/api/backoffice/users" });
fastify.register(backofficeVerificationsRoutes, { prefix: "/api/backoffice/verifications" });
fastify.register(backofficeEventsRoutes, { prefix: "/api/backoffice/events" });
fastify.register(backofficeSpeakersRoutes, { prefix: "/api/backoffice/speakers" });
fastify.register(backofficeRegistrationsRoutes, { prefix: "/api/backoffice/registrations" });
fastify.register(backofficeAbstractsRoutes, { prefix: "/api/backoffice/abstracts" });
fastify.register(backofficeCheckinsRoutes, { prefix: "/api/backoffice/checkins" });
fastify.register(backofficeTicketsRoutes, { prefix: "/api/backoffice/tickets" });
fastify.register(backofficeSessionsRoutes, { prefix: "/api/backoffice/sessions" });

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

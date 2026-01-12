import path from "path";
import dotenv from "dotenv";

// Load env from root (monorepo structure)
const rootEnvPath = path.resolve(process.cwd(), "../../.env");
dotenv.config({ path: rootEnvPath });
console.log("Loaded env from:", rootEnvPath);
console.log("DATABASE_URL present:", !!process.env.DATABASE_URL);

import { FastifyInstance } from "fastify";
import { registerBodySchema, RegisterInput } from "../../schemas/auth.schema";
import { db } from "@accp/database";
import { users } from "@accp/database/schema";
import bcrypt from "bcryptjs";
import { eq, or } from "drizzle-orm";

const roleMapping = {
  thaiStudent: "thstd",
  internationalStudent: "interstd",
  thaiProfessional: "thpro",
  internationalProfessional: "interpro",
} as const;

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: RegisterInput }>(
    "/register",
    {}, // schema removed to avoid type issues, manual validation below
    async (request, reply) => {
      // Validate body manually
      const result = registerBodySchema.safeParse(request.body);
      if (!result.success) {
        return reply.status(400).send({
          success: false,
          error: result.error.errors[0].message,
        });
      }
      
      const {
        firstName,
        lastName,
        email,
        password,
        accountType,
        organization,
        idCard,
        passportId,
        pharmacyLicenseId,
        country,
        phone,
        verificationDocUrl,
      } = result.data;

      // 1. Check duplicate email
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (existingUser.length > 0) {
        return reply.status(409).send({
          success: false,
          error: "Email already exists",
        });
      }

      // 2. Check duplicate ID Card (if provided)
      if (idCard) {
        const existingIdCard = await db
          .select()
          .from(users)
          .where(eq(users.thaiIdCard, idCard))
          .limit(1);

        if (existingIdCard.length > 0) {
          return reply.status(409).send({
            success: false,
            error: "Thai ID Card already registered",
          });
        }
      }

      // 3. Check duplicate Passport (if provided)
      if (passportId) {
        const existingPassport = await db
          .select()
          .from(users)
          .where(eq(users.passportId, passportId))
          .limit(1);

        if (existingPassport.length > 0) {
          return reply.status(409).send({
            success: false,
            error: "Passport ID already registered",
          });
        }
      }
      
      // Check duplicate Pharmacy License (if provided)
      if (pharmacyLicenseId) {
        const existingLicense = await db
          .select()
          .from(users)
          .where(eq(users.pharmacyLicenseId, pharmacyLicenseId))
          .limit(1);

        if (existingLicense.length > 0) {
            return reply.status(409).send({
              success: false,
              error: "Pharmacy License Number already registered",
            });
        }
      }

      // 4. Hash password
      const passwordHash = await bcrypt.hash(password, 12);

      // 5. Determine role & country
      const role = roleMapping[accountType];
      const userCountry =
        accountType === "thaiStudent" || accountType === "thaiProfessional"
          ? "Thailand"
          : country;

      // 6. Insert user
      try {
        const [newUser] = await db
          .insert(users)
          .values({
            email,
            passwordHash,
            role,
            firstName,
            lastName,
            country: userCountry,
            institution: organization || null,
            phone: phone || null,
            thaiIdCard: idCard || null,
            passportId: passportId || null,
            pharmacyLicenseId: pharmacyLicenseId || null,
            verificationDocUrl: verificationDocUrl || null,
            status: "pending_approval", // Always pending initially, or adjust based on logic
          })
          .returning();

        return reply.status(201).send({
          success: true,
          user: {
            id: newUser.id,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            role: newUser.role,
            status: newUser.status,
          },
        });
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send({
          success: false,
          error: "Internal server error",
        });
      }
    }
  );
}

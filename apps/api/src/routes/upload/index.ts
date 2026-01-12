import { FastifyInstance, FastifyRequest } from "fastify";
import { uploadToGoogleDrive } from "../../services/googleDrive.js";

// Allowed file types
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
];

// Max file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function uploadRoutes(fastify: FastifyInstance) {
  /**
   * POST /upload/verify-doc
   * Upload student verification document to Google Drive
   */
  fastify.post("/verify-doc", async (request, reply) => {
    try {
      // Get the uploaded file
      const data = await request.file();

      if (!data) {
        return reply.status(400).send({
          success: false,
          error: "No file uploaded",
        });
      }

      // Validate file type
      if (!ALLOWED_MIME_TYPES.includes(data.mimetype)) {
        return reply.status(400).send({
          success: false,
          error: "Invalid file type. Only PDF, JPG, and PNG are allowed.",
        });
      }

      // Read file buffer
      const chunks: Buffer[] = [];
      for await (const chunk of data.file) {
        chunks.push(chunk);
      }
      const fileBuffer = Buffer.concat(chunks);

      // Validate file size
      if (fileBuffer.length > MAX_FILE_SIZE) {
        return reply.status(400).send({
          success: false,
          error: "File too large. Maximum size is 10MB.",
        });
      }

      // Upload to Google Drive
      const url = await uploadToGoogleDrive(
        fileBuffer,
        data.filename,
        data.mimetype
      );

      return reply.status(200).send({
        success: true,
        url,
        filename: data.filename,
      });
    } catch (error) {
      fastify.log.error(error);
      
      // Check for specific Google Drive errors
      if (error instanceof Error) {
        if (error.message.includes("GOOGLE_SERVICE_ACCOUNT_KEY")) {
          return reply.status(500).send({
            success: false,
            error: "Google Drive not configured. Please contact administrator.",
          });
        }
        if (error.message.includes("GOOGLE_DRIVE_FOLDER_ID")) {
          return reply.status(500).send({
            success: false,
            error: "Google Drive folder not configured. Please contact administrator.",
          });
        }
      }

      return reply.status(500).send({
        success: false,
        error: "Failed to upload file. Please try again.",
      });
    }
  });
}

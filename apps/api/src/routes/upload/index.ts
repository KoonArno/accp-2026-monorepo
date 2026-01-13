import { FastifyInstance, FastifyRequest } from "fastify";
import { uploadToGoogleDrive, UploadFolderType } from "../../services/googleDrive.js";

// Allowed file types
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
];

// Max file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Helper function to handle file upload
async function handleFileUpload(
  request: FastifyRequest,
  folderType: UploadFolderType
) {
  const data = await request.file();

  if (!data) {
    return { success: false, status: 400, error: "No file uploaded" };
  }

  // Validate file type
  if (!ALLOWED_MIME_TYPES.includes(data.mimetype)) {
    return {
      success: false,
      status: 400,
      error: "Invalid file type. Only PDF, JPG, and PNG are allowed.",
    };
  }

  // Read file buffer
  const chunks: Buffer[] = [];
  for await (const chunk of data.file) {
    chunks.push(chunk);
  }
  const fileBuffer = Buffer.concat(chunks);

  // Validate file size
  if (fileBuffer.length > MAX_FILE_SIZE) {
    return {
      success: false,
      status: 400,
      error: "File too large. Maximum size is 10MB.",
    };
  }

  // Upload to Google Drive
  const url = await uploadToGoogleDrive(
    fileBuffer,
    data.filename,
    data.mimetype,
    folderType
  );

  return {
    success: true,
    status: 200,
    url,
    filename: data.filename,
  };
}

export async function uploadRoutes(fastify: FastifyInstance) {
  /**
   * POST /upload/verify-doc
   * Upload student verification document to Google Drive (student_docs folder)
   */
  fastify.post("/verify-doc", async (request, reply) => {
    try {
      const result = await handleFileUpload(request, "student_docs");
      return reply.status(result.status).send(result);
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({
        success: false,
        error: "Failed to upload file. Please try again.",
      });
    }
  });

  /**
   * POST /upload/abstract
   * Upload abstract document to Google Drive (abstracts folder)
   */
  fastify.post("/abstract", async (request, reply) => {
    try {
      const result = await handleFileUpload(request, "abstracts");
      return reply.status(result.status).send(result);
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({
        success: false,
        error: "Failed to upload abstract. Please try again.",
      });
    }
  });
}

import express from "express";
import upload from "../middleware/multer.middleware.js";
import cloudinaryConnect from "../config/cloudinary.config.js";

const router = express.Router();

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileBase64 = `data:${
      req.file.mimetype
    };base64,${req.file.buffer.toString("base64")}`;

    const result = await cloudinaryConnect().uploader.upload(fileBase64, {
      folder: "uploads",
    });

    res
      .status(200)
      .json({ message: "File uploaded successfully", url: result.secure_url });
  } catch (error) {
    res.status(500).json({ error: "Upload failed" });
    console.error(error);
  }
});

/**
 * 🔹 Multiple files (same field)
 * POST /api/upload/multiple
 * form-data: { files: [file1, file2, ...] }
 */
router.post("/multiple", upload.array("files", 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const uploadResults = await Promise.all(
      req.files.map((file) => {
        const fileBase64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
        return cloudinaryConnect.uploader.upload(fileBase64, {
          folder: "my_uploads",
        });
      })
    );

    res.json({
      message: "Files uploaded successfully",
      files: uploadResults.map((file) => ({
        url: file.secure_url,
        public_id: file.public_id,
      })),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * 🔹 Multiple fields upload
 * POST /api/upload/fields
 * form-data: { profilePic: <file>, resume: <file>, banner: <file> }
 */
router.post(
  "/fields",
  upload.fields([
    { name: "10th_marksheet", maxCount: 1 },
    { name: "resume", maxCount: 1 },
    { name: "12th_marksheet", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      if (!req.files) {
        return res.status(400).json({ error: "No files uploaded" });
      }

      const uploadedFiles = {};

      for (const field in req.files) {
        const file = req.files[field][0];
        const fileBase64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
        const result = await cloudinaryConnect.uploader.upload(fileBase64, {
          folder: `my_uploads/${field}`,
        });

        uploadedFiles[field] = {
          url: result.secure_url,
          public_id: result.public_id,
        };
      }

      res.json({
        message: "Files uploaded successfully",
        files: uploadedFiles,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;
import { model, Schema } from "mongoose";
import { withBase } from "@/models/common/Base.js";

const attachmentSchema = withBase(
  new Schema({
    ownerOrgId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      index: true,
    },
    ownerUserId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    filename: { type: String, required: true },
    mimeType: { type: String, required: true },
    sizeBytes: { type: Number, required: true, min: 0 },
    storage: {
      kind: { type: String, enum: ["s3", "gcs", "gridfs"], required: true },
      key: { type: String, required: true },
      bucket: { type: String },
    },
    tags: [{ type: String }],
  })
);

const Attachment = model("Attachment", attachmentSchema);

export { Attachment };

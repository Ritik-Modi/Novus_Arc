import { model, Schema } from "mongoose";
import { withBase } from "@/models/common/base.js";

const EmailTemplateSchema = withBase(
  new Schema({
    orgId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true,
    },
    key: { type: String, required: true, index: true }, // job_published, round_updated, shortlist, offer
    name: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    version: { type: Number, required: true, default: 1 },
    active: { type: Boolean, default: true, index: true },
  })
);

EmailTemplateSchema.index({ orgId: 1, key: 1, version: 1 }, { unique: true });

const EmailTemplate = model("EmailTemplate", EmailTemplateSchema);

export { EmailTemplate };

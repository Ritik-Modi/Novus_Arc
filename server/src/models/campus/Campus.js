import { model, Schema } from "mongoose";
import { withBase } from "@/models/base/Base.js";

const campusSchema = withBase(
  new Schema({
    orgId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true,
    },
    code: { type: String, index: true },
    batches: [{ name: String, startYear: Number, endYear: Number }],
    settings: { type: Schema.Types.Mixed },
  })
);

const Campus = model("Campus", campusSchema);

export { Campus };

import { model, Schema } from "mongoose";
import { withBase } from "@/models/common/Base.js";

const organizationSchema = withBase(
  new Schema({
    kind: {
      type: String,
      enum: ["campus", "company"],
      required: true,
      index: true,
    },
    orgSerial: { type: String, required: true, index: true, unique: true },
    name: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: false },
    addresses: [
      {
        line1: String,
        line2: String,
        city: String,
        state: String,
        country: String,
        zip: String,
      },
    ],
    settings: { type: Schema.Types.Mixed },
  })
);

const Organization = model("Organization", organizationSchema);
export { Organization };

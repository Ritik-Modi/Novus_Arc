import { model, Schema } from "mongoose";
import { withBase } from "../common/base";

const RegistrationSchema = withBase(
  new Schema({
    email: { type: String, required: true, lowercase: true, index: true },
    kind: { type: String, enum: ["campus", "company"], required: true },
    orgName: { type: String, required: true },
    verificationToken: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    verifiedAt: { type: Date },
    createdOrgId: { type: Schema.Types.ObjectId, ref: "Organization" },
  })
);

const Registration = model("Registration", RegistrationSchema);
export { Registration };

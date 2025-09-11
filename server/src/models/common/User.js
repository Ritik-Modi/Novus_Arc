import { model, Schema } from "mongoose";
import { withBase } from "@/models/common/Base.js";

const userSchema = withBase(
  new Schema({
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    mobile: { type: String, required: false },
    isActive: { type: Boolean, default: true },
    authProviders: [
      {
        provider: { type: String, enum: ["password", "google", "sso"] },
        sub: { type: String },
      },
    ],
    lastloginAt: { type: Date, default: null },
  })
);

const User = model("User", userSchema);

export { User };

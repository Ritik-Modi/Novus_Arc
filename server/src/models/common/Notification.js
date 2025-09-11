import { model, Schema } from "mongoose";
import { withBase } from "@/models/common/base.js";

const NotificationSchema = withBase(
  new Schema({
    toUserIds: [{ type: Schema.Types.ObjectId, ref: "User", index: true }],
    toOrgRoles: [
      {
        orgId: { type: Schema.Types.ObjectId, ref: "Organization" },
        role: { type: String },
      },
    ],
    channel: { type: String, enum: ["email", "app"], required: true },
    subject: { type: String },
    body: { type: String },
    templateKey: { type: String },
    variables: { type: Schema.Types.Mixed },
    scheduledAt: { type: Date, index: true },
    sentAt: { type: Date, index: true },
    status: {
      type: String,
      enum: ["queued", "sent", "failed", "canceled"],
      default: "queued",
      index: true,
    },
    error: { type: String },
  })
);

const Notification = model("Notification", NotificationSchema);

export { Notification };

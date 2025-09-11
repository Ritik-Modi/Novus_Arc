import { model, Schema } from "mongoose";
import { withBase } from "@/models/common/base.js";

const AuditLogSchema = withBase(
  new Schema({
    entityType: { type: String, required: true, index: true },
    entityId: { type: Schema.Types.Mixed, required: true, index: true },
    action: { type: String, required: true, index: true },
    actorId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    before: { type: Schema.Types.Mixed },
    after: { type: Schema.Types.Mixed },
    reason: { type: String },
  })
);

AuditLogSchema.index({
  tenantId: 1,
  entityType: 1,
  entityId: 1,
  createdAt: -1,
});

const AuditLog = model("AuditLog", AuditLogSchema);
export { AuditLog };

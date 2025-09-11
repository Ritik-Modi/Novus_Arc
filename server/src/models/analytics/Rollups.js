import { model, Schema } from "mongoose";
import { withBase } from "../common/base";

const RollupsSchema = withBase(new Schema({
  orgId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
  kind: { type: String, enum: ['job_funnel','campus_batch','company_overview'], required: true, index: true },
  key: { type: String, required: true, index: true },
  data: { type: Schema.Types.Mixed, required: true },
  computedAt: { type: Date, default: Date.now, index: true },
}));

RollupsSchema.index({ orgId: 1, kind: 1, key: 1 }, { unique: true });
const Rollups = model('Rollups', RollupsSchema);
export { Rollups };
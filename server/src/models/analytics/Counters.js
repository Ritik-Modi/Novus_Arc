import { model, Schema } from "mongoose";
import { withBase } from "../common/base";

const CountersSchema = withBase(new Schema({
  orgId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
  bucket: { type: String, enum: ['day','week','month'], required: true, index: true },
  dateKey: { type: String, required: true, index: true },
  metrics: {
    jobsPosted: { type: Number, default: 0 },
    applicants: { type: Number, default: 0 },
    shortlisted: { type: Number, default: 0 },
    offers: { type: Number, default: 0 },
    selections: { type: Number, default: 0 },
  },
}));

CountersSchema.index({ orgId: 1, bucket: 1, dateKey: 1 }, { unique: true });
const Counters = model('Counters', CountersSchema);
export { Counters };
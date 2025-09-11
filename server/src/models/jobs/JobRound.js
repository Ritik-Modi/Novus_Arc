
import { model, Schema } from "mongoose";
import { withBase } from "../common/base";

const JobRoundSchema = withBase(new Schema({
  jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true, index: true },
  seq: { type: Number, required: true },
  name: { type: String, required: true },
  startAt: { type: Date, index: true },
  endAt: { type: Date },
  location: { type: { type: String, enum: ['onsite','online'] }, value: { type: String } },
  capacity: { type: Number, min: 0 },
  owner: { type: String, enum: ['company','campus'], required: true, index: true },
  status: { type: String, enum: ['scheduled','in_progress','completed','canceled'], default: 'scheduled', index: true },
  metrics: { eligibleCount: Number, shortlistedCount: Number },
}));

JobRoundSchema.index({ jobId: 1, seq: 1 }, { unique: true });
const JobRound = model('JobRound', JobRoundSchema);
export { JobRound };
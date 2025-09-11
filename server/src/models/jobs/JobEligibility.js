
import { model, Schema } from "mongoose";
import { withBase } from "../common/base";


const JobEligibilitySchema = withBase(new Schema({
  jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true, index: true },
  version: { type: Number, required: true, default: 1 },
  rules: {
    minCgpa: { type: Number, min: 0, max: 10 },
    minTenth: { type: Number, min: 0, max: 100 },
    minTwelfth: { type: Number, min: 0, max: 100 },
    backlogAllowed: { type: Boolean, default: false },
    maxBacklog: { type: Number, min: 0 },
    allowedCourses: [{ type: String }],
    allowedBatches: [{ type: String }],
  },
  notes: { type: String },
}));

JobEligibilitySchema.index({ jobId: 1, version: 1 }, { unique: true });

const JobEligibility = model('JobEligibility', JobEligibilitySchema);
export { JobEligibility };

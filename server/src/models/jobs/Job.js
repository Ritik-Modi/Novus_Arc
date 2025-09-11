
import { model, Schema } from "mongoose";
import { withBase } from "../common/base";
const JobSchema = withBase(new Schema({
  jobSerial: { type: String, required: true, index: true, unique: true },
  companyOrgId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
  title: { type: String, required: true, trim: true },
  employmentType: { type: String, enum: ['internship','full_time','contract'], required: true, index: true },
  ctc: { min: { type: Number }, max: { type: Number }, currency: { type: String } },
  locations: [{ type: String }],
  description: { type: String },
  attachmentIds: [{ type: Schema.Types.ObjectId, ref: 'Attachment' }],
  eligibilityId: { type: Schema.Types.ObjectId, ref: 'JobEligibility' },
  status: { type: String, enum: ['draft','published','closed','completed'], default: 'draft', index: true },
  deadlines: { applyBy: { type: Date, index: true }, publishAt: { type: Date } },
  visibility: {
    campusIds: [{ type: Schema.Types.ObjectId, ref: 'Campus', index: true }],
    perCampus: [{
      campusId: { type: Schema.Types.ObjectId, ref: 'Campus' },
      applyByOverride: { type: Date },
      seatLimit: { type: Number, min: 0 },
    }],
  },
}));

JobSchema.index({ companyOrgId: 1, status: 1, 'deadlines.applyBy': 1 });
const Job = model('Job', JobSchema);
export { Job };
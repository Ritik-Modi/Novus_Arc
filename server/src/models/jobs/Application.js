
import { model, Schema } from "mongoose";
import { withBase } from "../common/base";

const ApplicationSchema = withBase(new Schema({
  applicationSerial: { type: String, required: true, unique: true, index: true },
  jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true, index: true },
  campusId: { type: Schema.Types.ObjectId, ref: 'Campus', required: true, index: true },
  studentProfileId: { type: Schema.Types.ObjectId, ref: 'StudentProfile', required: true, index: true },
  status: {
    type: String,
    enum: ['applied','eligible','in_round','rejected','withdrawn','offered','accepted','declined'],
    default: 'applied',
    index: true,
  },
  eligibilitySnapshot: { type: Schema.Types.Mixed },
  roundProgress: [{
    roundSeq: { type: Number, required: true },
    status: { type: String, enum: ['pending','shortlisted','rejected','completed'], default: 'pending' },
    score: { type: Number },
    notes: { type: String },
    updatedAt: { type: Date, default: Date.now },
  }],
  offer: {
    ctc: { type: Number },
    location: { type: String },
    letterId: { type: Schema.Types.ObjectId, ref: 'Attachment' },
    issuedAt: { type: Date },
  },
  submittedAt: { type: Date, default: Date.now, index: true },
}));

ApplicationSchema.index({ jobId: 1, campusId: 1, studentProfileId: 1 }, { unique: true });



const Application = model('Application', ApplicationSchema);
export { Application };
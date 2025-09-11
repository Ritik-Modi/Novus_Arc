import { model, Schema } from "mongoose";
import { withBase } from "../common/base";

const CompanySchema = withBase(new Schema({
  orgId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
  hrEmails: [{ type: String, lowercase: true, trim: true }],
  approxAnnualCampusHiring: { type: Number, min: 0 },
  avgCtc: { type: Number, min: 0 },
  maxCtc: { type: Number, min: 0 },
  locations: [{ type: String }],
  isSubEntity: { type: Boolean, default: false },
  mergeKey: { type: String, index: true, sparse: true },
}));

CompanySchema.index({ orgId: 1 }, { unique: true });

const Company = model('Company', CompanySchema);
export { Company };
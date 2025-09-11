import { model, Schema } from "mongoose";
import { withBase } from "../common/base";

const MergeRequestSchema = withBase(new Schema({
  campusId: { type: Schema.Types.ObjectId, ref: 'Campus', required: true, index: true },
  subEntityCompanyAssocId: { type: Schema.Types.ObjectId, ref: 'CampusCompanyAssociation', required: true, index: true },
  officialCompanyOrgId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
  state: { type: String, enum: ['draft','dry_run','approved','completed','failed'], default: 'draft', index: true },
  dryRunResult: { type: Schema.Types.Mixed },
  resolvedWithPolicy: { type: String, enum: ['prefer_official','prefer_campus','manual'] },
  executedAt: { type: Date },
  error: { type: String },
}));

MergeRequestSchema.index({ officialCompanyOrgId: 1, state: 1 });

const MergeRequest = model('MergeRequest', MergeRequestSchema);
export { MergeRequest };
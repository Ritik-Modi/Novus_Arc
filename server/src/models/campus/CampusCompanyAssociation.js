import { model, Schema } from "mongoose";
import { withBase } from "@/models/base/Base.js";

const CampusCompanyAssociationSchema = withBase(new Schema({
  campusId: { type: Schema.Types.ObjectId, ref: 'Campus', required: true, index: true },
  companyOrgId: { type: Schema.Types.ObjectId, ref: 'Organization', index: true },
  isSubEntity: { type: Boolean, required: true, default: false, index: true },
  mergeKey: { type: String, index: true, sparse: true },
  localLabel: { type: String },
  status: { type: String, enum: ['active','blocked'], default: 'active', index: true },
  notes: { type: String },
}));

CampusCompanyAssociationSchema.index({ campusId: 1, companyOrgId: 1 }, { unique: true, sparse: true });
CampusCompanyAssociationSchema.index({ campusId: 1, mergeKey: 1 }, { unique: true, sparse: true });


const CampusCompanyAssociation = model('CampusCompanyAssociation', CampusCompanyAssociationSchema);
export { CampusCompanyAssociation };
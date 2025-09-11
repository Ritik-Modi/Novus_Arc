
import { model, Schema } from "mongoose";
import { withBase } from "../common/base";

const CompanyUserSchema = withBase(new Schema({
  companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true, index: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  timezone: { type: String },
  preferences: { type: Schema.Types.Mixed },
}));

CompanyUserSchema.index({ companyId: 1, userId: 1 }, { unique: true });

const CompanyUser = model('CompanyUser', CompanyUserSchema);
export { CompanyUser };
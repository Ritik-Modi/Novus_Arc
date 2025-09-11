import { model, Schema } from "mongoose";
import { withBase } from "../common/base";

const DemoLeadSchema = withBase(new Schema({
  kind: { type: String, enum: ['campus','company'], required: true, index: true },
  form: { type: Schema.Types.Mixed, required: true },
  status: { type: String, enum: ['new','contacted','qualified','converted','closed'], default: 'new', index: true },
  convertedOrgId: { type: Schema.Types.ObjectId, ref: 'Organization' },
}));

DemoLeadSchema.index({ status: 1, createdAt: -1 });
const DemoLead = model('DemoLead', DemoLeadSchema);
export { DemoLead };

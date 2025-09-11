// baseSchema.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const baseFields = {
  tenantId: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
    index: true,
    required: true,
  },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", index: true },
  updatedBy: { type: Schema.Types.ObjectId, ref: "User", index: true },
  deletedAt: { type: Date, default: null, index: true },
};

function withBase(schema) {
  schema.add(baseFields);
  schema.set("timestamps", true);
  schema.index({ tenantId: 1, deletedAt: 1 });
  return schema;
}

export { withBase };

import { model, Schema } from "mongoose";
import { withBase } from "@/models/base/Base.js";

const CampusUserSchema = withBase(
  new Schema({
    campusId: {
      type: Schema.Types.ObjectId,
      ref: "Campus",
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    department: { type: String },
    preferences: { type: Schema.Types.Mixed },
  })
);

CampusUserSchema.index({ campusId: 1, userId: 1 }, { unique: true });

const CampusUser = model("CampusUser", CampusUserSchema);
export { CampusUser };

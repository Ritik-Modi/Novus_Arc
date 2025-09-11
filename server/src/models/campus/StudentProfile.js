import { model, Schema } from "mongoose";
import { withBase } from "@/models/base/Base.js";

const StudentProfileSchema = withBase(
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
    rollNo: { type: String, required: true, trim: true },
    emails: [{ type: String, lowercase: true, trim: true }],
    mobile: { type: String },
    cgpa: { type: Number, min: 0, max: 10 },
    tenthPercent: { type: Number, min: 0, max: 100 },
    twelfthPercent: { type: Number, min: 0, max: 100 },
    backlog: {
      hasBacklog: { type: Boolean, default: false },
      count: { type: Number, min: 0 },
    },
    course: { type: String },
    batch: { type: String, index: true },
    semester: { type: String, index: true },
    gender: {
      type: String,
      enum: ["male", "female", "other", "na"],
      default: "na",
    },
    dob: { type: Date },
    parents: { fatherName: String, motherName: String },
    docs: {
      resumeId: { type: Schema.Types.ObjectId, ref: "Attachment" },
      tenthMarksheetId: { type: Schema.Types.ObjectId, ref: "Attachment" },
      twelfthMarksheetId: { type: Schema.Types.ObjectId, ref: "Attachment" },
    },
    status: {
      type: String,
      enum: ["active", "on_hold", "alumni"],
      default: "active",
      index: true,
    },
    eligibilityCache: { type: Schema.Types.Mixed },
  })
);

StudentProfileSchema.index({ campusId: 1, userId: 1 }, { unique: true });
StudentProfileSchema.index({ campusId: 1, batch: 1, course: 1, cgpa: -1 });

const StudentProfile = model("StudentProfile", StudentProfileSchema);
export { StudentProfile };

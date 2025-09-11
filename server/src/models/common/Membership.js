import { model, Schema } from "mongoose";
import { withBase } from "@/models/common/base.js";

const organizationSchema = withBase(
  new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    ordId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true,
    },
    roles: [
      {
        type: String,
        enum: [
          "CampusAdmin",
          "CampusFaculty",
          "Student",
          "CompanyAdmin",
          "Recruiter",
        ],
        index: true,
      },
    ],
    status: {
      type: String,
      enum: ["invited", "active", "disabled"],
      default: "active",
      index: true,
    },
    invitedBy: { type: Schema.Types.ObjectId, ref: "User" },
    invitedAt: { type: Date },
    acceptedAt: { type: Date },
  })
);

const Membership = model("Membership", organizationSchema);

export { Membership };

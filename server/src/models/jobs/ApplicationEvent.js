import { model, Schema } from "mongoose";
import { withBase } from "../common/base";

const ApplicationEventSchema = withBase(
  new Schema({
    applicationId: {
      type: Schema.Types.ObjectId,
      ref: "Application",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: [
        "apply",
        "eligible",
        "shortlist",
        "reject",
        "move_round",
        "offer",
        "accept",
        "decline",
        "withdraw",
      ],
      required: true,
      index: true,
    },
    actorId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    data: { type: Schema.Types.Mixed },
    occurredAt: { type: Date, default: Date.now, index: true },
  })
);

ApplicationEventSchema.index({ applicationId: 1, occurredAt: -1 });
const ApplicationEvent = model("ApplicationEvent", ApplicationEventSchema);
export { ApplicationEvent };

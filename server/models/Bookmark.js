import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    source: {
      type: String,
      enum: ["internshala", "career"],
      required: true,
    },
    title: String,
    company: String,
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

bookmarkSchema.index({ user: 1, url: 1 }, { unique: true });

export default mongoose.model("Bookmark", bookmarkSchema);

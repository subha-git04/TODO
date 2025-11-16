import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  todo: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
});

export default mongoose.model("Todo", todoSchema);

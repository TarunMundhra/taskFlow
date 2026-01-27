import mongoose from "mongoose";

const dependencySchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true
  }
},
{
    timestamps: true
});

const Dependency = mongoose.model("Dependency", dependencySchema);

export default Dependency

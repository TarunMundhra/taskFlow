import Task from "../models/task.model.js";
import Dependency from "../models/dependency.model.js";
import { buildGraph, hasCycle } from "../util/graph.js";

export async function addDependency(req, res) {
  const { from, to } = req.body;

  const dep = await Dependency.create({ from, to });

  const tasks = await Task.find();
  const deps = await Dependency.find();

  const { graph, indegree } = buildGraph(tasks, deps);

  if (hasCycle(graph, indegree)) {
    await Dependency.findByIdAndDelete(dep._id);
    return res.status(400).json({ error: "Cycle detected. Dependency rejected." });
  }

  res.json({ message: "Dependency added" });
}

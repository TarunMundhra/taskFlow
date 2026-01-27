import Task from "../models/task.model.js";
import Dependency from "../models/dependency.model.js";
import { buildGraph } from "../util/graph.js";

export async function createTask(req, res) {
  const { title, priority } = req.body;
  const task = await Task.create({ title, priority });
  res.json(task);
}

export async function getOrderedTasks(req, res) {
  try {
    const tasks = await Task.find();
    const deps = await Dependency.find();

    const taskMap = new Map(tasks.map(t => [t._id.toString(), t]));
    const { graph, indegree } = buildGraph(tasks, deps);

    const q = [];
    const order = [];

    indegree.forEach((deg, node) => {
      if (deg === 0) q.push(node);
    });

    while (q.length) {
      const u = q.shift();
      order.push(u);

      for (const v of graph.get(u) || []) {
        indegree.set(v, indegree.get(v) - 1);
        if (indegree.get(v) === 0) q.push(v);
      }
    }

    res.json(order.map(id => taskMap.get(id)));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to order tasks" });
  }
}

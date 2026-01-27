export function buildGraph(tasks, dependencies) {
  const graph = new Map();
  const indegree = new Map();

  tasks.forEach(t => {
    graph.set(t._id.toString(), []);
    indegree.set(t._id.toString(), 0);
  });

  dependencies.forEach(d => {
    const u = d.from.toString();
    const v = d.to.toString();
    graph.get(u).push(v);
    indegree.set(v, indegree.get(v) + 1);
  });

  return { graph, indegree };
}

export function hasCycle(graph, indegree) {
  const q = [];
  let visited = 0;

  indegree.forEach((deg, node) => {
    if (deg === 0) q.push(node);
  });

  while (q.length) {
    const u = q.shift();
    visited++;
    for (const v of graph.get(u)) {
      indegree.set(v, indegree.get(v) - 1);
      if (indegree.get(v) === 0) q.push(v);
    }
  }

  return visited !== graph.size;
}

import Vertex from "./Vertex.js";

/**
 * @param {number[]} start
 * @param {number[]} end
 */
function knightMoves(start, end) {
  /** @type {Map<string, Vertex>} */
  let mapOfVertices = new Map();
  const startVertex = new Vertex(start);
  let visitedVertices = [startVertex.position.toString()];
  let queuedVertices = startVertex.edges;
  let path = [];

  // Breadth-first search to find by level
  while (queuedVertices) {
    const currentVertex = new Vertex(queuedVertices.shift());

    if (!visitedVertices.includes(currentVertex.position.toString()))
      visitedVertices.push(currentVertex.position.toString());
    if (currentVertex.position.toString() === end.toString()) break;
    if (!mapOfVertices.has(currentVertex.position.toString()))
      mapOfVertices.set(currentVertex.position.toString(), currentVertex);

    const enqueuedVertices = currentVertex.edges;
    enqueuedVertices.forEach((enqueuedVertexPosition) => {
      if (!mapOfVertices.has(enqueuedVertexPosition.toString())) {
        const enqueueVertex = new Vertex(enqueuedVertexPosition);
        enqueueVertex.predecessor = currentVertex.position;
        mapOfVertices.set(enqueuedVertexPosition.toString(), enqueueVertex);
      }
    });
    queuedVertices.push(...enqueuedVertices);
  }

  let currentTraversedVertex = mapOfVertices.get(end.toString());
  // traverse backward by predecessor till start vertex's neighbor
  while (currentTraversedVertex.predecessor !== null) {
    path.unshift(currentTraversedVertex.position);
    currentTraversedVertex = mapOfVertices.get(
      currentTraversedVertex.predecessor.toString(),
    );
  }
  path.unshift(start, currentTraversedVertex.position);

  console.log(
    `You made it in ${path.length - 1} ${path.length - 1 > 1 ? "moves" : "move"}! Here's your path:`,
  );
  path.forEach((vertex) => console.log(vertex));
}

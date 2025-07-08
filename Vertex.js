export default class Vertex {
  /**
   * @param {number[]} position
   */
  constructor(position) {
    if (
      position[0] > 7 ||
      position[0] < 0 ||
      position[1] > 7 ||
      position[1] < 0
    )
      throw new Error("Out of bounds!!");

    this.position = position;
    this.predecessor = null;
    this.edges = this.#calculateEdges();
  }

  /**
   * @returns {number[][]}
   */
  #calculateEdges() {
    const [x, y] = this.position;
    const edges = [
      [x - 2, y + 1],
      [x - 1, y + 2],
      [x - 2, y - 1],
      [x - 1, y - 2],
      [x + 1, y + 2],
      [x + 2, y + 1],
      [x + 2, y - 1],
      [x + 1, y - 2],
    ];

    return edges.filter((edge) => {
      return edge[0] >= 0 && edge[0] <= 7 && edge[1] >= 0 && edge[1] <= 7;
    });
  }
}

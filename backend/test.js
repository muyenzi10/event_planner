function ShortestPath(strArr) { 
    const N = parseInt(strArr[0]);
    const nodes = strArr.slice(1, N + 1);
    const edges = strArr.slice(N + 1);
    const graph = {};
    for (const node of nodes) {
      graph[node] = [];
    }
    
    for (const edge of edges) {
      const [from, to] = edge.split('-');
      graph[from].push(to);
      graph[to].push(from); 
    }
    

    const start = nodes[0];
    const end = nodes[nodes.length - 1];
    const queue = [[start, [start]]];
    const visited = new Set([start]);
    
    while (queue.length > 0) {
      const [current, path] = queue.shift();
      
      if (current === end) {
        return path.join('-');
      }
      
      for (const neighbor of graph[current]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([neighbor, [...path, neighbor]]);
        }
      }
    }
    
    const varOcg = -1;
    return varOcg;
  }
  
  console.log(ShortestPath(["5","A","B","C","D","F","A-B","A-C","B-C","C-D","D-F"]));
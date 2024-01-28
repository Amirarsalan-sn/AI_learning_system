"""
    This code is written by Omid Reza Borzoyi.
"""

ROOT = 0  # node 0 is always the root
sample_graph = {
    # parent: list of children from left to right
    0: [1, 2],
    1: [3, 4, 5],
    2: [6, 7],
    3: [8, 9],
    6: [10],
    10: [11, 12],
}


def show_graph(graph: dict[int, list[int]]):
    for key, value in graph.items():
        print(key, value)


def get_all_nodes(graph: dict[int, list[int]]):
    maximum = -float('inf')
    for children in graph.values():
        maximum = max(maximum, max(children))
    return list(range(maximum + 1))


def bfs(graph: dict, priority='left_to_right') -> list[int]:
    nodes = get_all_nodes(graph)
    visited = [False] * len(nodes)
    sequence = []

    if priority == 'left_to_right':
        parents_to_check = [ROOT]

        while parents_to_check:
            parent = parents_to_check.pop(0)

            if not visited[parent]:
                sequence.append(parent)
                visited[parent] = True

            try:
                children = graph[parent]

                for child in children:
                    sequence.append(child)
                    parents_to_check.append(child)
                    visited[child] = True

            except KeyError:
                pass

    return sequence


def _dfs(graph: dict[int, list[int]], root: int, visited: list[bool], priority: str, sequence: list):
    if visited[root]:
        return

    sequence.append(root)
    visited[root] = True

    if priority == 'left_to_right':
        try:
            children = graph[root]

            for child in children:
                _dfs(graph, child, visited, priority, sequence)

        except KeyError:
            pass


def dfs(graph: dict[int, list[int]], priority='left_to_right') -> list[int]:
    nodes = get_all_nodes(graph)
    visited = [False] * len(nodes)
    sequence = []

    _dfs(graph, ROOT, visited, priority, sequence)

    return sequence


if __name__ == "__main__":
    dfs_seq = dfs(sample_graph)
    bfs_seq = bfs(sample_graph)

    print(dfs_seq)
    print(bfs_seq)
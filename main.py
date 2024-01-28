"""
    This code is written by Omid Reza Borzoyi.

    This code is reviewed and edited by Amir Arsalan Sanati.
"""
import random

sample_graph = {
    # parent: list of children from left to right
    0: [1, 2],
    1: [3, 4, 5],
    2: [6, 7],
    3: [8, 9],
    6: [10],
    10: [11, 12],
}


class SearchAlgos:
    _ROOT = 0

    @staticmethod
    def show_graph(graph: dict[int, list[int]]):
        for key, value in graph.items():
            print(key, value)

        for key, value in graph.items():
            for v in value:
                print(key, v)

    @staticmethod
    def _get_all_nodes(graph: dict[int, list[int]]):
        maximum = -float('inf')
        for children in graph.values():
            maximum = max(maximum, max(children))
        return list(range(maximum + 1))

    @staticmethod
    def bfs(graph: dict, priority='left_to_right') -> list[int]:
        nodes = SearchAlgos._get_all_nodes(graph)
        visited = [False] * len(nodes)
        sequence = []

        if priority == 'left_to_right':
            parents_to_check = [SearchAlgos._ROOT]

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

    @staticmethod
    def _dfs(graph: dict[int, list[int]], root: int, visited: list[bool], priority: str, sequence: list):
        if visited[root]:
            return

        sequence.append(root)
        visited[root] = True

        if priority == 'left_to_right':
            try:
                children = graph[root]

                for child in children:
                    SearchAlgos._dfs(graph, child, visited, priority, sequence)

            except KeyError:
                pass

    @staticmethod
    def dfs(graph: dict[int, list[int]], priority='left_to_right') -> list[int]:
        nodes = SearchAlgos._get_all_nodes(graph)
        visited = [False] * len(nodes)
        sequence = []

        SearchAlgos._dfs(graph, SearchAlgos._ROOT, visited, priority, sequence)

        return sequence


class GraphProcessing:

    @staticmethod
    def gen_rand_graph():
        num_of_nodes = random.randint(7, 16)
        adjacent_matrix = [[0 for x in range(num_of_nodes)] for x in range(num_of_nodes)]
        nodes_list = [x for x in range(1, num_of_nodes)]
        random.shuffle(nodes_list)
        process_list = [0]
        while process_list:
            parent = process_list.pop(0)
            if not process_list:
                num_of_children = random.randint(1, 4)
            else:
                num_of_children = random.randint(0, 4)
            for i in range(num_of_children):
                if nodes_list:
                    child = nodes_list.pop(0)
                    adjacent_matrix[parent][child] = 1
                    process_list.append(child)

        return adjacent_matrix

    @staticmethod
    def convert_matrix_to_dict(matrix: list[list[int]]):
        result_dict = {}
        for i in range(len(matrix)):
            for j in range(len(matrix)):
                if matrix[i][j]:
                    if result_dict.get(i) is None:
                        result_dict[i] = []
                    result_dict[i].append(j)

        return result_dict


if __name__ == "__main__":
    graph = GraphProcessing.gen_rand_graph()
    print(graph)
    graph_dict = GraphProcessing.convert_matrix_to_dict(graph)
    SearchAlgos.show_graph(graph_dict)
    dfs_seq = SearchAlgos.dfs(graph_dict)
    bfs_seq = SearchAlgos.bfs(graph_dict)
    print(f'dfs : {dfs_seq}')
    print(f'bfs : {bfs_seq}')


import random
import re
import secrets
import string

sample_graph = {
    0: [1, 2],
    1: [3, 4, 5],
    2: [6, 7],
    3: [8, 9],
    6: [10],
    10: [11, 12],
}


class SearchAlgos:
    def __init__(self):
        self._ROOT = 0

    def show_graph(self, graph: dict[int, list[int]]):
        for key, value in graph.items():
            print(key, value)

        for key, value in graph.items():
            for v in value:
                print(key, v)

    def _get_all_nodes(self, graph: dict[int, list[int]]):
        maximum = -float('inf')
        for children in graph.values():
            maximum = max(maximum, max(children))
        return list(range(maximum + 1))

    def bfs(self, graph: dict, priority='left_to_right') -> list[int]:
        nodes = self._get_all_nodes(graph)
        visited = [False] * len(nodes)
        sequence = []

        if priority == 'left_to_right':
            parents_to_check = [self._ROOT]

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

    def _dfs(self, graph: dict[int, list[int]], root: int, visited: list[bool], priority: str, sequence: list):
        if visited[root]:
            return

        sequence.append(root)
        visited[root] = True

        if priority == 'left_to_right':
            try:
                children = graph[root]

                for child in children:
                    self._dfs(graph, child, visited, priority, sequence)

            except KeyError:
                pass

    def dfs(self, graph: dict[int, list[int]], priority='left_to_right') -> list[int]:
        nodes = self._get_all_nodes(graph)
        visited = [False] * len(nodes)
        sequence = []

        self._dfs(graph, self._ROOT, visited, priority, sequence)

        return sequence


class GraphProcessing:
    def gen_rand_graph(self):
        num_of_nodes = secrets.randbelow(10) + 7
        adjacent_matrix = [[0 for x in range(num_of_nodes)] for x in range(num_of_nodes)]
        nodes_list = [x for x in range(1, num_of_nodes)]
        secrets.SystemRandom().shuffle(nodes_list)
        process_list = [0]
        while process_list:
            parent = process_list.pop(0)
            if not process_list:
                num_of_children = secrets.randbelow(4) + 1
            else:
                num_of_children = secrets.randbelow(5)
            for i in range(num_of_children):
                if nodes_list:
                    child = nodes_list.pop(0)
                    adjacent_matrix[parent][child] = 1
                    process_list.append(child)

        return adjacent_matrix

    def convert_matrix_to_dict(self, matrix: list[list[int]]):
        result_dict = {}
        for i in range(len(matrix)):
            for j in range(len(matrix)):
                if matrix[i][j]:
                    if result_dict.get(i) is None:
                        result_dict[i] = []
                    result_dict[i].append(j)

        return result_dict


class PasswordGenerator:

    def __init__(self):
        self.pattern = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&*])[A-Za-z\d@#$%&*]{8,}$'

    def generate_strong_password(self):
        while True:
            random_password = ''.join(secrets.choice(string.ascii_letters + string.digits + '@#$%&') for _ in range(12))
            if re.match(self.pattern, random_password):
                return random_password

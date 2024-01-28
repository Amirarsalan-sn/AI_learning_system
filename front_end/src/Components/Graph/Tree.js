import React from 'react';
import ReactFlow, {
    Position,
    addEdge,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState, MarkerType,
} from 'reactflow';

import CustomNode from './CustomNode';

import 'reactflow/dist/style.css';
import './overview.css';
const nodeTypes = {
    custom: CustomNode,
};
const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);

export default function Tree({ adjacencyMatrix , visitingNode}) {

    const convertAdjacencyMatrixToElements = (matrix) => {

        const nodes = [];
        const edges = [];

        matrix.forEach((row, i) => {
            // Add node for each row
            const nodeId = i.toString();
            const isVisiting = visitingNode === i;
            const nodeStyle = isVisiting ? { background: 'red', color: 'white' }
                : { background: '#2B6CB0', color: 'white' };

            nodes.push({
                id: nodeId,
                data: {
                    label: nodeId,
                },
                className: 'circle',
                style: nodeStyle,
                position: { x: 0, y: 0 },
                sourcePosition: Position.Right,
                targetPosition: Position.Right,

            });

            // Add edges based on adjacency
            row.forEach((edge, j) => {
                if (edge === 1) { // Assuming 1 indicates an edge
                    edges.push({ id: `e${i}-${j}`, source: i.toString(), target: j.toString()  ,   markerEnd: {
                            type: MarkerType.ArrowClosed,
                        },
                    });
                }
            });
        });


        return { nodes, edges };
    };
    const applyTreeLayout = (nodes, edges, spacing = { x: 100, y: 100 }) => {
        const levels = {};
        levels['0'] = 0
        const visited = {}
        const levelWidths = {};
        levelWidths[0] = 1
        // Initialize root level

        // Calculate levels for each node
        visited['0'] = true
        const calculateLevels = (nodeId, level) => {
            console.log(nodeId)

            edges.forEach((edge) => {

                if (edge.source === nodeId  && visited[edge.target] === undefined ) {


                    levels[edge.target] = level + 1;
                    levelWidths[level+1] = (levelWidths[level+1] || 0) + 1;
                    visited[edge.target] = true;
                    calculateLevels(edge.target, level + 1);
                }
            });
        };

        calculateLevels('0', 0);
        console.log(levels)
        levelWidths[0] = 1; // Starting with one node at root level

        const levelIndices = {};

        // Assign positions based on levels
        Object.keys(levels).forEach((nodeId) => {
            const nodeLevel = levels[nodeId];
            levelIndices[nodeLevel] = (levelIndices[nodeLevel] || 0) + 1;

            const nodeIndex = levelIndices[nodeLevel] - 1; // Index of the node in its level
            const totalNodesInLevel = levelWidths[nodeLevel];
            const xOffset = (nodeIndex - (totalNodesInLevel - 1) / 2) * spacing.x; // Center nodes in each level

            const node = nodes.find(n => n.id === nodeId);
            if (node) {
                node.position = {
                    x: xOffset,
                    y: nodeLevel * spacing.y
                };
            }
        });
    };

    const { nodes, edges } = convertAdjacencyMatrixToElements(adjacencyMatrix);
    applyTreeLayout(nodes,edges);
    return (
        <div style={{ width: '100vw', height: '100vh',direction: 'ltr', }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onInit={onInit}
                fitView
                attributionPosition="top-right"
                nodeTypes={nodeTypes}
            >
                <Controls />
                <Background color="#aaa" gap={16} />
            </ReactFlow>
        </div>
    );
}



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

export default function Graph({ adjacencyMatrix }) {

    const convertAdjacencyMatrixToElements = (matrix) => {
        const nodes = [];
        const edges = [];

        matrix.forEach((row, i) => {
            // Add node for each row
            nodes.push({
                id: i.toString(),
                data: {
                    label: i.toString(),
                },
                className: 'circle',
                style: {
                    background: '#2B6CB0',
                    color: 'white',
                },
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
    const applyCircularLayout = (nodes, radius = 200) => {
        const centerX = 250;
        const centerY = 250;
        const angleStep = (2 * Math.PI) / nodes.length;

        nodes.forEach((node, index) => {
            node.position = {
                x: centerX + radius * Math.cos(angleStep * index),
                y: centerY + radius * Math.sin(angleStep * index)
            };
        });
    };
    const { nodes, edges } = convertAdjacencyMatrixToElements(adjacencyMatrix);
    applyCircularLayout(nodes);
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



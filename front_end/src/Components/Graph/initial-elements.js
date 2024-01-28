import React from 'react';
import { MarkerType, Position } from 'reactflow';

export const nodes = [
    {
        id: '5',
        type: 'output',
        data: {
            label: 'custom style',
        },
        className: 'circle',
        style: {
            background: '#2B6CB0',
            color: 'white',
        },
        position: { x: 400, y: 200 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
];

export const edges = [
    { id: 'e1-3', source: '1', target: '3', animated: true },
];

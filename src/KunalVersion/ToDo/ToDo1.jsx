// src/App.jsx
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  rectIntersection,
  DragOverlay,
} from "@dnd-kit/core";

import Tree from "./Tree";

export default function AppToDoDnD() {
  const [tasks, setTasks] = useState([
    {
      id: uuidv4(),
      label: "Design Phase",
      children: [
        {
          id: uuidv4(),
          label: "Brainstorming",
          children: [],
        },
        {
          id: uuidv4(),
          label: "Wireframes",
          children: [],
        },
      ],
    },
    {
      id: uuidv4(),
      label: "Development Phase",
      children: [
        {
          id: uuidv4(),
          label: "Frontend",
          children: [
            { id: uuidv4(), label: "React Components", children: [] },
            { id: uuidv4(), label: "CSS Styling", children: [] },
          ],
        },
        {
          id: uuidv4(),
          label: "Backend",
          children: [
            { id: uuidv4(), label: "API Endpoints", children: [] },
            { id: uuidv4(), label: "Database Models", children: [] },
          ],
        },
      ],
    },
  ]);

  const [newTaskLabel, setNewTaskLabel] = useState("");

  // For dragging
  const [activeId, setActiveId] = useState(null);
  const [draggingNode, setDraggingNode] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  // ====== CRUD Actions ======
  function addTopLevelTask() {
    if (!newTaskLabel.trim()) return;
    const newTask = {
      id: uuidv4(),
      label: newTaskLabel,
      children: [],
    };
    setTasks((prev) => [...prev, newTask]);
    setNewTaskLabel("");
  }

  function handleAddChild(parentId, childLabel) {
    function recurseAdd(nodes) {
      return nodes.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [
              ...node.children,
              { id: uuidv4(), label: childLabel, children: [] },
            ],
          };
        } else if (node.children?.length) {
          return { ...node, children: recurseAdd(node.children) };
        }
        return node;
      });
    }
    setTasks((prev) => recurseAdd(prev));
  }

  function handleEditNode(nodeId, newLabel) {
    function recurseEdit(nodes) {
      return nodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, label: newLabel };
        } else if (node.children?.length) {
          return { ...node, children: recurseEdit(node.children) };
        }
        return node;
      });
    }
    setTasks((prev) => recurseEdit(prev));
  }

  function handleDeleteNode(nodeId) {
    function recurseDelete(nodes) {
      return nodes
        .map((node) => {
          if (node.id === nodeId) return null;
          if (node.children?.length) {
            return { ...node, children: recurseDelete(node.children) };
          }
          return node;
        })
        .filter(Boolean);
    }
    setTasks((prev) => recurseDelete(prev));
  }

  // ====== DnD Kit Helper Functions ======
  function findNodeById(nodes, id) {
    for (let n of nodes) {
      if (n.id === id) return n;
      if (n.children?.length) {
        const found = findNodeById(n.children, id);
        if (found) return found;
      }
    }
    return null;
  }

  function removeNodeById(nodes, id) {
    let removed = null;
    const newNodes = [];

    for (let n of nodes) {
      if (n.id === id) {
        removed = n;
        continue;
      }
      if (n.children?.length) {
        const [childRemoved, updatedChildren] = removeNodeById(n.children, id);
        if (childRemoved) {
          removed = childRemoved;
        }
        n = { ...n, children: updatedChildren };
      }
      newNodes.push(n);
    }

    return [removed, newNodes];
  }

  function insertNodeAtParent(nodes, parentId, index, nodeToInsert) {
    if (!parentId || parentId === "root") {
      const newArray = [...nodes];
      newArray.splice(index, 0, nodeToInsert);
      return newArray;
    }

    return nodes.map((node) => {
      if (node.id === parentId) {
        const newChildren = [...node.children];
        newChildren.splice(index, 0, nodeToInsert);
        return { ...node, children: newChildren };
      }
      if (node.children?.length) {
        return {
          ...node,
          children: insertNodeAtParent(
            node.children,
            parentId,
            index,
            nodeToInsert
          ),
        };
      }
      return node;
    });
  }

  // ====== DnD Kit Callbacks ======
  function handleDragStart(event) {
    const { active } = event;
    setActiveId(active.id);

    const node = findNodeById(tasks, active.id);
    setDraggingNode(node);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    setActiveId(null);
    setDraggingNode(null);

    if (!over || active.id === over.id) {
      // dropped on itself or outside
      return;
    }

    // Remove from old parent
    const [removedNode, newTree] = removeNodeById(tasks, active.id);
    if (!removedNode) {
      return;
    }

    // If the "over" is a node or container
    const overId = over.id;
    let parentId = null;
    let index = 0;

    if (overId.startsWith("container-")) {
      // example: "container-root" or "container-<someId>"
      parentId = overId.replace("container-", "");
      index = 0;
    } else {
      // dropped on a node => become its child or sibling?
      // In this example, let's say if you drop on a node, you become that node's child at position 0
      parentId = overId;
      index = 0;
    }

    // Insert
    const updated = insertNodeAtParent(newTree, parentId, index, removedNode);
    setTasks(updated);
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Deep-Level DnD Kit Tree</h1>

        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            className="border border-gray-300 rounded px-2 py-1 flex-1"
            placeholder="New top-level task..."
            value={newTaskLabel}
            onChange={(e) => setNewTaskLabel(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={addTopLevelTask}
          >
            Add
          </button>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={rectIntersection}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {/* Render the tree at root */}
          <div className="space-y-2">
            <Tree
              parentId="root"
              nodes={tasks}
              onAddChild={handleAddChild}
              onEditNode={handleEditNode}
              onDeleteNode={handleDeleteNode}
            />
          </div>

          {/* The DragOverlay follows cursor while dragging */}
          <DragOverlay>
            {draggingNode ? (
              <div className="bg-gray-200 px-2 py-1 rounded shadow max-w-sm">
                {draggingNode.label}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}

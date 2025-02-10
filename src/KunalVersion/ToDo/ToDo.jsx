// src/App.jsx
import React, { useState, useMemo, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  rectIntersection,
  DragOverlay,
} from "@dnd-kit/core";

import { Tree } from "./Tree";

// Helper to generate short IDs like "T-1001" incrementally
let shortIdCounter = 1000;
function generateShortId() {
  shortIdCounter++;
  return `T-${shortIdCounter}`;
}

// Possible statuses
const STATUS_OPTIONS = ["To Do", "In Progress", "Done", "Blocked"];

export default function AppToDoDnD() {
  // ----------------
  // 1) State
  // ----------------
  const [tasks, setTasks] = useState([
    {
      id: uuidv4(),
      shortId: generateShortId(),
      label: "Design Phase",
      status: "To Do",
      children: [
        {
          id: uuidv4(),
          shortId: generateShortId(),
          label: "Brainstorming",
          status: "To Do",
          children: [],
        },
        {
          id: uuidv4(),
          shortId: generateShortId(),
          label: "Wireframes",
          status: "In Progress",
          children: [],
        },
      ],
    },
    {
      id: uuidv4(),
      shortId: generateShortId(),
      label: "Development Phase",
      status: "To Do",
      children: [
        {
          id: uuidv4(),
          shortId: generateShortId(),
          label: "Frontend",
          status: "Blocked",
          children: [
            {
              id: uuidv4(),
              shortId: generateShortId(),
              label: "React Components",
              status: "In Progress",
              children: [],
            },
            {
              id: uuidv4(),
              shortId: generateShortId(),
              label: "CSS Styling",
              status: "To Do",
              children: [],
            },
          ],
        },
        {
          id: uuidv4(),
          shortId: generateShortId(),
          label: "Backend",
          status: "In Progress",
          children: [
            {
              id: uuidv4(),
              shortId: generateShortId(),
              label: "API Endpoints",
              status: "To Do",
              children: [],
            },
            {
              id: uuidv4(),
              shortId: generateShortId(),
              label: "Database Models",
              status: "Done",
              children: [],
            },
          ],
        },
      ],
    },
  ]);

  const [newTaskLabel, setNewTaskLabel] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(""); // e.g., 'labelAsc', 'labelDesc', 'statusAsc', etc.

  // For dragging
  const [activeId, setActiveId] = useState(null);
  const [draggingNode, setDraggingNode] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  // ----------------
  // 2) CRUD + Status
  // ----------------

  // Add top-level task
  function addTopLevelTask() {
    if (!newTaskLabel.trim()) return;
    const newTask = {
      id: uuidv4(),
      shortId: generateShortId(),
      label: newTaskLabel,
      status: "To Do", // default
      children: [],
    };
    setTasks((prev) => [...prev, newTask]);
    setNewTaskLabel("");
  }

  // Add child
  function handleAddChild(parentId, childLabel) {
    function recurseAdd(nodes) {
      return nodes.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [
              ...node.children,
              {
                id: uuidv4(),
                shortId: generateShortId(),
                label: childLabel,
                status: "To Do", // default
                children: [],
              },
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

  // Edit label
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

  // Delete node
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

  // Change status
  function handleChangeStatus(nodeId, newStatus) {
    function recurseStatus(nodes) {
      return nodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, status: newStatus };
        } else if (node.children?.length) {
          return { ...node, children: recurseStatus(node.children) };
        }
        return node;
      });
    }
    setTasks((prev) => recurseStatus(prev));
  }

  // -------------------------
  // 3) Search & Sort
  // -------------------------

  // We want to *filter* nodes by searchTerm, and *sort* them by sortBy.
  // Then we pass the filtered/sorted tree to <Tree />.
  // We'll do a 2-step approach:
  //   1) transform the tree to a "filtered" version
  //   2) sort the siblings if needed
  // We keep the *original* tasks in state, transform it on the fly for rendering.

  function filterTree(nodes, search) {
    // Return a new array of nodes that match (or contain a matching child).
    return nodes
      .map((node) => {
        // Check if node label or shortId matches search
        const match =
          node.label.toLowerCase().includes(search) ||
          node.shortId.toLowerCase().includes(search);
        // Recurse
        let filteredChildren = [];
        if (node.children?.length) {
          filteredChildren = filterTree(node.children, search);
        }
        // If either node itself matches OR any child matches, keep it
        if (match || filteredChildren.length > 0) {
          return { ...node, children: filteredChildren };
        }
        return null;
      })
      .filter(Boolean);
  }

  function sortChildren(nodes, sortKey) {
    if (!sortKey) return nodes;

    let sorted = [...nodes];

    // Example sort patterns
    if (sortKey === "labelAsc") {
      sorted.sort((a, b) => a.label.localeCompare(b.label));
    } else if (sortKey === "labelDesc") {
      sorted.sort((a, b) => b.label.localeCompare(a.label));
    } else if (sortKey === "statusAsc") {
      sorted.sort((a, b) => a.status.localeCompare(b.status));
    } else if (sortKey === "statusDesc") {
      sorted.sort((a, b) => b.status.localeCompare(a.status));
    }

    // Recurse
    return sorted.map((node) => {
      if (node.children?.length > 0) {
        return {
          ...node,
          children: sortChildren(node.children, sortKey),
        };
      }
      return node;
    });
  }

  const filteredAndSortedTasks = useMemo(() => {
    const search = searchTerm.toLowerCase();
    const filtered = filterTree(tasks, search);
    return sortChildren(filtered, sortBy);
  }, [tasks, searchTerm, sortBy]);

  // -------------------------
  // 4) Summary of statuses
  // -------------------------
  // We'll collect how many tasks are in each status across the entire (filtered) tree.
  // Alternatively, we might want the summary of the *full* tree ignoring filters.
  // For demonstration, let's do summary of the *unfiltered* tasks, so you always see total counts.

  function collectStatusCounts(nodes, counts = {}) {
    for (let node of nodes) {
      counts[node.status] = (counts[node.status] || 0) + 1;
      if (node.children?.length) {
        collectStatusCounts(node.children, counts);
      }
    }
    return counts;
  }
  const statusCounts = useMemo(() => collectStatusCounts(tasks, {}), [tasks]); // unfiltered

  // -------------------------
  // 5) DnD Logic
  // -------------------------

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
      return;
    }
    const [removedNode, newTree] = removeNodeById(tasks, active.id);
    if (!removedNode) return;

    const overId = over.id;
    let parentId = null;
    let index = 0;

    if (overId.startsWith("container-")) {
      parentId = overId.replace("container-", "");
      index = 0;
    } else {
      parentId = overId;
      index = 0;
    }

    const updated = insertNodeAtParent(newTree, parentId, index, removedNode);
    setTasks(updated);
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Deep-Level DnD Kit Tree</h1>

        {/* Search & Sort */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search:
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded px-2 py-1 w-full"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort By:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 w-full"
            >
              <option value="">(No Sort)</option>
              <option value="labelAsc">Label A-Z</option>
              <option value="labelDesc">Label Z-A</option>
              <option value="statusAsc">Status A-Z</option>
              <option value="statusDesc">Status Z-A</option>
            </select>
          </div>
        </div>

        {/* Add new top-level */}
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

        {/* Status Summary */}
        <div className="p-2 border rounded mb-4 bg-gray-50 text-sm">
          <div className="font-semibold">Task Status Summary:</div>
          {STATUS_OPTIONS.map((st) => {
            const count = statusCounts[st] || 0;
            return (
              <div key={st}>
                {st}: {count}
              </div>
            );
          })}
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={rectIntersection}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="space-y-2">
            <Tree
              parentId="root"
              nodes={filteredAndSortedTasks}
              onAddChild={handleAddChild}
              onEditNode={handleEditNode}
              onDeleteNode={handleDeleteNode}
              onChangeStatus={handleChangeStatus}
            />
          </div>

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

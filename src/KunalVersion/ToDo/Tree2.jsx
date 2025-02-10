// src/Tree.jsx
import React, { useState } from "react";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

/**
 * Props:
 * - parentId: string ("root" if top-level)
 * - nodes: array of { id, label, children }
 * - onAddChild: (parentId, childLabel) => void
 * - onEditNode: (nodeId, newLabel) => void
 * - onDeleteNode: (nodeId) => void
 */
export default function Tree({
  parentId,
  nodes,
  onAddChild,
  onEditNode,
  onDeleteNode,
}) {
  // Container droppable => so we can drop items into this parent's "container"
  // droppableId = "container-" + parentId
  const containerId =
    parentId === "root" ? "container-root" : `container-${parentId}`;

  const { setNodeRef: setContainerRef } = useDroppable({
    id: containerId,
  });

  return (
    <div ref={setContainerRef}>
      {nodes.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          onAddChild={onAddChild}
          onEditNode={onEditNode}
          onDeleteNode={onDeleteNode}
        />
      ))}
    </div>
  );
}

function TreeNode({ node, onAddChild, onEditNode, onDeleteNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showAddChild, setShowAddChild] = useState(false);
  const [childName, setChildName] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editLabel, setEditLabel] = useState(node.label);

  const hasChildren = node.children && node.children.length > 0;

  // IMPORTANT:
  // We define a separate "drag handle" element, and only attach our draggable
  // logic to that handle. This way, the rest of the node can be clicked normally.

  const { attributes, listeners, setNodeRef, isDragging, transform } =
    useDraggable({ id: node.id });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    zIndex: isDragging ? 999 : "auto",
    opacity: isDragging ? 0.7 : 1,
  };

  function handleAddChildClick() {
    if (!childName.trim()) return;
    onAddChild(node.id, childName);
    setChildName("");
    setShowAddChild(false);
    setIsOpen(true);
  }

  function handleEditClick() {
    if (!editLabel.trim()) return;
    onEditNode(node.id, editLabel);
    setIsEditing(false);
  }

  return (
    <div className="mb-2">
      {/* A container that doesn't have the drag props, so clicks are recognized */}
      <div
        className={`p-2 border border-gray-200 rounded bg-gray-50 relative 
        ${isDragging ? "shadow-lg" : ""}`}
        style={style}
        ref={setNodeRef}
      >
        <div className="flex items-center space-x-2">
          {/* Expand/Collapse button */}
          {hasChildren ? (
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <ChevronDownIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronRightIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
          ) : (
            <div className="w-5" />
          )}

          {/* LABEL (or edit input) */}
          {isEditing ? (
            <input
              value={editLabel}
              onChange={(e) => setEditLabel(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleEditClick();
              }}
              className="border rounded px-1"
            />
          ) : (
            <span className="select-none">{node.label}</span>
          )}

          {/* ACTIONS */}
          <div className="flex items-center space-x-1 ml-auto">
            <button
              onClick={() => setShowAddChild(!showAddChild)}
              className="text-sm text-green-600"
            >
              +Child
            </button>
            {isEditing ? (
              <button
                onClick={handleEditClick}
                className="text-sm text-blue-600"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm text-blue-600"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => onDeleteNode(node.id)}
              className="text-sm text-red-600"
            >
              Del
            </button>
          </div>

          {/* DRAG HANDLE: We attach listeners here */}
          <div
            className="ml-2 cursor-grab text-gray-400 hover:text-gray-600 select-none"
            {...attributes}
            {...listeners}
          >
            {/* Could be an icon or "drag" text */}
            |||
          </div>
        </div>

        {/* Add Child Input */}
        {showAddChild && (
          <div className="ml-8 mt-1 flex items-center space-x-1">
            <input
              className="border rounded px-1 text-sm"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="Child name..."
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddChildClick();
              }}
            />
            <button
              className="bg-green-500 text-white px-2 py-1 rounded text-xs"
              onClick={handleAddChildClick}
            >
              Add
            </button>
          </div>
        )}
      </div>

      {/* CHILDREN */}
      {hasChildren && isOpen && (
        <div className="ml-6 mt-2 border-l border-gray-300 pl-2">
          <Tree
            parentId={node.id}
            nodes={node.children}
            onAddChild={onAddChild}
            onEditNode={onEditNode}
            onDeleteNode={onDeleteNode}
          />
        </div>
      )}
    </div>
  );
}

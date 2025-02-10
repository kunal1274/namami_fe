// src/Tree.jsx
// import React, { useState } from "react";
// import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

export function Tree1({ data }) {
  return (
    <div>
      {data.map((node) => (
        <TreeNode key={node.id} node={node} />
      ))}
    </div>
  );
}

function TreeNode1({ node }) {
  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="ml-4">
      <div className="flex items-center mb-1">
        {hasChildren ? (
          <button className="mr-1" onClick={() => setIsOpen((prev) => !prev)}>
            {isOpen ? (
              <ChevronDownIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronRightIcon className="h-5 w-5 text-gray-500" />
            )}
          </button>
        ) : (
          // For items without children, just indent the same space
          <div className="w-5 mr-1" />
        )}

        <span className="text-gray-700">{node.label}</span>
      </div>

      {hasChildren && isOpen && (
        <div className="ml-4 border-l border-gray-300 pl-2">
          <Tree data={node.children} />
        </div>
      )}
    </div>
  );
}

// src/Tree.jsx
import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

/**
 * Props:
 * - parentId: string ("root" if these nodes are top-level)
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
  return (
    // This Droppable for the children at this level
    // droppableId = the parent's id, so we can reorder within the parent's children
    <Droppable droppableId={parentId} type="TREE">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {nodes.map((node, index) => (
            <Draggable draggableId={node.id} index={index} key={node.id}>
              {(dragProvided, snapshot) => (
                <div
                  ref={dragProvided.innerRef}
                  {...dragProvided.draggableProps}
                  // We'll pass handleProps to an "icon" or "grip" to drag,
                  // or just let the entire node be draggable.
                  // For simplicity, entire node is draggable:
                  {...dragProvided.dragHandleProps}
                  className={`bg-gray-50 p-2 mb-2 border border-gray-200 rounded ${
                    snapshot.isDragging ? "opacity-80 shadow-lg" : ""
                  }`}
                >
                  <TreeNode
                    node={node}
                    onAddChild={onAddChild}
                    onEditNode={onEditNode}
                    onDeleteNode={onDeleteNode}
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

function TreeNode({ node, onAddChild, onEditNode, onDeleteNode }) {
  const [isOpen, setIsOpen] = useState(false);

  // For adding a child
  const [showAddChild, setShowAddChild] = useState(false);
  const [childName, setChildName] = useState("");

  // For editing this node
  const [isEditing, setIsEditing] = useState(false);
  const [editLabel, setEditLabel] = useState(node.label);

  const hasChildren = node.children && node.children.length > 0;

  // Toggle add-child
  const handleAddChildClick = () => {
    if (!childName.trim()) return;
    onAddChild(node.id, childName);
    setChildName("");
    setShowAddChild(false);
    setIsOpen(true); // auto-expand to see newly added child
  };

  // Edit node
  const handleEditClick = () => {
    if (!editLabel.trim()) return;
    onEditNode(node.id, editLabel);
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex items-center space-x-2">
        {/* Expand/Collapse icon if children exist */}
        {hasChildren ? (
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <ChevronDownIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronRightIcon className="h-5 w-5 text-gray-500" />
            )}
          </button>
        ) : (
          // placeholder for alignment
          <div className="w-5" />
        )}

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
          <span>{node.label}</span>
        )}

        {/* Actions: +Child / Edit / Del */}
        <div className="flex items-center space-x-1 ml-auto">
          <button
            onClick={() => setShowAddChild(!showAddChild)}
            className="text-sm text-green-600"
          >
            +Child
          </button>

          {isEditing ? (
            <button onClick={handleEditClick} className="text-sm text-blue-600">
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
      </div>

      {/* Add child section */}
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

      {/* Children */}
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

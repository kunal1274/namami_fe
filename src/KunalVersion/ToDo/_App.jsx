// // src/App.jsx
// import React, { useState } from "react";
// import Tree from "./Tree";

// export default function AppToDo() {
//   const [tasks, setTasks] = useState([
//     {
//       id: "1",
//       label: "Design Phase",
//       children: [
//         { id: "2", label: "Brainstorming", children: [] },
//         { id: "3", label: "Wireframes", children: [] },
//       ],
//     },
//     {
//       id: "4",
//       label: "Development Phase",
//       children: [
//         {
//           id: "5",
//           label: "Frontend",
//           children: [
//             { id: "6", label: "React Components", children: [] },
//             { id: "7", label: "CSS Styling", children: [] },
//           ],
//         },
//         {
//           id: "8",
//           label: "Backend",
//           children: [
//             { id: "9", label: "API Endpoints", children: [] },
//             { id: "10", label: "Database Models", children: [] },
//           ],
//         },
//       ],
//     },
//   ]);

//   const [newTaskLabel, setNewTaskLabel] = useState("");

//   // Add a new top-level task
//   const addTopLevelTask = () => {
//     if (!newTaskLabel.trim()) return;
//     const newTask = {
//       id: Date.now().toString(),
//       label: newTaskLabel,
//       children: [],
//     };
//     setTasks([...tasks, newTask]);
//     setNewTaskLabel("");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 text-gray-800 p-4">
//       <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
//         <h1 className="text-2xl font-bold mb-4">
//           My Professional Nested Tasks
//         </h1>

//         <div className="flex space-x-2 mb-4">
//           <input
//             type="text"
//             className="border border-gray-300 rounded px-2 py-1 flex-1"
//             placeholder="New top-level task name..."
//             value={newTaskLabel}
//             onChange={(e) => setNewTaskLabel(e.target.value)}
//           />
//           <button
//             className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//             onClick={addTopLevelTask}
//           >
//             Add Task
//           </button>
//         </div>

//         {/* Tree component */}
//         <Tree data={tasks} />
//       </div>
//     </div>
//   );
// }

// src/App.jsx
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Tree from "./Tree";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

/**
 * We'll store an array of root nodes. Each node has:
 * {
 *   id: string,
 *   label: string,
 *   children: Node[]
 * }
 */
export default function AppToDo() {
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

  // Add a new top-level task
  const addTopLevelTask = () => {
    if (!newTaskLabel.trim()) return;
    const newTask = {
      id: uuidv4(),
      label: newTaskLabel,
      children: [],
    };
    setTasks([...tasks, newTask]);
    setNewTaskLabel("");
  };

  // -- 1) Add Child --
  const handleAddChild = (parentId, childLabel) => {
    function addChildRecursive(nodes) {
      return nodes.map((node) => {
        if (node.id === parentId) {
          const newChild = {
            id: uuidv4(),
            label: childLabel,
            children: [],
          };
          return {
            ...node,
            children: [...node.children, newChild],
          };
        } else if (node.children?.length > 0) {
          return {
            ...node,
            children: addChildRecursive(node.children),
          };
        }
        return node;
      });
    }
    setTasks((prev) => addChildRecursive(prev));
  };

  // -- 2) Edit Node --
  const handleEditNode = (nodeId, newLabel) => {
    function editRecursive(nodes) {
      return nodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, label: newLabel };
        } else if (node.children?.length > 0) {
          return {
            ...node,
            children: editRecursive(node.children),
          };
        }
        return node;
      });
    }
    setTasks((prev) => editRecursive(prev));
  };

  // -- 3) Delete Node --
  const handleDeleteNode = (nodeId) => {
    function deleteRecursive(nodes) {
      return nodes
        .map((node) => {
          if (node.id === nodeId) {
            return null; // remove this node
          } else if (node.children?.length > 0) {
            return {
              ...node,
              children: deleteRecursive(node.children),
            };
          }
          return node;
        })
        .filter(Boolean);
    }
    setTasks((prev) => deleteRecursive(prev));
  };

  /**
   * -- 4) DEEP-LEVEL DRAG & DROP --
   * We'll have multiple Droppables (one for each set of siblings).
   * Each droppableId = parent's nodeId, or "root" for the top level.
   *
   * onDragEnd gives us:
   *  - source: { droppableId, index }
   *  - destination: { droppableId, index } (or null if dropped outside)
   *
   * droppableId tells us which parent's children array to remove from / add to.
   * index tells us the position among siblings.
   *
   * If droppableId changes, that means we move to a new parent.
   */
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If dropped outside any droppable or no movement
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Perform the re-parent or reorder
    setTasks((prev) => {
      // 1) Remove the dragged item from its old parent
      const [draggedItem, newTree] = removeNode(
        prev,
        source.droppableId,
        source.index
      );

      if (!draggedItem) {
        return prev; // something went wrong
      }

      // 2) Insert it into the new parent's children at correct index
      const updatedTree = insertNode(
        newTree,
        destination.droppableId,
        destination.index,
        draggedItem
      );

      return updatedTree;
    });
  };

  // Helper: Remove the node at [parentId, index], returning [nodeRemoved, updatedTree].
  // parentId === "root" means remove from top-level array.
  function removeNode(tree, parentId, index) {
    // If removing from root
    if (parentId === "root") {
      const newRoot = [...tree];
      const [removed] = newRoot.splice(index, 1);
      return [removed, newRoot];
    }
    // Otherwise, remove from parent's children
    function recurse(nodes) {
      return nodes.map((node) => {
        if (node.id === parentId) {
          const newChildren = [...node.children];
          const [removed] = newChildren.splice(index, 1);
          return [removed, { ...node, children: newChildren }];
        } else if (node.children?.length > 0) {
          const [childRemoved, updatedChildNode] = recurse(node.children);
          if (childRemoved !== null) {
            // we found and removed
            const newNode = {
              ...node,
              children: node.children.map((c) =>
                c.id === updatedChildNode.id ? updatedChildNode : c
              ),
            };
            return [childRemoved, newNode];
          }
        }
        return [null, node];
      });
    }

    let removedItem = null;
    const newTree = [];
    for (const n of tree) {
      const [childRemoved, updatedNode] = recurse([n])[0];
      if (childRemoved !== null) {
        removedItem = childRemoved;
      }
      newTree.push(updatedNode);
    }
    return [removedItem, newTree];
  }

  // Helper: Insert node into parent's children at index
  // parentId === "root" => insert at top-level
  function insertNode(tree, parentId, index, nodeToInsert) {
    if (parentId === "root") {
      const newTree = [...tree];
      newTree.splice(index, 0, nodeToInsert);
      return newTree;
    }

    function recurse(nodes) {
      return nodes.map((node) => {
        if (node.id === parentId) {
          const newChildren = [...node.children];
          newChildren.splice(index, 0, nodeToInsert);
          return { ...node, children: newChildren };
        } else if (node.children?.length > 0) {
          return { ...node, children: recurse(node.children) };
        }
        return node;
      });
    }
    return recurse(tree);
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Deep-Level Drag & Drop Tree</h1>

        {/* ADD TOP-LEVEL TASK */}
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

        <DragDropContext
          onDragEnd={onDragEnd}
          onDragStart={(initial) => {
            console.log(initial);
          }}
          onDragUpdate={(update) => {
            console.log(update);
          }}
        >
          {/* 
            We'll have a Droppable for the "root" level as well,
            so top-level tasks can be reordered or moved. 
          */}
          <Droppable droppableId="root" type="TREE">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-2"
              >
                <Tree
                  parentId="root"
                  nodes={tasks}
                  onAddChild={handleAddChild}
                  onEditNode={handleEditNode}
                  onDeleteNode={handleDeleteNode}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

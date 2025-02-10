// stepsData.js
export const steps = [
  {
    id: 1,
    title: "Ride Requested",
    status: "completed", // completed | in-progress | pending
    timestamp: "Tue, 31 Dec '24 - 5:18pm",
  },
  {
    id: 2,
    title: "Allocator Processing",
    status: "completed",
    timestamp: "Tue, 31 Dec '24 - 5:25pm",
  },
  {
    id: 3,
    title: "Driver Assigned",
    status: "completed",
    timestamp: "Tue, 31 Dec '24 - 7:32pm",
  },
  {
    id: 4,
    title: "En Route to Pickup Location",
    status: "in-progress",
    timestamp: "Tue, 31 Dec '24 - 7:54pm",
  },
  {
    id: 5,
    title: "At Pickup Location",
    status: "pending",
  },
  {
    id: 6,
    title: "Waiting for Customer",
    status: "pending",
    isOptional: true, // if you want to show it conditionally
  },
  {
    id: 7,
    title: "Ride Started & In Progress",
    status: "pending",
  },
  {
    id: 8,
    title: "Ride Paused",
    status: "pending",
  },
  {
    id: 9,
    title: "Ride Completed",
    status: "pending",
  },
  // final states - only one would happen usually
  {
    id: 10,
    title: "Ride Cancelled",
    status: "pending",
    final: true,
  },
  {
    id: 11,
    title: "Customer No Show",
    status: "pending",
    final: true,
  },
];

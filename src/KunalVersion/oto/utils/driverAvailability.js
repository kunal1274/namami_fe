// src/utils/driverAvailability.js

export function doesOverlap(startA, endA, startB, endB) {
  // Overlap if A starts before B ends AND A ends after B starts
  return startA < endB && endA > startB;
}

export function isWithinAnyAvailability(driver, start, end) {
  // Return true if (start,end) falls within at least one of driver's availability blocks
  const bookingStart = new Date(start);
  const bookingEnd = new Date(end);
  return driver.availability.some((block) => {
    const blockStart = new Date(block.start);
    const blockEnd = new Date(block.end);
    // We want booking to be fully within block or at least partially overlapping?
    // For now, let's say partial overlap is fine. Adjust logic as needed.
    return blockStart <= bookingEnd && blockEnd >= bookingStart;
  });
}

export function hasBookingConflict(driverId, newStart, newEnd, allBookings) {
  // True if there's an overlap with any existing booking for this driver
  const driverBookings = allBookings.filter((b) => b.driverId === driverId);
  const ns = new Date(newStart);
  const ne = new Date(newEnd);

  // If there's ANY booking for the same driver that overlaps, we have a conflict
  for (let b of driverBookings) {
    const bs = new Date(b.start);
    const be = new Date(b.end);
    if (doesOverlap(ns, ne, bs, be)) {
      return true;
    }
  }

  return false;
}

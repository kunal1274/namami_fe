import React from "react";
import { format, differenceInMinutes, isBefore, isAfter } from "date-fns";

/**
 * This component displays a table for a single day (e.g., 2024-12-30),
 * with columns for each hour and rows for drivers.
 * We'll highlight the hours they are available.
 *
 * For complex scheduling, you might use a library like react-big-calendar or FullCalendar,
 * but here's a simple manual approach.
 */

function DriverTimeline({ drivers, date = "2024-12-30" }) {
  // Generate hours array [0..23]
  const hours = [...Array(24).keys()];

  // A helper to check if a driver is available during a specific hour
  const isAvailableThisHour = (driver, hour) => {
    // Construct start/end for that hour on the given date
    const hourStart = new Date(
      `${date}T${String(hour).padStart(2, "0")}:00:00`
    );
    const hourEnd = new Date(`${date}T${String(hour).padStart(2, "0")}:59:59`);

    // Check if any of the driver's availability blocks overlap this hour
    return driver.availability.some((block) => {
      const blockStart = new Date(block.start);
      const blockEnd = new Date(block.end);
      // If the blockStart <= hourEnd and blockEnd >= hourStart => there's an overlap
      return blockStart <= hourEnd && blockEnd >= hourStart;
    });
  };

  return (
    <div className="mt-4 p-4 bg-white border border-gray-300 rounded shadow-sm">
      <h2 className="text-xl font-semibold mb-3">Driver Timeline (Hourly)</h2>
      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Driver</th>
              {hours.map((h) => (
                <th key={h} className="border p-2 text-center w-16">
                  {h}:00
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id} className="hover:bg-gray-50">
                <td className="border p-2 font-medium">{driver.name}</td>
                {hours.map((h) => {
                  const available = isAvailableThisHour(driver, h);
                  return (
                    <td
                      key={h}
                      className={`border p-2 text-center ${
                        available ? "bg-green-200" : "bg-red-50"
                      }`}
                    >
                      {available ? "✓" : ""}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DriverTimeline;

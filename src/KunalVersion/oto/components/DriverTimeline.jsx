import React, { useMemo, useState } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

function DriverTimeline({ drivers }) {
  const [selectedDate, setSelectedDate] = useState("2024-12-30"); // Default date
  const [filterAvailableOnly, setFilterAvailableOnly] = useState(false);
  const [sortBy, setSortBy] = useState("name"); // Options: 'name', 'availability'

  // Generate hours array [0..23]
  const hours = [...Array(24).keys()];

  // A helper to check if a driver is available during a specific hour
  const isAvailableThisHour = (driver, hour, date) => {
    const hourStart = new Date(
      `${date}T${String(hour).padStart(2, "0")}:00:00`
    );
    const hourEnd = new Date(`${date}T${String(hour).padStart(2, "0")}:59:59`);

    return driver.availability.some((block) => {
      const blockStart = new Date(block.start);
      const blockEnd = new Date(block.end);
      return blockStart <= hourEnd && blockEnd >= hourStart;
    });
  };

  // Precompute driver availability for better performance
  const availabilityMap = useMemo(() => {
    return drivers.map((driver) => ({
      id: driver.id,
      name: driver.name,
      hours: hours.map((hour) => ({
        available: isAvailableThisHour(driver, hour, selectedDate),
        tooltip: driver.availability
          .filter((block) => {
            const blockDate = new Date(block.start).toISOString().split("T")[0];
            return blockDate === selectedDate;
          })
          .map(
            (block) =>
              `Available from ${new Date(
                block.start
              ).toLocaleTimeString()} to ${new Date(
                block.end
              ).toLocaleTimeString()}`
          )
          .join(", "),
      })),
    }));
  }, [drivers, hours, selectedDate]);

  // Example sort and filter logic
  const filteredAndSortedDrivers = useMemo(() => {
    let result = availabilityMap;

    // Filter drivers
    if (filterAvailableOnly) {
      result = result.filter((driver) =>
        driver.hours.some((hour) => hour.available)
      );
    }

    // Sort drivers
    if (sortBy === "availability") {
      result = result.sort(
        (a, b) =>
          b.hours.filter((hour) => hour.available).length -
          a.hours.filter((hour) => hour.available).length
      );
    } else {
      result = result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [availabilityMap, filterAvailableOnly, sortBy]);

  return (
    <div className="mt-4 p-4 bg-white border border-gray-300 rounded shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Driver Timeline (Hourly)</h2>
        <div className="space-x-2">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <button
            onClick={() => setFilterAvailableOnly(!filterAvailableOnly)}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
          >
            {filterAvailableOnly ? "Show All Drivers" : "Show Available Only"}
          </button>
          <button
            onClick={() =>
              setSortBy(sortBy === "name" ? "availability" : "name")
            }
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
          >
            Sort by {sortBy === "name" ? "Availability" : "Name"}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 sticky top-0">
              <th className="border p-2 text-left">Driver</th>
              {hours.map((h) => (
                <th key={h} className="border p-2 text-center w-16">
                  {h}:00
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedDrivers.map((driver) => (
              <tr key={driver.id} className="hover:bg-gray-50">
                <td className="border p-2 font-medium">{driver.name}</td>
                {driver.hours.map((hour, h) => (
                  <td
                    key={h}
                    className={`border p-2 text-center ${
                      hour.available ? "bg-green-200" : "bg-red-50"
                    }`}
                    data-tooltip-id={`tooltip-${driver.id}-${h}`}
                  >
                    {hour.available ? "✓" : ""}
                    <Tooltip
                      id={`tooltip-${driver.id}-${h}`}
                      place="top"
                      content={hour.tooltip}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DriverTimeline;

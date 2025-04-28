"use client";

import { getAllTasks } from "@/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllTasks()
      .then((result) => {
        setTasks(result.data.tasks);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Failed to load tasks.");
        setIsLoading(false);
      });
  }, []);

  const statusText = {
    pending: "Pending",
    "in-progress": "In Progress",
    completed: "Completed",
  };

  const statusClasses = {
    pending: "bg-red-500 text-white px-3 py-2 rounded",
    "in-progress": "bg-yellow-400 text-black px-3 py-2 rounded",
    completed: "bg-green-500 text-white px-3 py-2 rounded",
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Task Tracker
        </h1>

        {isLoading && (
          <div
            className={
              "my-6 mx-auto size-12 border-8 border-gray-600 border-t-gray-200 rounded-full animate-spin"
            }
          />
        )}

        {error && (
          <div className="text-center text-red-500 font-semibold">{error}</div>
        )}

        {!isLoading && !error && (
          <>
            {tasks.length === 0 ? (
              <div className="text-center text-gray-500">No tasks found.</div>
            ) : (
              <div>
                <table className="w-full table-auto border-collapse">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-4 text-left font-semibold text-gray-700">
                        Title
                      </th>
                      <th className="p-4 text-left font-semibold text-gray-700">
                        Description
                      </th>
                      <th className="p-4 text-left font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="p-4 text-left font-semibold text-gray-700">
                        Due Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task) => (
                      <tr
                        key={task.id}
                        className="odd:bg-white even:bg-gray-100 hover:bg-gray-50"
                      >
                        <td className="p-4">{task.title}</td>
                        <td className="p-4">{task.description}</td>
                        <td className="p-4">
                          <span
                            className={
                              statusClasses[task.status] ||
                              "bg-gray-300 text-black px-2 py-1 rounded"
                            }
                          >
                            {statusText[task.status] || task.status}
                          </span>
                        </td>
                        <td className="p-4">
                          {new Date(task.due_date).toUTCString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

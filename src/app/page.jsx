"use client";

import { getAllTasks, updateTaskStatus } from "@/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

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

  function handleStatusChange(taskId, newStatus) {
    updateTaskStatus(taskId, newStatus)
      .then((res) => {
        setTasks((prevTaskArr) => {
          const nonUpdatedTasks = prevTaskArr.filter((task) => {
            return task.id !== res.data.updatedTask.id;
          });
          return [...nonUpdatedTasks, res.data.updatedTask];
        });
      })
      .catch(() => {
        alert("Failed to update task status.");
      });
    setEditingTaskId(null);
  }

  const statusMap = {
    pending: {
      text: "Pending",
      className: "bg-red-500 text-white px-3 py-2 rounded",
    },
    "in-progress": {
      text: "In Progress",
      className: "bg-yellow-400 text-black px-3 py-2 rounded",
    },
    completed: {
      text: "Completed",
      className: "bg-green-500 text-white px-3 py-2 rounded",
    },
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
              "my-8 mx-auto size-12 border-8 border-gray-600 border-t-gray-200 rounded-full animate-spin"
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
                      <th className="flex justify-between items-center p-4 text-left font-semibold text-gray-700">
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
                          {editingTaskId === task.id ? (
                            <>
                              <select
                                value={task.status}
                                onChange={(e) =>
                                  handleStatusChange(task.id, e.target.value)
                                }
                                onBlur={() => setEditingTaskId(null)}
                              >
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                              </select>
                              <button
                                aria-label="Close dropdown"
                                onClick={() => setEditingTaskId(null)}
                              >
                                X
                              </button>
                            </>
                          ) : (
                            <>
                              <span
                                className={`${
                                  statusMap[task.status].className ||
                                  "bg-gray-300 text-black px-2 py-1 rounded"
                                }`}
                              >
                                {statusMap[task.status].text || task.status}
                              </span>
                              <button
                                aria-label="Edit task"
                                className="px-1 cursor-pointer"
                                onClick={() => setEditingTaskId(task.id)}
                              >
                                🖉
                              </button>
                            </>
                          )}
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

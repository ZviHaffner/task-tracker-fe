"use client";

import { getAllTasks } from "@/api";
import NewTaskForm from "@/components/NewTaskForm";
import TaskRow from "@/components/TaskRow";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  const [showNewTaskForm, setShowNewTaskForm] = useState(false);

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
                      <TaskRow
                        key={task.id}
                        task={task}
                        tasks={tasks}
                        setTasks={setTasks}
                      />
                    ))}
                    {showNewTaskForm ? (
                      <NewTaskForm
                        setTasks={setTasks}
                        setShowNewTaskForm={setShowNewTaskForm}
                      />
                    ) : (
                      <tr>
                        <td>
                          <button
                            className="my-2 px-3 py-2 rounded bg-blue-500 text-white font-bold hover:bg-blue-100 hover:text-blue-500 cursor-pointer"
                            onClick={() => setShowNewTaskForm(!showNewTaskForm)}
                          >
                            Add Task
                          </button>
                        </td>
                      </tr>
                    )}
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

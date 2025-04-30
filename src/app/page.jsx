"use client";

import { addNewTask, getAllTasks, updateTaskStatus } from "@/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "",
    due_date: "",
  });
  const [newTaskErr, setNewTaskErr] = useState({
    title: "",
    description: "",
    status: "",
    due_date: "",
  });

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

  function handleNewTaskChange(e) {
    const { id, value } = e.target;

    setNewTask((prev) => ({ ...prev, [id]: value }));
  }

  function handleNewTaskSubmit(e) {
    e.preventDefault();
    setNewTaskErr({
      title: "",
      description: "",
      status: "",
      due_date: "",
    });

    let isValid = true;

    if (!newTask.title) {
      isValid = false;
      setNewTaskErr((prev) => ({ ...prev, title: "Please Input a Title" }));
    }
    if (!newTask.status) {
      isValid = false;
      setNewTaskErr((prev) => ({ ...prev, status: "Please Choose a Status" }));
    }
    if (!newTask.due_date) {
      isValid = false;
      setNewTaskErr((prev) => ({
        ...prev,
        due_date: "Please Input a Date and Time",
      }));
    }

    if (isValid) {
      addNewTask(newTask)
        .then((res) => {
          setTasks((prevTasks) => [...prevTasks, res.data.task]);
          setNewTask({
            title: "",
            description: "",
            status: "pending",
            due_date: "",
          });
          setShowNewTaskForm(false);
        })
        .catch(() => {
          alert("Failed to add new task.");
        });
    }
  }

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
                                  statusMap[task.status]?.className ||
                                  "bg-gray-300 text-black px-2 py-1 rounded"
                                }`}
                              >
                                {statusMap[task.status]?.text || task.status}
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
                    {showNewTaskForm ? (
                      <>
                        <tr className="odd:bg-white even:bg-gray-100 hover:bg-gray-50">
                          <td>
                            <input
                              id="title"
                              className="w-full p-4"
                              placeholder="Insert Title"
                              value={newTask.title}
                              onChange={handleNewTaskChange}
                            />
                            {console.log(newTask)}
                          </td>
                          <td>
                            <input
                              id="description"
                              className="w-full p-4"
                              placeholder="Insert Description"
                              value={newTask.description}
                              onChange={handleNewTaskChange}
                            />
                          </td>
                          <td>
                            <select
                              id="status"
                              className="w-full p-4"
                              value={newTask.status}
                              onChange={handleNewTaskChange}
                            >
                              <option value="pending">Pending</option>
                              <option value="in-progress">In Progress</option>
                              <option value="completed">Completed</option>
                            </select>
                          </td>
                          <td>
                            <input
                              id="due_date"
                              type="datetime-local"
                              className="w-full p-4"
                              value={newTask.due_date}
                              onChange={handleNewTaskChange}
                            />
                          </td>
                        </tr>
                        <tr className="text-center text-red-600 text-sm">
                          <td>{newTaskErr.title}</td>
                          <td></td>
                          <td>{newTaskErr.status}</td>
                          <td>{newTaskErr.due_date}</td>
                        </tr>
                        <tr>
                          <td>
                            <button
                              className="my-2 px-3 py-2 rounded bg-blue-500 text-white font-bold hover:bg-blue-100 hover:text-blue-500 cursor-pointer"
                              type="submit"
                              onClick={handleNewTaskSubmit}
                            >
                              Add Task
                            </button>
                            <button
                              className="my-2 ml-4 px-3 py-2 rounded bg-red-500 text-white font-bold hover:bg-red-100 hover:text-red-500 cursor-pointer"
                              onClick={() => setShowNewTaskForm(false)}
                            >
                              Close
                            </button>
                          </td>
                        </tr>
                      </>
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

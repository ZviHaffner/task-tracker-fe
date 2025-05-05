import { addNewTask } from "@/api";
import { useState } from "react";

const NewTaskForm = ({ setTasks, setShowNewTaskForm }) => {
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
        .catch((error) => {
          console.log(error);
          alert("Failed to add new task.");
        });
    }
  }

  return (
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
            <option value="" disabled>
              Select a Status
            </option>
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
  );
};

export default NewTaskForm;

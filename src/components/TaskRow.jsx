import { deleteTaskById, updateTaskStatus } from "@/api";
import { useState } from "react";

const TaskRow = ({ task, tasks, setTasks }) => {
  const [buttonTxt, setButtonTxt] = useState("Delete");
  const [editingTask, setEditingTask] = useState(false);

  const statusMap = {
    pending: {
      text: "Pending",
      className: "bg-red-500 text-white",
    },
    "in-progress": {
      text: "In Progress",
      className: "bg-yellow-400 text-black",
    },
    completed: {
      text: "Completed",
      className: "bg-green-500 text-white",
    },
  };

  function handleStatusChange(newStatus) {
    updateTaskStatus(task.id, newStatus)
      .then((res) => {
        setTasks((prevTaskArr) => {
          const nonUpdatedTasks = prevTaskArr.filter((task) => {
            return task.id !== res.data.updatedTask.id;
          });
          return [...nonUpdatedTasks, res.data.updatedTask];
        });
        setEditingTask(false);
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to update task status.");
        setEditingTask(false);
      });
  }

  function handleDeleteTask(e) {
    const TaskId = e.target.value;

    const isConfirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (isConfirmed) {
      setButtonTxt("Deleting...");
      deleteTaskById(TaskId)
        .then(() => {
          alert("Task deleted successfully!");
          const filteredTasks = tasks.filter((task) => {
            return task.id !== Number(TaskId);
          });
          setTasks(filteredTasks);
        })
        .catch((error) => {
          alert("Error deleting task");
          setButtonTxt("Delete");
        });
    }
  }

  return (
    <tr
      key={task.id}
      className="odd:bg-white even:bg-gray-100 hover:bg-gray-50"
    >
      <td className="p-4">{task.title}</td>
      <td className="p-4">{task.description}</td>
      <td className="p-4">
        {editingTask ? (
          <>
            <select
              value={task.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              onBlur={() => setEditingTask(false)}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <button
              aria-label="Close dropdown"
              className="p-1 text-gray-500 font-bold cursor-pointer hover:text-red-500"
              onClick={() => setEditingTask(false)}
            >
              X
            </button>
          </>
        ) : (
          <div className="flex items-center justify-between">
            <span
              className={`w-full px-3 py-2 text-center font-semibold rounded whitespace-nowrap ${
                statusMap[task.status]?.className ||
                "bg-gray-300 text-black"
              }`}
            >
              {statusMap[task.status]?.text || task.status}
            </span>
            <button
              aria-label="Edit task"
              className="px-2 cursor-pointer"
              onClick={() => setEditingTask(true)}
            >
              🖉
            </button>
          </div>
        )}
      </td>
      <td className="p-4">{new Date(task.due_date).toUTCString()}</td>
      <td>
        <button
          className="m-4 px-2 py-1 border-2 border-red-600 rounded text-sm text-red-600 font-bold hover:text-white hover:bg-red-600 cursor-pointer"
          value={task.id}
          onClick={handleDeleteTask}
          disabled={buttonTxt === "Deleting..."}
        >
          {buttonTxt}
        </button>
      </td>
    </tr>
  );
};

export default TaskRow;

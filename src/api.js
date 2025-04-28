import axios from "axios";

const taskTrackerApi = axios.create({
  baseURL: "https://task-tracker-be-klvr.onrender.com/api",
});

export const getAllTasks = () => {
  return taskTrackerApi.get("tasks");
};

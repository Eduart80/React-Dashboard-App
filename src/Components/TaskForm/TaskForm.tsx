import React, { useState } from "react";
import type { Task } from "../../types/index";

type TaskFormProps = {
  onAddTask: (task: Task) => void;
};
// New entry
export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setDescription] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newPriority, setNewPriority] = useState("");
  const [newdueDate, setNewDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const task: Task = {
      id: newTitle,
      title: newTitle,
      description: newDescription,
      status: newStatus as Task["status"],
      priority: newPriority as Task["priority"],
      dueDate: newdueDate,
    };
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    onAddTask(task);
    setNewTitle("");
    setDescription("");
    setNewStatus("");
    setNewPriority("");
    setNewDueDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          Enter Title
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Enter title here"
          value={newTitle}
          aria-label="Title"
          aria-describedby="basic-addon1"
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </div>
      <div className="input-group">
        <span
          className="input-group-text"
          style={{ backgroundColor: "#242424", color: "#fff" }}
        >
          Enter Description
        </span>
        <textarea
          className="form-control"
          aria-label="With textarea"
          style={{ backgroundColor: "#242424", color: "#fff" }}
        ></textarea>
      </div>
      <p>Select Status</p>
      <select
        name="status"
        value={newStatus}
        className="form-control"
        style={{ backgroundColor: "#242424", color: "#fff" }}
        onChange={(e) => setNewStatus(e.target.value)}
      >
        <option value="all status">All Status</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <p>Select Priority</p>
      <select
        name="priority"
        value={newPriority}
        className="form-control"
        style={{ backgroundColor: "#242424", color: "#fff" }}
        onChange={(e) => setNewPriority(e.target.value)}
      >
        <option value="all priority">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <p>Due Date</p>
      <input
        type="date"
        className="form-control"
        name="dueDate"
        value={newdueDate}
        onChange={(e) => setNewDueDate(e.target.value)}
      />
      <div className="d-grid gap-2 col-6 mx-auto">
        <button className="btn btn-outline-primary m-2" type="submit">
          Save Task
        </button>
      </div>
    </form>
  );
};

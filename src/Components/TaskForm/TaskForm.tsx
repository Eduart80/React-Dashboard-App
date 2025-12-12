import React, { useEffect, useState } from "react";
import type { Task } from "../../types/index";

type TaskFormProps = {
  onAddTask: (task: Task) => void;
  onSaveTask?: (task: Task ) => void
  task?: Task | null
};
// New entry
export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask, onSaveTask, task }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setDescription] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newPriority, setNewPriority] = useState("");
  const [newdueDate, setNewDueDate] = useState("");

  //Edit mode
  useEffect(()=>{
    setNewTitle(task ? task.title : "");
    setDescription(task ? task.description : "");
    setNewStatus(task ? task.status : "");
    setNewPriority(task ? task.priority : "");
    setNewDueDate(task ? task.dueDate : "");
  },[task])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: newTitle,
      title: newTitle,
      description: newDescription,
      status: newStatus as Task["status"],
      priority: newPriority as Task["priority"],
      dueDate: newdueDate,
    };
    const storageTasks = JSON.parse(localStorage.getItem("tasks") || "[]")
    storageTasks.push(newTask)
    localStorage.setItem("tasks", JSON.stringify(newTask))

    if(task && onSaveTask){
      onSaveTask(newTask)
    }else{
      onAddTask(newTask)
    }
    
    setNewTitle("");
    setDescription("");
    setNewStatus("");
    setNewPriority("");
    setNewDueDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-3" >
        <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "#242424", color: "#fff" }}>
          Enter Title
        </span>
        <input
          type="text"
          className="form-control"
          style={{ backgroundColor: "#242424", color: "#fff" }}
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
          value={newDescription}
          style={{ backgroundColor: "#242424", color: "#fff" }}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      
      <select
        name="status"
        value={newStatus}
        className="form-control"
        style={{ backgroundColor: "#242424", color: "#fff", marginTop:'10px'}}
        onChange={(e) => setNewStatus(e.target.value)}
      >
        <option value="all status">Select Status</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      
      <select
        name="priority"
        value={newPriority}
        className="form-control"
        style={{ backgroundColor: "#242424", color: "#fff", marginTop:'10px'}}
        onChange={(e) => setNewPriority(e.target.value)}
      >
        <option value="all priority">Slect Priority</option>
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
        style={{ backgroundColor: "#242424", color: "#fff" }}
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

import React from "react";
import type { TaskListProps, TaskStatus } from "../../types";

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onStatusChange,
  onDelete,
  onEdit
}) => {
  const statuses: TaskStatus[] = ["pending", "in-progress", "completed"];
  const getPriorityColor = (prop: string) => {
    switch (prop) {
      case "low":
        return "success";
      case "medium":
        return "warning";
      case "high":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    
        <div style={{ width:'50%', margin:'40px auto', display:"block"}} >
          {tasks.map((object) => (
            <div
              key={object.id}
              className="card mb-3"
              style={{ backgroundColor: "#1f1f1fff", color: "#fff" }}
            >
              <div className="card-body">
                <h5 className="card-title">{object.title}</h5>
                <p className="card-text" style={{  color: "#6b6b6bff" }}>
                  {object.description}
                  <br />
                  <span className={`text-${getPriorityColor(object.priority)}`}>
                    Priority: {object.priority}, Due: {object.dueDate}
                  </span>
                  <br />
                </p>
              </div>

              <div
                className="d-flex justify-content-end align-items-center" 
                style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "100%",
                }}
              >
                <select
                  className="form-select w-25 me-2"
                  defaultValue={object.status}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    onStatusChange &&
                    onStatusChange(object.id, e.target.value as TaskStatus)
                  }
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="btn btn-danger m-2"
                  onClick={() => onDelete(object.id)}
                >
                  Delete
                </button>
                <button 
                  type="button"
                  className="btn btn-primary m-2"
                  onClick={()=> onEdit(object.id)}
                >Edit</button>
              </div>
            </div>
          ))}
        </div>
      
   
  );
};

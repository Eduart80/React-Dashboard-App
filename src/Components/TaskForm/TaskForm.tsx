import React, { useState } from 'react'
import type {Task} from '../../types/index'

type TaskFormProps = {
  onAddTask: (task: Task) => void;
}
// New entry
export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
    const [newTitle, setNewTitle]=useState('')
    const [newDescription, setDescription]=useState('')
    const [newStatus, setNewStatus]=useState('')
    const [newPriority, setNewPriority]=useState('')
    const [newdueDate, setNewDueDate]=useState('')

    const handleSubmit = (e: React.FormEvent)=>{
        e.preventDefault()
        const task: Task = {
            id: newTitle,
            title: newTitle,
            description: newDescription,
            status: newStatus as Task['status'],
            priority: newPriority as Task['priority'],
            dueDate: newdueDate
        }
        const tasks= JSON.parse(localStorage.getItem('tasks')||'[]')
        tasks.push(task)
        localStorage.setItem('tasks', JSON.stringify(tasks))

        onAddTask(task)
        setNewTitle('')
        setDescription('')
        setNewStatus('')
        setNewPriority('')
        setNewDueDate('')
    }

  return (
    <form onSubmit={handleSubmit}>
        
        <input name='title' placeholder='Enter Title ' 
            value={newTitle} 
            onChange={e => setNewTitle(e.target.value)}
            />
        <input name='description' placeholder='Descriptions...'
            value={newDescription}
            onChange={e => setDescription(e.target.value)}
            />
        <select name='status'  
            value={newStatus}         
            className="form-control"
            style={{ backgroundColor: "#232131ff", color: "#fff" }}
            onChange={e => setNewStatus(e.target.value)}>
            <option value='all status'>All Status</option>
            <option value='pending'>Pending</option>
            <option value='in-progress'>In Progress</option>
            <option value='completed'>Completed</option>
        </select>
        <select name='priority'
         value={newPriority}         
            className="form-control"
            style={{ backgroundColor: "#232131ff", color: "#fff" }}
            onChange={e => setNewPriority(e.target.value)}>
            <option value='all priority'>All Priority</option>
            <option value='low'>Low</option>
            <option value='medium'>Medium</option>
            <option value='high'>High</option>
        </select>
        <input type='date'
            name='dueDate'
            value={newdueDate}
            onChange={e=>setNewDueDate(e.target.value)}
            />
        <button type='submit'>Save Task</button>
    </form>
  )
}


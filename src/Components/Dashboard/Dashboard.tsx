import React, { useState, useEffect } from 'react'
import { TaskForm } from '../TaskForm/TaskForm'
import { TaskList } from '../TaskList/TaskList'
import type { Task } from '../../types'

type Props = {}
type TaskFormProps = {
  onAddTask: (task: Task) => void
}

export default function Dashboard({}: Props) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Task 1',
      description: 'Description for Task 1',
      status: 'pending',
      priority: 'medium',
      dueDate: '2025-12-10',
    }
  ])

  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    if (stored) setTasks(JSON.parse(stored));
  }, []);


  const total = tasks.length
  const Completed = tasks.filter(t => t.status === 'completed').length
  // delete a task by id
  const handleDelete = (taskId: string) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <div>
        <h2>Dashboard</h2>
        <div>
          <span>Total tasks: {total}</span>
          <span style={{marginLeft:'20px'}}>Completed: {Completed}</span>
        </div>
        <TaskForm onAddTask={(task: Task) => {
          const updatedTasks = [...tasks, task];
          setTasks(updatedTasks);
          localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        }} />
        <TaskList tasks={tasks} onDelete={handleDelete}/>
    </div>
  )
}
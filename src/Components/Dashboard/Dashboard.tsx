import React, { useState, useEffect } from 'react'
import { TaskForm } from '../TaskForm/TaskForm'
import { TaskList } from '../TaskList/TaskList'
import type { Task, TaskStatus  } from '../../types'
import { TaskFilter } from '../TaskFilter/TaskFilter'

type Props = {}

export default function Dashboard({}: Props) {
  
    const [filters, setFilters ]=useState<{status?: TaskStatus; priority?: 'low' | 'medium' | 'high'}>({})
   
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

  
  // handle status
  const handelStatus = (taskId:string, newStatus: TaskStatus)=>{
    setTasks((prevTask)=>
      prevTask.map(task =>
        task.id === taskId ? {...task , status: newStatus} : task
      )
    )
  }
  // filters
  const handleFilterChange = (newFilters: { status?: TaskStatus; priority?: 'low' | 'medium' | 'high' }) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
  }));
};

const filteredTasks = tasks.filter((task) => {
  const matchesStatus = !filters.status || task.status === filters.status;
  const matchesPriority = !filters.priority || task.priority === filters.priority;
  return matchesStatus && matchesPriority;
});


  const total = tasks.length
  const Completed = tasks.filter(t => t.status === 'completed').length
  // delete a task by id
  const handleDelete = (taskId: string) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.removeItem('tasks');
  };

  return (
    <div className='flex justify-content-center ' style={{ backgroundColor: '#242424', color: "#fff", width:'100vw' }}>
        <h3 style={{ textAlign: 'center', margin:'10px 5px' }}>My List</h3>
        
        <div className='d-flex justify-content-around' style={{marginLeft:'20px'}}>
          <span>Total tasks: {total}</span>
          <span>Completed: {Completed}</span>
        </div>
        <div className='d-flex justify-content-around'>
          <TaskForm onAddTask={(task: Task) => {
            const updatedTasks = [...tasks, task];
            setTasks(updatedTasks);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
          }} />
        </div>
        <div>
         <TaskFilter onFilterChange={handleFilterChange}/>
        </div>
        <div >
          <TaskList 
            tasks={filteredTasks}
            onStatusChange={handelStatus}
            onDelete={handleDelete}
          />
     </div>
    </div>
  )
}
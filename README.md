# React Dashboard App

This project is a task management dashboard application built using React, TypeScript, and Vite. 
It enables users to efficiently manage their daily tasks with the following features:

- **Add, edit, and delete tasks**: Users can create new tasks, update existing ones, and remove tasks they no longer need.
- **Task filtering and sorting**: Tasks can be filtered by status and priority
- **Status updates**: Users can mark tasks as complete or in progress, making it easy to track progress.
- **Responsive design**: The dashboard layout adapts to different screen sizes.
- **Data persistence**: Tasks are saved in localStorage, so user data is preserved between sessions.
- **Edit**: User is able to edit card if any change on the information, data will be stored on localStorage

The codebase demonstrates best practices in component-based architecture, state management with React hooks, and strong type safety with TypeScript. Utility functions are used for filtering, sorting, and validating tasks, making the code modular and maintainable.

---

## Reflection

Working on this project deepened my understanding of React and TypeScript integration. I focused on building reusable components, such as TaskList, TaskForm, and TaskFilter, and composed them within a main Dashboard component. State management was handled using React hooks, with careful attention to prop and lifting state up where necessary for component communication.

One of the main challenges was using hooks and how the data is passed from parent to child across all components and utility functions. Defining clear TypeScript interfaces for tasks and props, which helped catch errors early and made the code easier to maintain. Implementing features like filtering, sorting, and form validation required thoughtful design of utility functions and validation helpers.

Another challenge was managing UI state and providing a responsive, user-friendly experience. I used Bootstrap, and CSS modules to support the design. Persisting data with localStorage was also a valuable learning experience, as it required handling serialization and deserialization of task data.

Overall, this project improved my skills in component composition, state management, and type-safe development with React and TypeScript. It also reinforced the importance of planning, modularity, and user experience in building modern web applications.

---

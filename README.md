# Task Tracker

## Deployed URL

https://task-tracker-fe-kohl.vercel.app/

## General Information

### Overview

Task Tracker is a web application designed to help caseworkers manage their tasks efficiently. It allows users to create, view, update, and delete tasks, with features like status tracking, due dates, and a responsive user interface.

### Features

- Task Management: Create and delete tasks.
- Status Tracking: Track and edit task statuses (Pending, In Progress, Completed).
- Due Dates: Assign and display due dates for tasks.
- Dynamic Forms: Add new tasks directly from the table.
- Loading States & Error Handling
- Responsive Design

### Tech Stack

- Framework: Next.js for server-side rendering and routing.
- Frontend: React.js with functional components and hooks.
- Styling: Tailwind CSS for responsive and modern design.
- API Integration: Axios for backend communication.

### Usage

Adding a New Task
1. Click the "Add Task" button at the bottom of the table.
2. Fill in the task details (title, description, status, and due date).
3. Click "Add Task" to save the task.

Editing a Task
1. Click the edit icon (🖉) next to a task.
2. Update the task's status using the dropdown.
3. The changes save on selection.

Deleting a Task
1. Click the delete button at the end of the row.
2. Confirm by clicking OK in the alert popup.

## Running the Project Locally

1. Clone the repository:  
`git clone https://github.com/ZviHaffner/task-tracker-fe.git`

2. Navigate to the project directory:  
`cd task-tracker-fe`

3. Install dependencies:  
`npm install`

4. Start the development server:  
`npm run dev`

5. Open the app in your browser:  The app should be available at http://localhost:3000

## Future Improvements
- Search and Filter: Add functionality to search and filter tasks by title, status, or due date.
- Add more status states: Allow users to use custom statuses (possibly with custom colour schemes).
- Notifications: Add reminders for tasks nearing their due dates.
- Authentication: Implement user authentication for personalised task management.

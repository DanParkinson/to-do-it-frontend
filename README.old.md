# To-Do-It

## Introduction

Welcome to To-Do-It, a full-stack application designed to help users efficiently organize their tasks and manage their daily activities. This app provides a simple yet powerful interface for creating, editing, and tracking tasks, making it the perfect tool for personal productivity.

Built using Django Rest Framework for the backend and React for the frontend, this app is a showcase of modern web development practices, focusing on usability, performance, and scalability.

Whether you’re looking to keep track of personal goals, manage work projects, or organize your day-to-day activities, this to-do app has you covered. Features like task categorization, filtering, and a user-friendly interface ensure a seamless task management experience.

## User Stories

### Account Management

- As a user, I can create an account so that I can save and manage my tasks.
- As a user, I can log in to my account so that I can access my tasks from anywhere.
- As a user, I can log out of my account so that I can keep my information secure.
- As a user, I can reset my password so that I can regain access if I forget it.
- As a user, I can update my account information so that I can keep my profile up to date.
- As a user, I can delete my account so that I can remove all my data from the application.
- As a user, I want to receive feedback on my actions (e.g., login errors, successful registration) so that I can address issues or confirm success.

### General Users

- As a user, I want to create a new task, so that I can track what I need to accomplish.
- As a user, I want to edit an existing task, so that I can update its details if things change.
- As a user, I want to delete a task, so that I can remove tasks that are no longer needed.
- As a user, I want to mark a task as complete, so that I can see my progress.

### Task Organization

- As a user, I want to categorize my tasks into different categories, so that I can keep related tasks grouped together.
- As a user, I want to set deadlines for tasks, so that I can manage my time effectively.
- As a user, I want to prioritize my tasks, so that I can focus on the most important ones first.
- As a user, I want to sort my tasks by deadline or priority, so that I can quickly identify what needs my attention

### Visual and UX Enhancements

- As a user, I want to have a clean and intuitive interface, so that I can manage my tasks effortlessly.
- As a user, I want to view all my tasks in a list format, so that I can get an overview of what I need to do.
- As a user, I want to view completed tasks separately, so that I can reflect on what I’ve accomplished.

### Advanced Features (Optional)

- As a user, I want to search for a specific task, so that I can quickly find what I’m looking for.
- As a user, I want to receive reminders for tasks with deadlines, so that I don’t miss anything important.

### Accessibility and Support

- As a user, I want the app to work on both desktop and mobile devices, so that I can use it in different scenarios.
- As a user, I want to have tooltips or a tutorial, so that I can understand how to use the app efficiently.

## Sprints

**Sprint 1 - Authentication and Navigation**

The focus if sprint 1 will be to enable navbar navigation and authentication for users. They need to be able to sign up, sign in and sign out.

![Sprint 1 user stories](readme_assets\sprints\1.png)

** Sprint 2 - task Creation, update and delete**

Sprint 2 is about creating forms for edtiing the tasks.

![Sprint 2 user stories](readme_assets\sprints\2.png)

### Account Management and Navigation Bar

### Side Bar for Category and Task Access/Creation

### Task Page and Control Bar

### Search and Filter

### User Feedback and Notifications

### Final Touches

## Design Thinking

Design Thinking is a user-centered approach that guides the development process by focusing on user needs and balancing importance with feasibility. This section outlines how we applied Design Thinking to prioritize features for this project while meeting the assessment requirements, including CRUD functionality.

Given the time constraints of a hard deadline, we focused on high-priority features that are feasible for an inexperienced developer to deliver within the project timeline. Optional features were considered based on their feasibility and potential value to users, allowing room for future enhancements.

### Feature Evaluation

| **Feature**                 | **Importance** | **Feasibility** | **Notes**                           |
| --------------------------- | -------------- | --------------- | ----------------------------------- |
| Create personal account     | 5              | 5               | Core requirement for CRUD.          |
| Update personal information | 5              | 5               | CRUD update functionality.          |
| Delete personal account     | 5              | 5               | CRUD delete functionality.          |
| Create a new task           | 5              | 5               | Core requirement for CRUD.          |
| Edit an existing task       | 5              | 5               | CRUD update functionality.          |
| Delete an existing task     | 5              | 5               | CRUD delete functionality.          |
| Set deadline for task       | 4              | 5               | Requires date field and validation. |
| Mark a task as complete     | 4              | 5               | Simple toggle mechanism.            |
| Categorize tasks            | 4              | 5               | Use labels or categories.           |
| Receive reminders for tasks | 3              | 4               | Requires notification logic.        |
| Task search bar             | 3              | 4               | Requires basic search filter.       |

### Insights and Prioritization

The scoring system helped identify features that align with the assessment criteria and are essential for user functionality:

Legend:

- Importance: 1 (Low) to 5 (Critical)
- Feasibility: 1 (Challenging) to 5 (Easily Achievable)

High-priority and high-feasibility features, such as account management and basic CRUD operations for tasks, were prioritized to ensure a functional minimum viable product (MVP). Optional features like reminders and collaborative task management were noted for potential inclusion in future iterations if time permits.

### Mockups

### Data Models

### Colour Schema

| **Category**                  | **Color**                         | **Reasoning**                                                                    |
| ----------------------------- | --------------------------------- | -------------------------------------------------------------------------------- |
| **Primary Colors**            |                                   |                                                                                  |
| Base Color                    | Soft Blue (#4A90E2)               | Used for headers, buttons, and primary actions to provide contrast in dark mode. |
| Accent Color                  | Vibrant Teal (#14B8A6)            | Ideal for highlighting important notifications, labels, or secondary actions.    |
| **Secondary Colors**          |                                   |                                                                                  |
| Background                    | Deep Black (#121212)              | Standard dark mode background for reducing eye strain.                           |
| Surface (Cards, Modals, etc.) | Dark Grey (#1E1E1E)               | Slightly lighter than the background to create separation between sections.      |
| Secondary Surface             | Charcoal (#252525)                | Used for subtle UI elements and nested sections.                                 |
| **Text**                      |                                   |                                                                                  |
| Text Color (Primary)          | Light Grey (#E0E0E0)              | Ensures readability against a dark background.                                   |
| Text Color (Secondary)        | Muted Grey (#B0B0B0)              | Used for subtitles and less prominent text.                                      |
| Disabled Text                 | Dim Grey (#6B6B6B)                | Indicates inactive or disabled elements.                                         |
| **Status Colors**             |                                   |                                                                                  |
| Success                       | Green (#81C784)                   | Represents success and completion.                                               |
| Warning                       | Amber (#FFB74D)                   | Adds a sense of urgency without being aggressive.                                |
| Error                         | Red (#E57373)                     | Eye-catching but not overly harsh.                                               |
| **Borders & Effects**         |                                   |                                                                                  |
| Divider/Borders               | Darker Grey (#333333)             | Provides clear separation without being intrusive.                               |
| Hover Effects                 | Slightly Darker Grey (#292929)    | Adds depth and interaction feedback.                                             |
| Input Fields                  | Darker Input Background (#2C2C2C) | Creates a clear distinction for form elements.                                   |
| Input Focus                   | Light Blue Border (#93C5FD)       | Ensures users easily recognize active input fields.                              |

### Fonts

## Features

### Landing Page

### Registration Form

### Sign-In Form

### Navbar

### Sidebar

### Task buttons

### Task Page

### Task Controls

### Categories

### Filtering

### Search

### Account Pgae

### Change Password

### Delete Account

### Modal Dialogies for destuctive actions

### New User Notifcations

### Success Design

### Error Messages

### Mobile View

## Components

## Future Improvements

### Short Term

### Long Term

## Frameworks, Libraries and Dependencies

- React
- React Router
- Axios
- Bootstra

## React features used to enhance user experience

## Testing

### Manual Testing

### Automated Testing

## Validator Testing

### W3C CSS Validator

### ESLint JavaScript Validator

### WAVE web accessability Testing

### LIghthouse Testing

## Resolved Bugs

## Unresolved BUgs

## Deployment

To deploy to Heroku, follow these steps:

- Fork or clone this repository in GitHub.
- If you have also cloned and deployed your own version of the TribeHub Django Rest Framework API, you will need to ensure the value of `axios.defaults.baseURL` in `src/api/axiosDefaults.js` is set to the base URL for your API. Pull to your local development environment and push back to GitHub if necessary; otherwise, leave as is to use the original TribeHub API.
- Log in to Heroku.
- Select 'Create new app' from the 'New' menu at the top right.
- Enter a name for the app and select the appropriate region.
- Select 'Create app'.
- Select the 'Deploy' tab at the top.
- Select 'GitHub' from the deployment method options to confirm you wish to deploy using GitHub. You may be asked to enter your GitHub password.
- Find the 'Connect to GitHub' section and use the search box to locate your repo.
- Select 'Connect' when found.
- Optionally choose the main branch under 'Automatic Deploys' and select 'Enable Automatic Deploys' if you wish your deployed site to be automatically redeployed every time you push changes to GitHub.
- Find the 'Manual Deploy' section, choose 'main' as the branch to deploy and select 'Deploy Branch'.

When deployment is complete, you will be given a link to the deployed site.

## Credits

## Media

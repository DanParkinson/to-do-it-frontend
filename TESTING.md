# **MANUAL TESTING**

## **1. Authentication**

### **Switch Between Sign In and Sign Up Pages**

| Feature                        | Expected Outcome                                 | Testing Performed         | Result                     | Pass/Fail |
| ------------------------------ | ------------------------------------------------ | ------------------------- | -------------------------- | --------- |
| Switch from Sign In to Sign Up | Clicking "Sign Up" navigates to the sign-up page | Clicked on "Sign Up" link | Redirected to sign-up page | Pass      |
| Switch from Sign Up to Sign In | Clicking "Sign In" navigates to the sign-in page | Clicked on "Sign In" link | Redirected to sign-in page | Pass      |

### **Sign Up**

| Feature                      | Expected Outcome                              | Testing Performed                                                | Result                                 | Pass/Fail |
| ---------------------------- | --------------------------------------------- | ---------------------------------------------------------------- | -------------------------------------- | --------- |
| Sign up with valid details   | Registers user and redirects to the dashboard | Entered valid email, username, and password, then submitted form | Successfully registered and redirected | Pass      |
| Sign up with missing details | Displays validation error messages            | Left fields empty and submitted form                             | Validation errors displayed            | Pass      |
| Sign up with existing email  | Displays error message                        | Used an already registered email                                 | Error message displayed                | Pass      |
| Sign up with weak password   | Displays error message                        | Entered a weak password (e.g., "12345")                          | Weak password error displayed          | Pass      |

### **Sign In**

| Feature                          | Expected Outcome                            | Testing Performed                       | Result                                | Pass/Fail |
| -------------------------------- | ------------------------------------------- | --------------------------------------- | ------------------------------------- | --------- |
| Sign in with correct credentials | Logs in the user and redirects to dashboard | Entered valid email and password        | Successfully logged in and redirected | Pass      |
| Sign in with incorrect password  | Displays error message                      | Entered incorrect password              | Error message displayed               | Pass      |
| Sign in with unregistered email  | Displays error message                      | Entered an email that is not registered | Error message displayed               | Pass      |
| Sign in with missing details     | Displays validation error message           | Left fields empty and submitted form    | Validation errors displayed           | Pass      |

## **2. Sidebar Navigation**

### **Icons Displayed Correctly**

| Feature                   | Expected Outcome                                                                                        | Testing Performed          | Result                    | Pass/Fail |
| ------------------------- | ------------------------------------------------------------------------------------------------------- | -------------------------- | ------------------------- | --------- |
| Sidebar icons are visible | Icons for categories, tasks, archive, create task, create category, profile, and sign-out are displayed | Visually inspected sidebar | Icons correctly displayed | Pass      |
| Icons change on hover     | Icons change styling (color/opacity) on hover                                                           | Hovered over each icon     | Styling changed correctly | Pass      |

### **Categories and Tasks Displayed**

| Feature                          | Expected Outcome                                                | Testing Performed                                 | Result                                     | Pass/Fail |
| -------------------------------- | --------------------------------------------------------------- | ------------------------------------------------- | ------------------------------------------ | --------- |
| User's categories are listed     | All created categories are displayed in the sidebar             | Checked sidebar after creating categories         | Categories are listed correctly            | Pass      |
| User's tasks are listed          | Tasks assigned to categories appear under respective categories | Created a task and checked the sidebar            | Tasks are listed correctly                 | Pass      |
| Archived tasks do not appear     | Completed/archived tasks do not appear in active tasks list     | Completed a task and checked sidebar              | Archived tasks are hidden from active view | Pass      |
| Excess categories are scrollable | If too many categories exist, scrolling is enabled              | Created multiple categories and checked scrolling | Scrollable as expected                     | Pass      |

### **Navigation to Pages**

| Feature                     | Expected Outcome                                               | Testing Performed            | Result                                  | Pass/Fail |
| --------------------------- | -------------------------------------------------------------- | ---------------------------- | --------------------------------------- | --------- |
| Navigate to Categories      | Clicking on a category navigates to its task list              | Clicked on a category        | Redirected to category's task list      | Pass      |
| Navigate to Tasks           | Clicking on "All Tasks" navigates to the task list             | Clicked on "All Tasks"       | Redirected to task list                 | Pass      |
| Navigate to Archived Tasks  | Clicking on "Archived" navigates to archived tasks page        | Clicked on "Archived"        | Redirected to archive page              | Pass      |
| Navigate to Create Task     | Clicking on "Create Task" opens the task creation form         | Clicked on "Create Task"     | Redirected to task creation form        | Pass      |
| Navigate to Create Category | Clicking on "Create Category" opens the category creation form | Clicked on "Create Category" | Redirected to category creation form    | Pass      |
| Navigate to Profile         | Clicking on "Profile" navigates to the user profile page       | Clicked on "Profile"         | Redirected to profile page              | Pass      |
| Sign Out                    | Clicking "Sign Out" logs out user and redirects to login page  | Clicked "Sign Out"           | User logged out and redirected to login | Pass      |

## **3. Task Page, Category Page & Archived Tasks**

### **Task Page**

| Feature                  | Expected Outcome                                                    | Testing Performed                          | Result                         | Pass/Fail |
| ------------------------ | ------------------------------------------------------------------- | ------------------------------------------ | ------------------------------ | --------- |
| Navigate to each task    | Clicking on a task opens its detailed view                          | Clicked on different tasks                 | Correct task details displayed | Pass      |
| Correct task displayed   | The correct task data (title, description, priority, etc.) is shown | Opened multiple tasks and verified details | Task data matched              | Pass      |
| Navigate to edit task    | Clicking edit button redirects to the edit form for the task        | Clicked edit button on a task              | Redirected to edit task form   | Pass      |
| Navigate to delete modal | Clicking delete opens the confirmation modal                        | Clicked delete button on a task            | Delete modal appeared          | Pass      |

### **Category Page**

| Feature                      | Expected Outcome                                           | Testing Performed                    | Result                                 | Pass/Fail |
| ---------------------------- | ---------------------------------------------------------- | ------------------------------------ | -------------------------------------- | --------- |
| Navigate to each category    | Clicking a category displays only tasks from that category | Clicked different categories         | Only tasks for selected category shown | Pass      |
| Correct categories displayed | All user-created categories appear in the list             | Checked category list                | All categories are present             | Pass      |
| Delete category button       | Clicking delete opens the confirmation modal               | Clicked delete button on a category  | Delete modal appeared                  | Pass      |
| Edit category button         | Clicking edit allows renaming the category                 | Clicked edit button and changed name | Category name updated correctly        | Pass      |

### **Archived Tasks Page**

| Feature                        | Expected Outcome                            | Testing Performed                         | Result                              | Pass/Fail |
| ------------------------------ | ------------------------------------------- | ----------------------------------------- | ----------------------------------- | --------- |
| Only completed tasks displayed | Only archived/completed tasks are listed    | Checked archived task list                | No active tasks shown               | Pass      |
| Navigate to each archived task | Clicking an archived task opens its details | Clicked different archived tasks          | Correct archived task details shown | Pass      |
| Navigate to delete modal       | Clicking delete opens confirmation modal    | Clicked delete button on an archived task | Delete modal appeared               | Pass      |

### **Task Deletion Modal**

| Feature           | Expected Outcome                                              | Testing Performed               | Result                    | Pass/Fail |
| ----------------- | ------------------------------------------------------------- | ------------------------------- | ------------------------- | --------- |
| Open delete modal | Clicking delete button on a task opens the confirmation modal | Clicked delete button on a task | Delete modal appeared     | Pass      |
| Confirm deletion  | Clicking "Confirm" removes the task permanently               | Clicked "Confirm" button        | Task deleted successfully | Pass      |
| Cancel deletion   | Clicking "Cancel" closes the modal without deleting           | Clicked "Cancel" button         | Task remained intact      | Pass      |

### **Category Deletion Modal**

| Feature           | Expected Outcome                                                  | Testing Performed                   | Result                        | Pass/Fail |
| ----------------- | ----------------------------------------------------------------- | ----------------------------------- | ----------------------------- | --------- |
| Open delete modal | Clicking delete button on a category opens the confirmation modal | Clicked delete button on a category | Delete modal appeared         | Pass      |
| Confirm deletion  | Clicking "Confirm" removes the category permanently               | Clicked "Confirm" button            | Category deleted successfully | Pass      |
| Cancel deletion   | Clicking "Cancel" closes the modal without deleting               | Clicked "Cancel" button             | Category remained intact      | Pass      |

---

#### HTML

<p align="center">
    <img src="readme_assets\html-validator.png" width="600">
</p>

### CSS

All CSS files were passed through the W3C validator. No errors and all warnings are from vendor extensions so ignored

<p align="center">
    <img src="readme_assets\CSS-validator.png" width="600">
</p>

## JSX Validation

- Most of the code validation was done through the pre installed elslint from the moments walkthrough repo and with the help of the prettier code formatting extension.
- For good measure, I ran the jsx files through this [eslint](https://eslint.org/play/).
- It was not an ideal way to validate due to the fact that it is bound to throw unused variable/undefined variable errors because of the nature of importing/exporting components and variables between the different files.
- I ignored the above error types and checked for syntax errors, and found the code to be clean.

## Lighthouse checks

During Lighthouse testing, the following **performance issues** were identified. While no changes will be made at this time, this section documents the key areas for potential future optimization.

### **1. Render-Blocking Resources**

- Some CSS and JavaScript files delay the initial page rendering.
- This results in a slower **First Contentful Paint (FCP)** and **Largest Contentful Paint (LCP)**.

### **2. Largest Contentful Paint (LCP) - 5.2s**

- The primary content takes too long to load.
- Contributing factors include **unoptimized images**, lack of **lazy loading**, and **server response delays**.

### **3. Reduce Unused JavaScript (36 KiB)**

- Some JavaScript files contain **unused code**.
- This increases **bundle size** and slows **script execution**.

### **4. Reduce Unused CSS (39 KiB)**

- Unused CSS rules increase **rendering time**.
- This affects page **load speed** and increases unnecessary **CSS file size**.

### **5. Serve Static Assets with an Efficient Cache Policy**

- Some assets **lack proper caching headers**.
- This increases **load times**, especially on repeated visits.

### **6. Avoid Large Layout Shifts**

- Some elements cause **unexpected movement** after loading.
- This impacts **Cumulative Layout Shift (CLS)** and user experience.

### **7. Reduce JavaScript Execution Time**

- JavaScript execution is **slower than expected**.
- This affects **interactivity** and delays UI updates.

### **8. Minimize Main-Thread Work (0.6s)**

- Too much JavaScript runs **on the main thread**, slowing interactivity.
- This leads to noticeable UI **delays**.

### **9. Avoid Long Main-Thread Tasks**

- A few **blocking scripts** cause **long tasks**.
- This negatively affects responsiveness.

### **10. Avoid Enormous Network Payloads (416 KiB)**

- The total page size is **relatively large**.
- Images, fonts, and scripts contribute to **higher load times**.

### **11. Avoid Excessive DOM Size (47 Elements)**

- The number of elements is **moderately high**.
- This may lead to **slower rendering performance** on lower-end devices.

### **12. Avoid Chaining Critical Requests (8 Chains)**

- Some assets **depend on others**, delaying load times.
- This impacts **render speed** and resource prioritization.

### **13. Minimize Third-Party Usage**

- External scripts slightly **increase blocking time**.
- This is not a major concern but could be optimized.

### **Conclusion**

While these issues affect **performance scores**, they do not critically impact the **functionality or usability** of the application. Future improvements may focus on optimizing assets, refining JavaScript execution, and implementing efficient caching strategies.

## Accessability

This was mainly lowered by the lack of button and form labels. all buttons and forms had these added to them for improved screen readability scores.

### checks

All pages were checked but main pages are logged here

<p align="center">
    <img src="readme_assets\lh-auth-page.png" width="600">
</p>
<p align="center">
    <img src="readme_assets\lh-tasks.png" width="600">
</p>
<p align="center">
    <img src="readme_assets\lh-task.png" width="600">
</p>
<p align="center">
    <img src="readme_assets\lh-create-task.png" width="600">
</p>
<p align="center">
    <img src="readme_assets\lh-taskedit.png" width="600">
</p>

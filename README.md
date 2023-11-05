# Hello Molly Code Test

This repository contains the source code for the Next.js application developed for the Hello Molly code test. Experience the live version of the application at [hello-molly-3266.vercel.app](https://hello-molly-3266.vercel.app/).

## Prerequisites

Make sure you have Node.js installed on your system to run a Next.js application. This project is optimized for Node.js version 18.17. You can download the recommended version of Node.js from the official website at [nodejs.org](https://nodejs.org/).

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

1. Install project dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
   Navigate to `http://localhost:3000` in your browser to view the application.

## Building for Production

To build the application for production, follow these steps:

1. Generate the production build of the app:

   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Running Tests

Run the test suite with the following command:

```bash
npm test
```

## Features

- **Fetch Organizational Data**: Dynamically pulls organizational data for rendering.
- **Hierarchical Structure**: Displays a tree-like structure of the organization, with nodes for each employee.
- **Expand/Collapse Nodes**: Nodes can be clicked to expand or collapse, showing or hiding subordinate details.
- **Navigation Mechanism**: Users can navigate up and down the hierarchy with the TAB and return keys or up and down arrows.
- **User-Friendly Interface**: The application is designed with a focus on user experience and aesthetics.
- **Responsive Design**: The application is fully responsive and functional across a variety of device sizes.

## Technologies Used

- **React.js/Next.js**: Used as the foundational framework for building the user interface.
- **Material UI**: Implements Google's Material Design for the UI components.
- **Tailwind CSS**: Applied for custom styling solutions where necessary.
- **Redux**: Manages application state, particularly for maintaining theming across components.
- **Random User API**: Serves as the source for simulated user data.

## Testing Approach

### Test-Driven Development

Test-driven development (TDD) was adopted for crucial aspects of the application:

- **Data Formatting**: Ensuring the integrity and correctness of data formatting was prioritized. Automated test cases were written before the implementation to validate the data structure needed for the application's organizational chart.
- **DOM Rendering**: Tests were created to check if the data was accurately rendered to the DOM, confirming that the components display the information as expected.

### Redux and Browser Testing

As the project progressed, the focus shifted towards browser testing, particularly for:

- **State Management**: The Redux store was thoroughly tested using browser dev tools to track state changes across different user interactions.
- **Functional Testing**: Manual testing was carried out to ensure that all features worked seamlessly together and that user inputs led to the correct outputs.

### Custom Trie Component

A custom trie component was implemented for efficient searching and sorting:

- **Search Efficiency**: Test cases were designed to measure the performance and accuracy of the search functionality provided by the trie component.
- **Hierarchical Mapping**: Tests ensured that the trie data structure correctly mapped data into hierarchical levels suitable for DOM representation.

## Testing

I have implemented a suite of tests to ensure the integrity and functionality of our application's user data processing. These tests can be found in `__tests__/index.test.tsx` and cover the following areas:

### `simplifyResult` Function

- **Purpose**: To transform the API response into a simplified format for further processing.
- **Test**: Verifies that the function returns the expected simplified result object, containing only the UUID, picture, name, and email of the user.

### `assignDepartmentAndPosition` Function

- **Purpose**: Assigns a department and a default position to a simplified user profile.
- **Test**: Confirms that the function accurately assigns a department and labels the user as an 'Employee'.

### `simplifyAndAssignMultiple` Function

- **Purpose**: Processes multiple user profiles at once, simplifying them and assigning departments.
- **Test**: Ensures that the function can handle a batch of profiles, correctly assigning the simplified structure and department to each.

### Managerial and Hierarchical Assignments

- **Tests**: These validate the correct assignment of managerial roles, including the promotion of users to Managers, Directors, and a CEO.
  - `assignManagers` checks for the correct number of managers and their distribution across departments.
  - `promoteEmployeesToDirectors` ensures that each department has one director.
  - `promoteEmployeeToCEO` confirms the promotion of one user to CEO.

### Departmental Filtering

- **Purpose**: Filters users by their department.
- **Test**: Verifies that `filterByDepartment` accurately returns users belonging to a specified department.

### Comprehensive Assignment Function

- **Purpose**: A full run-through which combines simplification, department assignment, managerial promotion, and CEO promotion.
- **Test**: Confirms that `simplifyAndAssignAll` performs all steps and results in the correct overall structure and hierarchy, with the correct number of managers, directors, and one CEO.

### Manager-Employee Relationship

- **Purpose**: Ensures that employees have managers from the same department.
- **Test**: Validates that each 'Employee' has a 'Manager', and that the manager is from the same department as the employee.

To run the tests, navigate to the project root directory and execute:

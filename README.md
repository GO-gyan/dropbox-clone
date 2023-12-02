# Dropbox Clone

## Overview

Dropbox Clone is a web application that emulates the functionality of Dropbox. It allows users to securely log in using Clerk authentication, where they can manage files in a cloud-based storage system.

## Features

-   **Authentication:** Uses [@clerk/nextjs](https://www.npmjs.com/package/@clerk/nextjs) for secure user authentication.
-   **File Management:** Users can upload, view, edit, and delete files within their storage space.
-   **File List:** Provides a clean interface to display the list of files with options for editing and deleting.
-   **Themes:** Supports light mode, dark mode, and system theme mode for a personalized user experience.

## Technologies

-   **Frontend:** Built with Next.js, React, and Tailwind CSS.
-   **State Management:** Utilizes Zustand for efficient state management.
-   **Firebase:** Integrated for cloud services and backend functionalities.
-   **UI Components:** Employs ShadcnUI components.
-   **Icons:** Uses Lucide React for a set of clean and minimalistic icons.

## Usage

1. **Login:** Users can log in securely using Clerk authentication.
2. **File Operations:** Upload, edit, and delete files seamlessly.
3. **Theme Options:** Choose between light mode, dark mode, or system theme mode.

## Development

-   **Next.js:** Developed using the Next.js framework for server-side rendering.
-   **Tailwind CSS:** Styled with the Tailwind CSS framework for a responsive design.
-   **Linting:** Includes linting scripts for code quality assurance.

## Scripts

-   **dev:** Run the development server.
    ```bash
    npm run dev
    ```
-   **build:** Build the project for production.
    ```bash
    npm run build
    ```
-   **start:** Start the production server.
    ```bash
    npm start
    ```
-   **lint:** Lint the project using Next.js linting.
    ```bash
    npm run lint
    ```

## Dependencies

-   **[@clerk/nextjs](https://www.npmjs.com/package/@clerk/nextjs):** Authentication library for Next.js.
-   **[@radix-ui/react-dialog](https://www.npmjs.com/package/@radix-ui/react-dialog):** Accessible dialog components.
-   **[@radix-ui/react-dropdown-menu](https://www.npmjs.com/package/@radix-ui/react-dropdown-menu):** Accessible dropdown menu components.
-   **[@radix-ui/react-slot](https://www.npmjs.com/package/@radix-ui/react-slot):** A set of primitive UI primitives for React.
-   **[@tanstack/react-table](https://www.npmjs.com/package/@tanstack/react-table):** Hooks for building fast and extendable tables.
-   **class-variance-authority:** Utility for managing class variations.
-   **clsx:** A utility for constructing className strings.
-   **firebase:** Cloud services for backend.
-   **lucide-react:** A set of React icons.
-   **next:** React framework for production.
-   **next-themes:** Theming utility for Next.js.
-   **pretty-bytes:** Convert bytes to a human-readable string.
-   **react:** JavaScript library for building user interfaces.
-   **react-dom:** React package for working with the DOM.
-   **react-dropzone:** Simple React hook to create a HTML5-compliant drag'n'drop zone for files.
-   **react-file-icon:** Display file icons next to file names.
-   **react-firebase-hooks:** Collection of hooks for Firebase.
-   **react-hot-toast:** React notifications.
-   **tailwind-merge:** A utility for merging Tailwind CSS classes.
-   **tailwindcss-animate:** CSS animations for Tailwind CSS.
-   **zustand:** State management for React.

Feel free to explore and contribute to enhance the functionality and features of this Dropbox Clone!

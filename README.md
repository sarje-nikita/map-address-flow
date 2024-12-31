# address flow with Google Maps Integration

This project is a starter template for building web applications using Vite, React, and TypeScript, with integrated Google Maps functionality. It includes a basic setup with essential configurations, dependencies, and components to get you started quickly with location-based features.

## Features

- **Vite:** A fast and lightweight build tool for modern web development.
- **React:** A popular JavaScript library for building user interfaces.
- **TypeScript:** A superset of JavaScript that adds static typing for improved code quality and maintainability.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **Lucide React:** A library of beautiful and consistent icons.
- **ESLint:** A pluggable linting utility for JavaScript and TypeScript.
- **Google Maps Integration:** Includes components for displaying maps, searching locations, and managing saved addresses.
- **Geolocation:** Uses the browser's geolocation API to get the user's current location.
- **Address Management:** Allows users to save and manage their addresses.

## Published Project

The project is available on GitHub. You can view and clone the repository from the following link:

🔗 [address flow with Google Maps Integration](https://luminous-quokka-4102a8.netlify.app/)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

In the root directory, add your Google Maps API key:

```env
VITE_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
```

### 4. Start the development server

```bash
npm run dev
```

This will start the Vite development server, and you can view the application in your browser.

## Project Structure

```
project/
├── .env
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── src/
│   ├── App.tsx
│   ├── assets/
│   ├── components/
│   │   ├── AddressForm.tsx
│   │   ├── AddressManager.tsx
│   │   ├── DeliveryPinMessage.tsx
│   │   ├── LocationPicker.tsx
│   │   ├── LocationPermissionModal.tsx
│   │   ├── LocationSearch.tsx
│   │   ├── Map.tsx
│   │   ├── SavedAddresses.tsx
│   │   ├── SearchBox.tsx
│   │   └── ui/
│   │       ├── Combobox.tsx
│   │       └── Modal.tsx
│   ├── hooks/
│   │   └── useGeolocation.ts
│   ├── index.css
│   ├── main.tsx
│   ├── types/
│   │   └── location.ts
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

### Key Files and Directories

- `.env`: Stores environment variables, including the Google Maps API key.
- `.gitignore`: Specifies intentionally untracked files that Git should ignore.
- `index.html`: The main HTML file for the application.
- `package.json`: Contains project metadata and dependencies.
- `postcss.config.js`: Configuration file for PostCSS.
- `src/`: Contains the source code for the application.
  - `App.tsx`: The main application component that manages the overall layout and state.
  - `components/`: Contains reusable React components.
    - `AddressForm.tsx`: Component for adding a new address.
    - `AddressManager.tsx`: Component for managing saved addresses.
    - `DeliveryPinMessage.tsx`: Component for displaying a message on the map.
    - `LocationPicker.tsx`: Component for selecting a location on the map.
    - `LocationPermissionModal.tsx`: Component for requesting location permissions.
    - `LocationSearch.tsx`: Component for searching and selecting locations.
    - `Map.tsx`: Component for displaying the Google Map.
    - `SavedAddresses.tsx`: Component for displaying a list of saved addresses.
    - `SearchBox.tsx`: Component for searching locations using Google Places API.
    - `ui/`: Contains reusable UI components.
      - `Combobox.tsx`: A combobox component.
      - `Modal.tsx`: A modal component.
  - `hooks/`: Contains custom React hooks.
    - `useGeolocation.ts`: Custom hook for accessing the browser's geolocation API.
  - `index.css`: Global CSS styles.
  - `main.tsx`: Entry point for the React application.
  - `types/`: Contains TypeScript type definitions.
    - `location.ts`: TypeScript type definitions for location-related data.
  - `vite-env.d.ts`: TypeScript type definitions for Vite environment variables.
- `tailwind.config.js`: Configuration file for Tailwind CSS.
- `tsconfig.app.json`: TypeScript configuration for the application.
- `tsconfig.json`: TypeScript configuration for the project.
- `tsconfig.node.json`: TypeScript configuration for Node.js.
- `vite.config.ts`: Configuration file for Vite.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run preview`: Starts a local server to preview the production build.

## Screenshots

[Add screenshots here]

## Contributing

Feel free to contribute to this project by submitting issues or pull requests. For detailed guidelines, please refer to our [CONTRIBUTING.md](CONTRIBUTING.md) file.

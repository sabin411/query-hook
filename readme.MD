# Query Hook CLI

## Overview

This CLI tool allows developers to easily create query or mutation hooks that integrate React Query and Axios, while ensuring proper type safety. The primary goal of this CLI is to provide a boilerplate setup for creating hooks, minimizing repetitive tasks and allowing developers to focus on specific logic or customizations. With minimal tweaks, developers can generate ready-to-use hooks effortlessly.

---

## Features

- Seamless integration with React Query and Axios.
- Auto-generated hooks with proper type definitions.
- Simplifies repetitive setup tasks for developers.
- Configurable paths for imports and exports.

---

## Installation

Install the CLI globally on your device:

```bash
npm install -g api-query-hook-cli
```

---

## Configuration

1. Create a JSON file named `hookApi.json` in your project root directory.
2. Configure the JSON file as follows:

**`[Note]`**: Change the exportPaths as per you requirements.

```json
{
  "exportPath": {
    "typeScript": "/types",
    "service": "/services",
    "hook": "/hooks/apiHooks"
  }
}
```

- **`importPath`**: Specifies the paths to import dependencies like types, services, and hooks.
- **`exportPath`**: Specifies the paths where generated files will be placed.

---

## Usage

To create a new hook, simply run the following command:

```bash
ah -c
```

The CLI will guide you through a series of prompts to gather information about your hook and generate the required files.

---

## Example Workflow

1. Configure the `hookApi.json` file as shown above.
2. Run the CLI using the command `ah -c`.
3. Follow the prompts to specify details like:
   - Hook name
   - Service name
   - TypeScript file for type definitions
   - API endpoint and method
4. The CLI generates a fully functional hook with minimal effort.

---

## Benefits

- Saves development time by automating boilerplate creation.
- Ensures consistency across hooks.
- Simplifies integration with React Query and Axios.

---

Feel free to extend or customize this CLI as per your project's requirements. Happy coding! 🚀

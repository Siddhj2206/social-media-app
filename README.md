# Social Media App

A responsive social media application built with Next.js, React, TypeScript, and Tailwind CSS. This project provides a clean, modern UI for browsing posts, user profiles, and interacting with a social media platform.

## Features

- **Authentication**: Secure login system integrated with DummyJSON API
- **Feed Timeline**: Browse posts from various users
- **User Profiles**: View detailed user information and their posts
- **Post Details**: View individual posts with comments
- **Search Functionality**: Search for posts by keywords
- **Tag Filtering**: Browse posts by tags
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Theme Support**: Light and dark mode with system preference detection

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [DummyJSON](https://dummyjson.com/) - Mock API for development

## Project Structure

```
├── app/                  # Next.js App Router pages
│   ├── (main)/           # Main application routes
│   ├── login/            # Authentication page
│   └── layout.tsx        # Root layout
├── components/           # Reusable UI components
│   ├── ui/               # Base UI components
│   └── ...               # Feature-specific components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
├── styles/               # Global styles
└── ...                   # Config files
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/social-media-app.git
   cd social-media-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Authentication

The app uses DummyJSON for authentication. You can log in with the following demo credentials:

- **Username:** michaelw
- **Password:** michaelwpass

## API Integration

This project uses [DummyJSON](https://dummyjson.com/) for mock API data, including:
- User authentication
- User profiles
- Posts and comments
- Search functionality

## Available Routes

- `/` - Main feed
- `/login` - Login page
- `/post/[id]` - Individual post view
- `/user/[id]` - User profile page
- `/search` - Search results
- `/tag/[tag]` - Posts filtered by tag

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

Similar code found with 2 license types

Siddhj2206: make this a md fille

GitHub Copilot: # Login Component Documentation

## Overview

The Login page provides user authentication functionality for the social media application. It features a clean, responsive UI built with React and styled using Tailwind CSS and shadcn/ui components.

![Login Page Screenshot](https://placeholder-for-screenshot.png)

## Features

- Username and password authentication
- Form validation with required fields
- Loading state during authentication
- Error handling with user-friendly messages
- Demo credentials with auto-fill functionality
- Responsive design that works across devices

## Component Structure

The login page is a client-side component that uses React hooks for state management and the application's authentication context for handling login operations.

### State Management

```tsx
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
const [error, setError] = useState("")
const { login, isLoading } = useAuth()
```

- `username` and `password` - Store form input values
- `error` - Stores authentication error messages
- `isLoading` - Boolean from auth context to indicate authentication in progress

## Authentication Flow

1. User inputs credentials (or uses auto-fill demo credentials)
2. On form submission, `handleSubmit` function:
   - Prevents default form behavior
   - Clears any existing error messages
   - Calls the `login` function from the auth context
   - Catches and displays any authentication errors

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setError("")

  try {
    await login(username, password)
  } catch (err: any) {
    setError(err.message || "Invalid username or password")
  }
}
```

## Demo Credentials

The component provides demo credentials for testing purposes:

- Username: michaelw
- Password: michaelwpass

Users can click the "Auto-fill Demo Credentials" button to automatically populate the form with these values.

```tsx
const fillDemoCredentials = () => {
  setUsername("michaelw")
  setPassword("michaelwpass")
}
```

## UI Components

The login page utilizes the following UI components from the shadcn/ui library:

- `Card` with `CardHeader`, `CardContent`, `CardFooter`, etc. - Provides container layout
- `Input` - Form input fields for username and password
- `Button` - Submit button with loading state
- Error alert with `AlertCircle` icon from Lucide

## Usage

The login component is typically placed at the `/login` route and redirects authenticated users to the main application.

### Integration with Auth Provider

This component relies on the custom `useAuth` hook from `@/components/auth-provider` which should provide:

- `login(username: string, password: string): Promise<void>` - Function to handle authentication
- `isLoading: boolean` - Loading state during authentication

## Error Handling

Error messages are displayed in a visible error container with the following structure:

```tsx
{error && (
  <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-2 text-destructive">
    <AlertCircle className="h-4 w-4" />
    <p className="text-sm">{error}</p>
  </div>
)}
```

## Accessibility

- Form inputs have associated labels
- Required attributes are used for form validation
- Loading state is communicated to users during submission

Siddhj2206: no. Give me the readme as a md file

GitHub Copilot: ```markdown
# Social Media App

A responsive social media application built with Next.js, React, TypeScript, and Tailwind CSS. This project provides a clean, modern UI for browsing posts, user profiles, and interacting with a social media platform.

## Features

- **Authentication**: Secure login system integrated with DummyJSON API
- **Feed Timeline**: Browse posts from various users
- **User Profiles**: View detailed user information and their posts
- **Post Details**: View individual posts with comments
- **Search Functionality**: Search for posts by keywords
- **Tag Filtering**: Browse posts by tags
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Theme Support**: Light and dark mode with system preference detection

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [DummyJSON](https://dummyjson.com/) - Mock API for development

## Project Structure

```
├── app/                  # Next.js App Router pages
│   ├── (main)/           # Main application routes
│   ├── login/            # Authentication page
│   └── layout.tsx        # Root layout
├── components/           # Reusable UI components
│   ├── ui/               # Base UI components
│   └── ...               # Feature-specific components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
├── styles/               # Global styles
└── ...                   # Config files
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/social-media-app.git
   cd social-media-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Authentication

The app uses DummyJSON for authentication. You can log in with the following demo credentials:

- **Username:** michaelw
- **Password:** michaelwpass

## API Integration

This project uses [DummyJSON](https://dummyjson.com/) for mock API data, including:
- User authentication
- User profiles
- Posts and comments
- Search functionality

## Available Routes

- `/` - Main feed
- `/login` - Login page
- `/post/[id]` - Individual post view
- `/user/[id]` - User profile page
- `/search` - Search results
- `/tag/[tag]` - Posts filtered by tag

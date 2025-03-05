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
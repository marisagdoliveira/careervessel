## Internal Developer Documentation

This documentation is aimed at developers working on the project, providing a deep dive into the architecture, codebase, endpoints, and other essential technical details.

## Project Career Vessel Developer Documentation

# Introduction
Welcome to the developer documentation for Career Vessel. This guide provides an in-depth look at the project's architecture, codebase, endpoints, and development workflow.

## Table of Contents

1. Architecture
2. Project Structure
3. Endpoints
4. Static Site Generation and SSR
5. Development Workflow
6. Deployment
7. Environment Variables
8. Common Issues & Troubleshooting
9. Contribution Guidelines

## Architecture
Carreer Vessel is built using Next.js, React, and Node.js with MongoDB. The architecture consists of:

- Frontend: Built with Next.js and React.
- Backend: Node.js with Next.js for API routes.
- Database: MongoDB for data storage.

## Project Structure


/project-name
  ├── /public
  ├── /app
  │   ├── /components
  │   ├── /api
  │   │   ├── /api(DB)
  │   │   └── /api(OpenAI)
  |   |   |__ /api(LinkeIn)
  │   ├── /styles
  │   ├── /utils
  │   └── /models
  ├── .env
  ├── .gitignore
  ├── next.config.js
  ├── package.json
  └── README.md

- /public: Static files.
- /src/components: Reusable UI components.
- /src/pages: Page components and API routes.
- /src/styles: CSS and styling files.
- /src/utils: Utility functions.
- /src/models: Database models.

## Endpoints
# API Endpoints

### GET /api/users

- Description: Fetches a list of users.
- Method: GET
- URL: /api/users
- Response:


[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
    "password": "########"
  },
  {
    "id": 2,
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "########"
  }
]

### POST /api/users

- Description: Creates a new user.
- Method: POST
- URL: /api/users
- Request Body:

{
  "name": "John Doe",
  "email": "john@example.com"
  "password": "#########"
}

- Response:

{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}

### GET /api/users/:id

- Description: Fetches a user by ID.
- Method: GET
- URL: /api/users/:id
- Response:


{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}

### PUT /api/users/:id

- Description: Updates a user by ID.
- Method: PUT
- URL: /api/users/:id
- Request Body:

{
  "name": "John Doe",
  "email": "john.doe@example.com"
}

- Response:

{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com"
}

### DELETE /api/users/:id

- Description: Deletes a user by ID.
- Method: DELETE
- URL: /api/users/:id
- Response:

{
  "message": "User deleted"
}

### Static Site Generation and SSR
## Static Site Generation (SSG)
# getStaticProps

- File: /src/pages/index.js
- Description: Fetches data at build time to generate the home page.
- Code:

export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

# getStaticPaths

- File: /src/pages/posts/[id].js
- Description: Generates paths for dynamic routes.
- Code:

export async function getStaticPaths() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.example.com/posts/${params.id}`);
  const post = await res.json();

  return {
    props: {
      post,
    },
  };
}

## Server-Side Rendering (SSR)
# getServerSideProps

- File: /src/pages/profile.js
- Description: Fetches user data on each request to generate the profile page.
- Code:

export async function getServerSideProps(context) {
  const res = await fetch('https://api.example.com/user', {
    headers: {
      'Authorization': `Bearer ${context.req.cookies.token}`,
    },
  });
  const user = await res.json();

  return {
    props: {
      user,
    },
  };
}

### Development Workflow

## Running the Development Server
1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies:

npm install
# or
yarn install

4. Start the development server:

npm run dev
# or
yarn dev
- Access the development server at http://localhost:3000.

## Building for Production

npm run build
# or
yarn build

## Starting the Production Server

npm start
# or
yarn start

## Deployment
Instructions for deploying the application. For example, deploying to Vercel:

Sign in to Vercel.
Link your GitHub repository.
Follow the steps provided by Vercel to deploy the project.
Environment Variables
List and explain the environment variables used in the project. Example:


NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=mongodb+srv://user:password@cluster.mongodb.net/database
SECRET_KEY=your_secret_key
Common Issues & Troubleshooting
Common Issues
**
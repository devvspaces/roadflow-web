# RoadflowAI Frontend

This is the frontend for RoadflowAI website, it curates curriculums and syllabus for tech roles and tools for new developers or experts to use. It allows progress tracking, curriculum reviews using MindsDB, and quizzes to verify that students understand the concept taught. RoadflowAI does not create new video or article resources but leverages on free contents on the internet. Sources for resources includes but not limited to Youtube, Hashnode, Medium, Coursera, and Udemy etc.

## Getting Started

You need to run the api first, as the frontend heavily depends on the api that provides more technical features like Signup, Login and more.

### Running the API

Visit [RoadflowAI API repository](https://github.com/devvspaces/roadflow-api) to set up the API. API is built in Django. Check the API for more information.

### Setup

Make sure you update the `.env.development` file to use the BASE URL of the API server.

### Usage

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## ⛏️ Built Using

- [NextJs](https://nextjs.org/docs) - React Framework
- [RoadflowAI API](https://github.com/devvspaces/roadflow-api) - RoadflowAI REST API
- [Chakra](https://chakra-ui.com/) - Frontend Design Library
- [Formik](https://formik.org/) - Building forms and validation

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

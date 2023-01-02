# Fullstack Pre-Screening Assignment

## Problem

Full stack task

Implement a simple single-page web application which manages a collection of books. Your web application should have a UI consisting of a single HTML web page, and a simple backend. The backend provides a REST API with which the UI communicates. We want the application to have the following features:

1. When the web page is loaded, it fetches all the books to a list. The title and the author of each book are displayed in the list.
   When a book in the list is clicked, it is selected and its author, title and description are displayed in a form next to the list.
2. By inputting data to the form and pressing a button labelled “save new”, the user can add new books to the collection.
3. By editing the form data of an existing book and pressing a button labelled “save”, the user can update the data of the book in the collection.
4. There is also a delete button that can be used to delete a selected book from the collection.
5. All the changes that user has made to the collection must be preserved on a page reload.
6. The application (front and backend) can be started with a single command in terminal

Illustration:
XXX

Use React for frontend. You can freely choose the technologies by which you are going to implement the backend.

Take into account:

- We will evaluate the quality of your code. Readability, good practices and maintainable solutions are therefore essential!
- Other factors that are being evaluated: error handling, usability, structure.
- Automated tests are not required, but good tests are regarded as a bonus.
- You can use an in-memory object as a database, but demonstrating a proper usage of an actual one is regarded as a bonus.
- Include only the essential files into your version control repository, and also a clear README how to start the application!

## Solution

Node express backend with React frontend.

### Project Setup

#### Frontend

https://create-react-app.dev/docs/getting-started/

`npx create-react-app --template=typescript client`

#### Backend

Followed https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/

Create Node project by

`npm init -y`

Add Express:
`npm i express`

Add Typescript:

```
npm i -D typescript
npm i -D @types/express @types/node
```

Create `tsconfig.json` with
`npx tsc --init`

Add `nodemon` for instant compilation of Typescript:
`npm i -D nodemon ts-node`

Add `server.ts`:

```
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
```

Modify `package.json` for start and compilation such that:

```
...,
  "scripts": {
    "build": "npx tsc",
    "start": "node dist/server.js",
    "start-dev": "npx nodemon --exec ts-node server.ts",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
...
```

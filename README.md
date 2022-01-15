# se-assignment

A simple todo app. Following functionalities are included,

- User authentication and authorization. Users can register with a username and a password and sign in (sample user - username: osusara, password: 123456).

- Get todos, add todos, update todos and their statuses and delete todos by athorized users.

## Tools and technologies used

- Frontend was developed using React JS (create-react-app) and Redux was used for state management.

- React Router was used for the routing in the frontend.

- Bootstrap was used for the styling purpose.

- Axios package was used to handle the API calls.

- Backend was developed using Node JS with Express framework.

- Authentication and authorization have done with JWT and Bcrypt were used for password encryption purposes.

- MongoDB Atlas was used as the database.

## Setup and run the project

- Install dependencies using `npm install` command in the project root directory and inside client directory.

- Configure the environment variables in the `.env` file (Sample values are included in the .env file. The added MongoDB is currently up and running). The environment variables are,

  - DB_URI - MongoDB cloud connection URI.
  - JWT_SECRET - A secret (String) for JWT authentication.

- Run the command `npm run dev` in the root directory. It will start the backend on port 5000 and the frontend on port 3000. concurrently in development mode.

- See the application on <http://localhost:3000>

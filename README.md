# Game Critics Web App

## Copying this work to your repository

1. With the cloning process, you can download a remote Git repository to your own computer. After cloning the remote repository, all changes will now be saved in the clone Git repository on our computer, until you write our changes back to the remote repository with the git push command.
2. Create a new repository on Github by clicking this link (https://github.com/new). It will navigate you to the creating new repository page.
3. Clone the repository that was just created by using the following command: `git clone https://github.com/ozlerege/game-critics-webapp.git`
4. After you clone the file into your repository, the cloned file can be attached to the repository you just created by executing the following command: `git remote set-url origin https://www.github.com/{github_username}/coding_project.git`
5. You can connect the local repo with the remote repo with the command. `git push origin main`. When you refresh your repository on GitHub, you can now see the files that are cloned into your repository on GitHub

## Required Installations

Create a config.js file to storing the API Keys and other sensitive information that is related to database.
Add following variable to your file.

```
var config = {
  API_KEY: "your RAWG API KEY",
  apiKey: "firebase api key",
  authDomain: "firebase auth domain",
  projectId: "firebase project id ",
  storageBucket: "firebase storage bucket",
  messagingSenderId: "firebase messaging Sender id",
  appId: "firebase app id",
};
export default config;

```

### Obtaining API KEY

The project uses the video game database api called "RAWG API" which can be obtained from following link. [RAWG API](https://rawg.io/apidocs)

### Firebase and Cloud Firestore

1.  To obtain a web app firestore, first go to [Firebase](https://firebase.google.com) and click 'Go to Console' tab.
2.  Click to "Add a Project" to create new project.
3.  Create a new web application and give it a name
4.  Add Firebase SDK to your config.js
5.  Also enable Email/Password auth in Authentication section.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

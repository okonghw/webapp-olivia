# webapp-olivia

### Project Setup Instructions

Switch into codeWebApp branch.

This web application is built using React, so the first step is to install React and its dependencies. To begin, ensure that you have **Node.js** and **npm** installed on your system. You can download Node.js from [https://nodejs.org/](https://nodejs.org/).

Install React with npm install react react-dom

#### 1. Install Dependencies
Once you have React installed, follow these steps:

1. Navigate to the project directory by running:
   ```
   cd nook-story
   ```

2. Install the required dependencies by running:
   ```
   npm install
   ```

This will download all the necessary libraries and dependencies for the application.

#### 2. Main Code Structure
The primary code for the application is located in the `nook-story` directory. Within this directory, there is a subdirectory called `src`, which contains the main source code files. The key files I coded are:

- **AppManager.js**: This file contains the central logic for managing the state of the application. It handles crucial tasks such as user session management, room navigation, and the initialization of settings. The file ensures that the app operates as expected by maintaining an organized flow of interactions.

- **Room.js**: This file is responsible for the functionality of the rooms within the application. It manages the layout and interactions within each room, and includes the logic for room configuration. It ensures that each room behaves according to the app's requirements and provides a seamless experience for the user.

- **index.css**: This stylesheet defines the global styles for the application, including layout specifications, color schemes, typography, and other visual elements.

#### 3. Running the Project Locally
To run the project locally, use the following command:

```
npm start
```

This will start the development server and launch the app in your default browser.

#### 4. Deploying to Firebase
To deploy the application to Firebase, follow these steps:

1. First, run the following command to create a production build of the app:

   ```
   npm run build
   ```

2. Once the build process completes, a `build` directory will be generated within the `nook-story` directory.

3. Copy all files from the `nook-story/build` directory into the `public` folder of the Firebase project. **Note**: The `public` folder is located outside the `nook-story` directory.

4. After copying the files, you can deploy your app to Firebase (firebase deploy).

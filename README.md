NOTE: Before cloning the repo, make sure to have the following installed/set up:

1. Visual Studio Code: https://code.visualstudio.com/
2. NodeJS: https://nodejs.org/en
3. Git CLI: https://docs.github.com/en/get-started/getting-started-with-git/set-up-git
4. MongoDB Account: https://www.mongodb.com/

If you run into any issues with the following steps, please feel free to reach out to Nimita Deshpande (nimitadesh) or Nirranjan Akilan (n2akilan458) on Discord to receive further assistance!

## 1. Cloning the repo locally

1. In the terminal/command prompt, navigate to the folder in which you want to clone the repo
2. Enter the following command to clone the repo:

```
  git clone https://github.com/nimitadesh/office-exercise-app
```

3. Open the project in VS Code
4. Open a new terminal tab in VS Code and type the following command to checkout the main branch

```
  git checkout main
```

## 2. Adding the .env file

1. Add a blank .env file under the server folder
2. Direct message either of us on Discord to get the .env credentials
3. Copy-paste these credentials into the blank .env file you created in step 1 (NOTE: You may need to request access to the MongoDB database for your username before running the backend. Please reach out to either of us on Discord to request access!)

## 3. Running the backend locally

1. Open a new terminal tab in VS Code and enter the following command to navigate to the server folder:

```
  cd server
```

2. Install all dependencies using the following command:

```
  npm i
```

3. In the same tab, enter the following command to start the backend:

```
  npm run dev
```

## 4. Running the frontend locally

1. Open a new terminal tab in VS Code and enter the following command to navigate to the client folder:

```
  cd client
```

2. Install all dependencies using the following command:

```
  npm i
```

3. In the same tab, enter the following command to start the backend:

```
  npm start
```

## 5. Viewing the application in the browser

Once the backend and frontend are up and running, navigate to http://localhost:3000/ in your browser to view the application.

# Components

The folder structure is wrapping each component in a folder to create isolated components dependant on file structure.

## `app`

The `app` folder contains the `App.js` component (the state management component of the application). Most of the model state is stored here for

## `index.js`

Most component folders have an `index.js` file. By convention, this file describes the intended export from the folder. Other files in the folder support the main component.

If no `index.js` file is included, then any of the files should be used.

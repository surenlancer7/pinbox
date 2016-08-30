# pinbox

Installing

$ npm install -g ionic

Adding a platform target

$ ionic platform ios android

Testing in a Browser

Use ionic serve to start a local development server for app dev and testing. This is useful for both desktop browser testing, and to test within a device browser which is connected to the same network. Additionally, this command starts LiveReload which is used to monitor changes in the file system. As soon as you save a file the browser is refreshed automatically. View Using Sass if you would also like to have ionic serve watch the project's Sass files.

$ ionic serve [options]
Building your app

$ ionic build ios

Running your app

Deploys the Ionic app on specified platform devices. If a device is not found it'll then deploy to an emulator/simulator.

$ ionic run ios
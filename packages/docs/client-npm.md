# This page is deprecated, waiting on a better solution

<h1>Using client-side modules from NPM with Browserify</h1>

Many useful React components and React-related modules are available on NPM, and can be bundled for the client with the popular Browserify tool. Meteor currently doesn't have first-party support for using these modules, but there are some community-maintained packages that work great!

## meteorhacks:npm and cosmos:browserify

- `meteorhacks:npm` for loading NPM modules into your app: [GitHub page](https://github.com/meteorhacks/npm), [Atmosphere page](https://atmospherejs.com/meteorhacks/npm)
- `cosmos:browserify` for bundling NPM modules for the client using Browserify: [GitHub page](https://github.com/elidoran/cosmos-browserify/), [Atmosphere page](https://atmospherejs.com/cosmos/browserify)

You can use these Meteor packages together to load client-side NPM modules. Here's how:

### 1. Add the relevant Meteor packages

```sh
meteor add meteorhacks:npm cosmos:browserify
```

### 2. Add the npm modules you want to packages.json

After you have added the packages, run your app once to let some initial setup happen. Then, you should have a file called `packages.json` in the root of your app. Put any NPM packages you would like to load here. We'll use `react-router` as an example:

```js
{
  "react-router": "0.13.3"
}
```

### 3. Add the appropriate require statements to app.browserify.js

Currently, Meteor doesn't support using `require` to load modules, so we will use a special file supported by `cosmos:browserify` to enable this. In your app, create a file called `app.browserify.js`. Inside it, you can require any of the NPM modules you loaded, and export them as "app-scope" variables, meaning they will be accessible in every JavaScript file in your app. For example, for `react-router` you might do:

```js
// In lib/app.browserify.js
ReactRouter = require("react-router");
```

Now, you can use React Router anywhere! You can use the same method to load any React component modules you find on [react-components.com](http://react-components.com/).

### Module load order

The NPM modules you require are loaded based on where your `app.browserify.js` file is located. This is why we recommend putting it in `lib/`, a special directory for files that need to be loaded before the rest of your app code. Read more about file load order in the [Meteor docs](http://docs.meteor.com/#/full/fileloadorder).

### Future improvements

This method of loading client-side NPM code works, but is not ideal in the long term. Some caveats:

- Your app can take a long time to build because browserify runs every time
- Source maps aren't handled correctly, so your browser might not be very helpful if there is a stack trace from deep inside some NPM module
- Dealing with file load order is not as good as just being able to use `require` directly in your app to request modules

We're aware of these issues and are working on fixing them as soon as possible.

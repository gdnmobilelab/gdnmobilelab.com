# Guardian Mobile Innovation Lab Landing Page
A landing page for people wanting to know more about the Guardian's mobile innovation lab.

## Installation
If you don't have it install `Gulp` globally using the following command

```
npm install --global gulp-cli
```

Once that's complete get local dependencies with the following command

```
npm install
```

## Development
To make changes run the following command to start watch and local server tasks

```
gulp dev
```

Once running, you are now free to make changes to files inside the `src` folder. In here you'll find a `.mustache` template that serves as the basis for the `html`. The data for which is provided in `data.json`. For changes to the style you'll find a series of `sass` partials inside the `sass` folder.

Changes to any of these files (or adding any assets to the `assets` folder) will be watched and the site will rebuild with your changes. The resulting site will be placed inside the `dist` folder.

## Todo

* Add `gulp deploy` task to build the site and upload the `dist` folder to our `s3 bucket`

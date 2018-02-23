# PostCSS Config

This PostCSS configuration file can help you turn CSS custom properties (a.k.a. CSS variables) into static values for browsers which don’t support them.

**Please note that not all variables can be interpolated to a static value**, especially those related to user settings.

## Install

You’ll need [Node.js](https://nodejs.org/en/) to get npm if this is not already the case.

Then install `postcss-cli`:

```
npm i -g postcss-cli --save-dev
```

You’ll also need to install some plugins:

```
npm install postcss-css-variables postcss-alter-property-value postcss-sorting stylelint --save-dev
```

## Process

To process a stylesheet, first add the `postcss.config.js` file into the `src` folder.

Then use the following command-prompt: 

```
postcss /path/to/src/ReadiumCSS-stylesheet.css -o ~/path/to/dist/ReadiumCSS-stylesheet.css
```

PostCSS will: 

1. interpolate CSS variables into a static representation, while preserving variables for future-proofing (`"preserve": true`);
2. remove static representations which can’t be interpolated and are `undefined` (`postcss-alter-property-value`);
3. order properties according to [RECESS](https://gist.github.com/joshuapekera/4582549);
4. report (and autofix when possible) stylelint errors.

## Docs

- https://github.com/postcss/postcss-cli
- https://github.com/MadLittleMods/postcss-css-variables
- https://github.com/kunukn/postcss-alter-property-value
- https://github.com/hudochenkov/postcss-sorting
- https://github.com/stylelint/stylelint/blob/master/docs/user-guide/postcss-plugin.md

## Notes

You can concatenate stylesheets using [`postcss-import`](https://github.com/postcss/postcss-import) if needed. 

In order to do so, add the following at the top of `postcss.config.js`, in `plugins`:

```
require('postcss-import')({
  root: ctx.file.dirname
}),
```

Then create placeholder stylesheet in which you import the `src` ones. For instance: 

```
/* ReadiumCSS-foundation.css */

@import "ReadiumCSS-base.css";
@import "ReadiumCSS-html5patch.css";
@import "ReadiumCSS-safeguards.css";
```

Process the file: 

```
postcss /path/to/src/ReadiumCSS-foundation.css -o ~/path/to/dist/ReadiumCSS-foundation.css
```

And you’ll get a stylesheet out of the 3 imported.
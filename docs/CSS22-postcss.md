# PostCSS

[Implementers’ doc]

PostCSS is a tool for transforming CSS with JavaScript. It comes with a vast amount of task-oriented plugins and allows authors to use modern specs which are not implemented yet.

- [PostCSS official website](http://postcss.org)
- [PostCSS tutorial](https://webdesign.tutsplus.com/tutorials/using-postcss-for-cross-browser-compatibility--cms-24567)
- [PostCSS plugins list](https://www.postcss.parts)

## Dev Dependencies

ReadiumCSS is relying on a PostCSS config to build `dist` stylesheets. If you `npm install` the repository, all those dependencies will be installed as well.

Here is the current list of dependencies: 

- stylelint ([link](https://stylelint.io/user-guide/postcss-plugin/));
- postcss-cli ([link](https://github.com/postcss/postcss-cli));
- postcss-import ([link](https://github.com/postcss/postcss-import));
- postcss-sorting ([link](https://github.com/hudochenkov/postcss-sorting));
- postcss-custom-media ([link](https://github.com/postcss/postcss-custom-media));
- postcss-custom-selectors ([link](https://github.com/postcss/postcss-custom-selectors));
- postcss-discard-comments ([link](https://github.com/ben-eb/postcss-discard-comments));
- postcss-css-variables ([link](https://github.com/MadLittleMods/postcss-css-variables)) [disabled];
- postcss-alter-property-value ([link](https://github.com/kunukn/postcss-alter-property-value)) [disabled].

## Build dist stylesheets

If you customize `ReadiumCSS-config.css`, you will have to rebuild stylesheets.

**Note:** the current build process is subpar – to say the least. Please feel free to improve it (gulp, grunt, etc.).

### Available scripts

By default, the following scripts are available: 

- `build`, will build all stylesheets;
- `build:ltr`, will build default stylesheets (Left to Right scripts);
- `build:rtl`, will build stylesheets for Right to Left scripts;
- `build:cjk`, will build stylesheets for Chinese, Japanese, and Korean in horizontal writing mode; 
- `build:vertical`, will build stylesheets for Chinese, Japanese, Korean, and Mongolian in vertical writing mode.

### Usage

First navigate to the `readium-css` folder, then…

```
npm run-script build
```

### Building dist stylesheets for browsers which don’t support CSS variables

If you need to build stylesheets for IE11 or an early version of Edge (e.g. 14), then you can use most of ReadiumCSS, excepted user settings. You’ll consequently have to customize the `src`’s `ReadiumCSS-before.css`, `ReadiumCSS-default.css` and `ReadiumCSS-after.css` and remove the user settings submodules.

Then you will have to enable the `postcss-css-variables` and `postcss-alter-property-value` in the `postcss.config.js` file to be found at the `src` folder’s root.

The following must be added to `plugins`: 

```
require("postcss-css-variables")({
  "preserve": true
}),
require("postcss-alter-property-value")({
  declarations: {
    "*": {
      task: "remove"
    , whenValueEquals: "undefined"
    }
  }
})
```

This will:

1. interpolate CSS variables into a static representation, while preserving variables for other browsers (`"preserve": true`);
2. remove static representations which can’t be interpolated and are `undefined` (`remove` task).

## Useful plugins

Here is a list of additionnal PostCSS plugins which might prove useful to implementers.

- Unprefix EPUB properties: [EPUB interceptor](https://github.com/JayPanoz/postcss-epub-interceptor)
- Adding vendor prefixes: [Autoprefixer](https://github.com/postcss/autoprefixer)
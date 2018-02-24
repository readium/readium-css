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
- postcss-css-variables ([link](https://github.com/MadLittleMods/postcss-css-variables)) [disabled];
- postcss-discard-comments ([link](https://github.com/ben-eb/postcss-discard-comments)).

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

## Useful plugins

Here is a list of additionnal PostCSS plugins which might prove useful to implementers.

- Use latest CSS syntax: [CSS Next](https://github.com/MoOx/postcss-cssnext)
- Unprefix EPUB properties: [EPUB interceptor](https://github.com/JayPanoz/postcss-epub-interceptor)
- Adding vendor prefixes: [Autoprefixer](https://github.com/postcss/autoprefixer)
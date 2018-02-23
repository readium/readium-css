# PostCSS Config

[Proto] [iOS Implem] [WIP]

## Install

```
npm i -g postcss-cli --save-dev
npm install stylelint --save-dev
npm install postcss-import --save-dev
npm install postcss-sorting --save-dev
```

## Process

```
postcss /path/to/src/ReadiumCSS-before.css -o ~/path/to/dist/ReadiumCSS-before.css
postcss /path/to/src/ReadiumCSS-default.css -o ~/path/to/dist/ReadiumCSS-default.css
postcss /path/to/src/ReadiumCSS-after.css -o ~/path/to/dist/ReadiumCSS-after.css
```

## Docs

- https://github.com/postcss/postcss-cli
- https://github.com/stylelint/stylelint/blob/master/docs/user-guide/postcss-plugin.md
- https://github.com/stylelint/stylelint/blob/master/docs/user-guide/rules.md
- https://github.com/stylelint/stylelint/blob/master/docs/user-guide/configuration.md 
- https://github.com/postcss/postcss-import
- https://github.com/hudochenkov/postcss-sorting

## Notes

- Stylelint rules will be fine-tuned ASAP.
- Order of properties is [RECESS](https://gist.github.com/joshuapekera/4582549), with adjustments for epub styles.
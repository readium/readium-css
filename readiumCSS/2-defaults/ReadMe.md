# Defaults

Defaults is currently made of 4 stylesheets:

- 1 base stylesheet for all ebooks;
- 1 default stylesheet for unstyled ebooks;
- 1 stylesheet for user highlights and media overlays.

Only the base stylesheet can be automatically added to HTML files.

## Base

The base stylesheet deals with: 

1. default colors (text and background)
2. default font-family depending on the language.

Those values are obviously customizable.

It should be appended before any author’s stylesheet.

## Default

The default stylesheet was designed for unstyled ebooks. It is based on HTML5 Suggested Rendering and can be customized. 

Although it should not be used for styled ebooks, it should not impact the author’s styles if it is added before its stylesheet(s).

You can customize: 

- the typeface for headings (body is in `base.css`);
- the typeface for code;
- the font-size for body copy;
- the base line-height for all elements;
- the vertical margins for block elements;
- the vertical margins for paragraphs;
- the text-indent for paragraphs;
- the typescale;
- the color for links (including visited);
- a primary accent color (unused by default);
- a secondary accent color (unused by default).

It makes use of a typescale so that you can change it dynamically (depending on page size, font size, etc.) so that headings and other elements can be adjusted.

**Maybe it can also be a user setting?**

## User highlights and media overlays

You’ll find classic highlighters’ colors in there:

- yellow;
- green;
- orange;
- pink.

There’s no blue since it is too close to the default `::selection`.

Values are declared in `rgba` so that those colors don’t have to be redefined in night modes.

At first sight, contrast is OK for those colors in default and night mode, but it will obviously depend on the `background-color` and `color` values you’re using for themes.
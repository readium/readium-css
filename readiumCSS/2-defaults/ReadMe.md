# Defaults

Defaults is currently made of 4 stylesheets:

- 1 base stylesheet for all ebooks;
- 1 default stylesheet for unstyled ebooks;
- 2 preset themes for night and sepia modes.

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

## Preset Themes

Sepia and night modes are currently two different stylesheets. They must be added after author’s stylesheets.

However, this is likely to change in the future so that we can deal with those as mere user settings, it will depend on how we manage those (custom attributes or inline CSS variables).

To put it simply, those 2 themes are prototypes to see what works and what doesn’t. We’ll redesign and refine them as we go along.

Night mode overrides anything related to color: 

- `background-color`;
- `color`;
- `border-color`;
- `fill` (svg text);
- `stroke` (svg text);
- `invert()` filter for gaiji.

Please note authors may use `background-image` and `-webkit-text-fill-color` to force their own colors.
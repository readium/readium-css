# Defaults

Defaults is currently made of 4 stylesheets:

- 1 base stylesheet for all ebooks;
- 1 default stylesheet for unstyled ebooks;
- 1 stylesheet for user highlights and media overlays;
- 1 stylesheet to deal with the OS’ a11y modes.

**Note:** The default stylesheet should not be appended if there are author styles in the EPUB file.

## Base

The base stylesheet deals with: 

1. default colors (text and background)
2. default font-family depending on the language.

Those values are obviously customizable.

It should be appended before any author’s stylesheet.

### Variables you can set

#### Default font-stacks

```
--RS__oldStyleTf
```

An old style serif font-stack relying on pre-installed fonts.

Default is `"Iowan Old Style", "Sitka Text", Palatino, "Book Antiqua", serif`.

```
--RS__modernTf
```

A modern serif font-stack relying on pre-installed fonts.

Default is `Athelas, Constantia, Georgia, serif`.

```
--RS__sansTf
```

A neutral sans-serif font-stack relying on pre-installed fonts.

Default is `-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`.

```
--RS__humanistTf 
```

A humanist sans-serif font-stack relying on pre-installed fonts.

Default is `Seravek, Calibri, Roboto, Arial, sans-serif`.

```
--RS__monospaceTf 
```

A monospace font-stack relying on pre-installed fonts.

Default is `"Andale Mono", Consolas, monospace`.

#### Absolute defaults for all ebooks

```
--RS__baseFontFamily
```

The default typeface for body copy in case the ebook doesn’t have one declared.

Please note some languages have a specific font-stack (japanese, chinese, hindi, etc.)

```
--RS__textColor
```

The default `color` for body copy’s text.

```
--RS__backgroundColor
```

The default `background-color` for pages.

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

### Variables you can set

#### Typefaces 

```
--RS__compFontFamily
```

The typeface for headings. The value can be another variable e.g. `var(-RS__humanistTf)`.

```
--RS__codeFontFamily
```

The typeface for code snippets. The value can be another variable e.g. `var(-RS__monospaceTf)`.

#### Typography

```
--RS__typeScale
```

The scale to be used for computing all elements’ `font-size`. Since those font sizes are computed dynamically, you can set a smaller type scale when the user sets one of the largest font sizes.

Possible values: `1` | `1.067` | `1.125` | `1.2` (suggested default) | `1.25` | `1.333` | `1.414` | `1.5` | `1.618`

```
--RS__baseFontSize
```

The default `font-size` for body copy. It will serve as a reference font all related computations.

```
--RS__baseLineHeight
```

The default `line-height` for all elements.

#### Vertical rhythm

```
--RS__flowSpacing
```

The default vertical margins for HTML5 flow content e.g. `pre`, `figure`, `blockquote`, etc.

```
--RS__paraSpacing
```

The default vertical margins for paragraphs.

```
--RS__paraIndent
```

The default `text-indent` for paragraphs.

#### Hyperlinks

``` 
--RS__linkColor
```

The default `color` for hyperlinks.

```
--RS__visitedColor
```

The default `color` for visited hyperlinks.

#### Accentuation colors

```
--RS__primaryColor
```

An optional primary accentuation `color` you could use for headings or any other element of your choice.

```
--RS__secondaryColor
```

An optional secondary accentuation `color` you could use for any element of your choice.

## User highlights and media overlays

### Highlights

You can use classic [insert famous highlighters’ brand] colors in all their neon glory:

- yellow;
- green;
- orange;
- pink.

There’s no blue since it is too close to the default `::selection`.

Ideally, you should offer users the possibility to switch colors when highlighting as they might use a color pattern to manage different types of highlights/notes.

There’s a class syntax you can use to differentiate highlights: `.readiumCSS-{color}-highlight` e.g. `.readiumCSS-yellow-highlight` or `.readiumCSS-pink-highlight`.

Values are declared in `rgba` so that those colors don’t have to be redefined in night modes.

At first sight, contrast is OK for those colors in default and night mode, but it will obviously depend on the `background-color` and `color` values you’re using for themes.

### Media Overlays

We’re using the same one as Readium 1 for interop reasons.

```
.readiumCSS-mo-active-default {
  background-color: yellow !important;
  color: black !important;
}
```

It has been prefixed with `readiumCSS-` but you can get rid of it if needed.

### OS’ a11y modes

This stylesheet is intended to deal with a11y settings users can set at the OS level, whenever possible: 

- high-contrast mode;
- monochrome;
- reduced motion.

For `monochrome`, we’ll have to adjust reading modes (night, sepia, etc.) in their specific stylesheet; we’ll see if we can at least manage some more global settings in there.
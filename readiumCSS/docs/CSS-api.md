# Readium CSS Variables API

[Implementers’ doc] [WIP]

As a reminder, the priority is: 

```
USER > THEME > RS
```

## Reading System Styles

Custom properties for the Reading System are prefixed with `--RS__`.

### Pagination

```
--RS__colWidth
```

The optimal column’s width. It serves as a floor in our design.

```
--RS__colCount
```

The optimal number of columns (depending on the columns’ width).

```
--RS__colGap
```

The gap between columns. It must be set in pixels so that it won’t resize with font size. 

You must account for this gap when scrolling.

```    
--RS__pageGutter
```

The horizontal page margins. It must be set in pixels so that it won’t resize with font size.

```
--RS__maxLineLength
```

The optimal line-length. It must be set in `rem` in order to take `:root`’s `font-size` as a reference, whichever the `body`’s `font-size` might be.

### Safeguards

```
--RS__maxMediaWidth
```

The `max-width` for media elements i.e. `img`, `svg`, `audio` and `video`.

```
--RS__maxMediaHeight
```

The `max-height` for media elements i.e. `img`, `svg`, `audio` and `video`.

```
--RS__boxSizingMedia
```

The box model (`box-sizing`) you want to use for media elements.

```
--RS__boxSizingTable
```

The box model (`box-sizing`) you want to use for tables.

### Default font-stacks

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

### Base styles for all ebooks

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

### Default styles for unstyled publications

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

## Reading Modes

Custom properties for reading modes are prefixed with `--THEME__`.

```
--THEME__backgroundColor
```

The `background-color` for the screen in the reading mode.

```
--THEME__textColor
```

The `color` for text in the reading mode.

```
--THEME__linkColor
```

The `color` for the links in the reading mode.

```  
--THEME__visitedColor
```

The `color` for visited links in the reading mode.

## User Settings

Custom properties for user settings are prefixed with `--USER__`.

```
--USER__colNumber
```

The number of columns (`column-count`) the user wants displayed (one-page view or two-page spread)

Scope: `html`

```
--USER__pageMargins
```

Horizontal margins (`padding-left` and `padding-right`) the user wants to set.

Scope: `html`

It impacts `body`.

```
--USER__backgroundColor
```

The `background-color` for the whole screen.

Scope: `html` 

It impacts all elements in the DOM.

```
--USER__textColor
```

The `color` for textual contents.

Scope: `html`

It impacts all elements but headings and `pre` in the DOM.

```
--USER__textAlign
```

The alignment (`text-align`) the user prefers.

Scope: `html`

It impacts `body`, `li`, and `p` which are not children of `blockquote` and `figcaption`.

```
--USER__bodyHyphens
```

Enabling and disabling hyphenation.

Scope: `html`

It impacts `body`, `p`, `li`, `div` and `dd`.

```
--USER__fontFamily
```

The typeface (`font-family`) the user wants to read with.

Scope: `html`

It impacts `body`, `p`, `li`, `div`, `dt`, `dd` and phrasing elements which don’t have a `lang` or `xml:lang` attribute.

```
--USER__fontSize
```

Increasing and decreasing the root `font-size`. It will serve as a reference for the cascade.

Scope: `html`

```
--USER__typeScale
```

The type scale the user wants to use for the publication.

Scope: `html`

It requires the `ReadiumCSS-fs_normalize.css` stylesheet.

It impacts headings, `p`, `li`, `div`, `pre`, `dd`, `small`, `sub`, and `sup`.

```
--USER__lineHeight
```

Increasing and decreasing leading (`line-height`).

Scope: `html`

It impacts `body`, `p`, `li` and `div`

```
--USER__paraSpacing
```

The vertical margins (`margin-top` and `margin-bottom`) for paragraphs.

Scope: `p`

```
--USER__paraIndent
```

The `text-indent` for paragraphs.

Scope: `p`

```
--USER__wordSpacing
```

Increasing space between words (`word-spacing`, related to a11y).

Scope: `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `p`, `li`, `div`

```
--USER__letterSpacing
```

Increasing space between letters (`letter-spacing`, related to a11y).

Scope: `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `p`, `li`, `div`

```
--USER__darkenImages
```

A filter to darken mages in night mode. It behaves as a switch i.e. if it is present, the filter is enabled.

Scope: `html`

It impacts all `img` elements in the DOM.

```
--USER__invertImages
```

A filter to invert images in night mode. It behaves as a switch i.e. if it is present, the filter is enabled.

Scope: `html`

It impacts all `img` elements in the DOM.

## How to set and remove user preferences

### Setting a user preference

```
var root = document.documentElement; 

root.style.setProperty("--USER__var", "value");
```

You don’t need to remove the variable before setting another value, the new value will simply override the existing one.

#### Removing a user preference

```
var root = document.documentElement; 

root.style.removeProperty("--USER__var");
```
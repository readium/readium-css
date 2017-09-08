# User Settings, Reading modes and Themes

[Implementers’ doc] [Authors’ info] [WIP]

Currently, user settings and reading modes are different stylesheets.

The idea is:

1. appending/removing reading modes’ stylesheet as they imply their own specific styles;
2. managing user settings entirely via CSS so that we don’t need to manipulate the DOM too much.

There are alternatives approaches we can adopt if this one doesn’t fit.

## Mechanism for user settings

The `ReadiumCSS-user_settings.css` stylesheet can be appended before runtime, its declarations won’t be applied until user variables are set. 

This stylesheet is a one-two punch: 

1. add the variable and its value to `html`;
2. styles are updated live.

The selectors used in this stylesheet are indeed “conditional”, styles are applied if the variable (or a specific value for reading modes) is set as an inline style in `html` (`:root`).

In theory, we can make it work with inline styles too, when variables are not supported by the web browser.

### Setting and removing a variable

#### Setting

```
var root = document.documentElement; 

root.style.setProperty("name of var", "value");
```

You don’t need to remove the variable before setting another value, the new value will simply override the existing one.

#### Removing

```
var root = document.documentElement; 

root.style.removeProperty("name of var");
```

### Caveat

Attribute selectors don’t scale particularly well. We’ll have to pay attention to performance, especially on mobile.

## List of variables 

### Layout 

The user can set the number of columns and page margins.

#### Number of columns

```
--USER__colNumber
```

Possible values: `1` | `2` | `auto`

By default, this setting behaves as an `auto` value, it will switch to 1 or 2 columns depending on the minimum `width` available and `font-size`.

It is up to implementers to decide whether they want this setting to be available and override any configuration or only some (e.g. setting only available in landscape and/or larger screens).

**Warning:** it is currently disabled for tablet in portrait orientation.

#### Page margins

```
--USER__pageMargins
```

Possible values: `0.5` | `0.75` | `1` | `1.25` | `1.5` | `1.75` | `2`

The user margins are a factor of the reference we set. 

This will probably be fine-tuned in the next version (beta).

### Themes (background and text colors)

The user can set a `background-color` and `color`. 

The following two variables must be used together.

```
--USER__backgroundColor
--USER__textColor
```

Possible values: Color HEX (e.g. #FFFFFF)

### Hyphenation and justification

The user can set `text-align` and `hyphens` for body copy contents.

#### Text align

```
--USER__textAlign
```

Possible values: `left` (LTR) or `right` (RTL) | `justify`

#### Hyphens

```
--USER__bodyHyphens
```

Possible Values: `auto` | `none`

### Typography

The user can set `font-family`, `font-size` and `line-height` for body copy contents.

#### Font family

```
--USER__fontFamily
```

Possible values: `var(--RS__oldStyleTf)` | `var(--RS__modernTf)` | `var(--RS__sansTf)` | `var(--RS__humanistTf)`

#### Font size and type scale

We have to normalize `font-size` for body copy elements so that it can work in pure CSS, which means the two following variables must be used together.

In order to do so, the `ReadiumCSS-fs_normalize.css` stylesheet must be appended to the document.

Although it might be an issue to authors at first sight, this approach is backed by actual data.

```
--USER__fontSize
--USER__typeScale
```

Possible values for font-size: `75%` | `87.5%` | `100%` | `112.5%` | `137.5%` | `150%` | `162.5%` | `175%` | `200%` | `225%` | `250%`

Possible values for type scale: `1` | `1.067` | `1.125` | `1.2` (suggested default) | `1.25` | `1.333` | `1.414` | `1.5` | `1.618`

You can use different type scale values depending on the `font-size`. For instance, if the user sets a large one, you might want to decrease the type scale so that headings are not super large.

If you want to go back to the publisher’s default, the normalize stylesheet and `--USER__fontSize` property must be removed.

#### Line height

```
--USER__lineHeight
```

Possible values: `1` | `1.125` | `1.25` | `1.35` | `1.5` | `1.65` | `1.75` | `2`

### Paragraphs’ formatting

The user can set `margin-top`, `margin-bottom` and `text-indent` for paragraphs. 

#### Paragraphs’ spacing

```
--USER__paraSpacing
```

Possible values: `0` | `0.375rem` | `0.75rem` | `1rem` | `1.125rem` | `1.25rem` | `1.35rem` | `1.5rem` | `1.65rem` | `1.75rem` | `2rem`

#### Paragraphs’ indent

```
--USER__paraIndent
```

Possible values: `0` | `0.5rem` | `1rem` | `1.25rem` | `1.5rem` | `2rem` | `2.5rem` | `3rem`

### Characters’ spacing

The user can set `word-spacing` and `letter-spacing` for headings and body copy contents.

#### Word spacing

```
--USER__wordSpacing
```

Possible values: `0.125rem` | `0.25rem` | `0.375rem` | `0.5rem`

#### Letter spacing

```
--USER__letterSpacing
```

Possible values: `0.0675rem` | `0.125rem` | `0.1875rem` | `0.25rem`

## Reading Modes

We currently have two reading modes for night and sepia.

Those are stylesheets you can add/remove in the document.

Please note night mode provides two extra specific variables: 

```
--USER__darkenImages
```

This variable allows the user to darken images à little bit.

Any value can be set, the property itself is the signal.

```
--USER__invertImages
```

This variable allows the user to invert images.

Any value can be set, the property itself is the signal.

## Themes

In this model, themes are just a set of user variables with specific values.

It becomes even easier to override them for the user as the values are already user settings.

In other words, think of preset and custom themes as a set of variables, which makes it easier to create, manipulate and cache them.

## Alternative options

- appending/removing overrides as `<style>`, dynamically
- using custom attributes (at least for themes + appending/removing styles dynamically)
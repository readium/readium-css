# User Settings

Currently, this is a monolithic stylesheet. Smaller modules will probably be designed to improve maintenance.

The idea is to manage user settings entirely via CSS so that we don’t need to manipulate the DOM too much, but there are alternatives approaches we can adopt if this one doesn’t fit.

## Mechanism

The stylesheet can be appended before runtime, its declarations won’t be applied until user variables are set. 

This stylesheet is a one-two punch: 

1. add the variable and its value to `html`;
2. styles are updated live.

The selectors used in `ReadiumCSS-user_settings` are indeed “conditional”, styles are applied if the variable (or a specific value for reading modes) is set as an inline style in `html` (`:root`).

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

### Caveats

- Attribute selectors don’t scale particularly well. We’ll have to pay attention to performance, especially on mobile.
- Some reading modes’ styles are tied to super specific color HEX values, which might become an issue when it comes to maintenance.

## List of variables 

### Layout 

The user can set the number of columns and page margins.

#### Number of columns

```
--USER__colNumber
```

Possible values: `1` | `2`

#### Page margins

```
--USER__pageMargins
```

Possible values: TBD

### Themes (background and text colors)

The user can set a `background-color` and `color`. 

The following two variables must be used together.

```
--USER__backgroundColor
--USER__textColor
```

Possible values: Color HEX (e.g. #FFFFFF)

#### Night mode

The following values are preset. If they’re changed, the stylesheet must be updated.

```
--USER__backgroundColor: #000000
--USER__textColor: #FEFEFE
```

#### Sepia mode

The following values are preset. If they’re changed, the stylesheet must be updated.

```
--USER__backgroundColor: #faf4e8
--USER__textColor: #121212
```

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

Although it might be an issue to authors at first sight, this approach is backed by actual data.

```
--USER__fontSize
--USER__typeScale
```

Possible values for font-size: `75%` | `87.5%` | `112.5%` | `137.5%` | `150%` | `162.5%` | `175%` | `200%` | `225%` | `250%`

Possible values for type scale: `1.067` | `1.125` | `1.2` (suggested default) | `1.25` | `1.333` | `1.414` | `1.5` | `1.618`

If the user picks `100%`, the two variables must be unset.

You can use different type scale values depending on the `font-size`. For instance, if the user sets a large one, you might want to decrease the type scale so that headings are not super large.

#### Line height

```
--USER__lineHeight
```

Possible values: TBD

### Paragraphs’ formatting

The user can set `margin-top`, `margin-bottom` and `text-indent` for paragraphs. 

#### Paragraphs’ spacing

```
--USER__paraSpacing
```

Possible values: `0` | `0.375rem` | `0.75rem` | `1.2rem` | `1.5rem` | `1.65rem` | `1.75rem` | `2rem`

#### Paragraphs’ indent

```
--USER__paraIndent
```

Possible values: `0.5rem` | `1rem` | `1.25rem` | `1.5rem` | `2rem` | `2.5rem` | `3rem`

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

Possible values: `0.0675rem` | `0.125rem` | `0.1875rem`

## Alternative options

- appending/removing stylesheets dynamically (may force a recalc though)
- using custom attributes (at least for themes + appending/removing styles dynamically)
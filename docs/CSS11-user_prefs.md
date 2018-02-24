# User Settings, Reading Modes and Themes

[Implementers’ doc] [Authors’ info]

The idea is:

1. appending/removing flags and CSS variables for user settings (inline style on `html`);
2. managing user settings entirely via CSS so that we don’t need to manipulate the DOM too much.

There are alternatives approaches you can adopt if this one doesn’t fit.

**Note:** Possible values are strict i.e. implementers can’t use any other value; recommended values are loose i.e. they are left to implementers’ judgment.

## Mechanism for user settings

The `ReadiumCSS-after.css` stylesheet, which contains user settings, can be appended before runtime; its declarations won’t be applied until user variables are set. 

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

## Flags

Some variables behave like flags. You could also use custom `data-*` attributes or CSS classes to manage the following ones. See the [“Quickstart” doc](../docs/CSS02-quickstart.md) for customization.

### User view

Allows to switch between paged and scroll view.

```
--USER__view
```

Possible values: `readium-paged-on` | `readium-scroll-on`

### Font Family override

Acts as an explicit switch to override the publisher’s `font-family`.

It must be set if the user changes `font-family`.

```
--USER__fontOverride
```

Possible values: `readium-font-on` | `readium-font-off`

### Advanced Settings

Acts as an explicit switch to override the publisher’s styles.

It must be set if the user changes `font-family` or `font-size`.

If you provide users with a “Publisher’s styles” toggle, it must be appended and removed accordingly.

```
--USER__advancedSettings
``` 

Possible values: `readium-advanced-on` | `readium-advanced-off`

### Reading Modes

We currently have two reading modes for night and sepia.

```
--USER__appearance
```

Possible values: `readium-day-on` | `readium-sepia-on` | `readium-night-on`

### Filters

Please note night mode provides two extra specific variables: 

```
--USER__darkenFilter
```

Possible values: `readium-darken-on` | `readium-darken-off`

```
--USER__invertFilter
```

Possible values: `readium-invert-on` | `readium-invert-off`

### Accessibility Normalization

Users may want to normalize text (no bold, no italics, etc.) for accessibility reasons, using a non a11y-specific typeface.

```
--USER__a11yNormalize
```

Possible values: `readium-a11y-on` | `readium-a11y-off`

## List of variables 

### Layout 

The user can set the number of columns and page margins.

#### Number of columns

```
--USER__colCount
```

Possible values: `1` | `2` | `auto` (default)

By default, this setting behaves as an `auto` value, it will switch to 1 or 2 columns depending on the minimum `width` available and `font-size`.

It is up to implementers to decide whether they want this setting to be available and override any configuration or only some (e.g. setting only available in landscape and/or larger screens).

**Warning:** it is currently disabled for tablet in portrait orientation.

#### Page margins

```
--USER__pageMargins
```

Recommended values: a range from `0.5` to `2`.  Increments are left to implementers’ judgment.

The user margins are a factor of the reference we set. 

This will probably be fine-tuned in the next version (beta).

### Themes (background and text colors)

The user can set a `background-color` and `color`. 

The following two variables must be used together.

```
--USER__backgroundColor
--USER__textColor
```

Possible values: Color HEX (e.g. `#FFFFFF`), `rgb(a)`, `hsl`.

### Hyphenation and justification

The user can set `text-align` and `hyphens` for body copy contents.

#### Text align

```
--USER__textAlign
```

Possible values: `left` (LTR) or `right` (RTL) | `justify`

Note: the value `start` can be used to let all rendering engines, excepted Trident (IE11) and EdgeHTML (Edge), automatically deal with `left` and `right` based on the direction (`dir` attribute) set for the document and its nested elements.

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

Possible values: `var(--RS__oldStyleTf)` | `var(--RS__modernTf)` | `var(--RS__sansTf)` | `var(--RS__humanistTf)` | `<string>`

For Japanese, possible values become: `var(--RS__serif-ja)` (horizontal writing) | `var(--RS__sans-serif-ja)` (horizontal writing) | `var(--RS__serif-ja-v)` (vertical writing) | `var(--RS__sans-serif-ja-v)` (vertical writing) | `<string>`

#### Font size

We have to normalize `font-size` for body copy elements so that it can work in pure CSS. In order to do so, we are using a normalize. The `--USER__advancedSettings: readium-advanced-on` inline style must be set for `html` in order for the font-size setting to work.

Although it might be an issue to authors at first sight, this approach is backed by actual data.

```
--USER__fontSize
```

Recommended values for font-size: a range from `75%` to `250%`. Increments are left to implementers’ judgment.

#### Type scale

If the `--USER__advancedSettings: readium-advanced-on` style is set for `html`, you can customize the `font-size` of all elements using a factor. This may come in handy on mobile devices, if the user sets a large font-size.

```
--USER__typeScale
```

Possible values for type scale: `1` | `1.067` | `1.125` | `1.2` (suggested default) | `1.25` | `1.333` | `1.414` | `1.5` | `1.618`

You can use different type scale values depending on the `font-size`. For instance, if the user sets a large one, you might want to decrease the type scale so that headings are not super large.

#### Line height

```
--USER__lineHeight
```

Recommended values: a range from `1` to `2`. Increments are left to implementers’ judgment.

### Paragraphs’ formatting

The user can set `margin-top`, `margin-bottom` and `text-indent` for paragraphs. 

#### Paragraphs’ spacing

```
--USER__paraSpacing
```

Recommended values: a range from `0` to `2rem`. Increments are left to implementers’ judgment.

#### Paragraphs’ indent

```
--USER__paraIndent
```

Recommended values: a range from `0` to `3rem`. Increments are left to implementers’ judgment.

### Characters’ spacing

The user can set `word-spacing` and `letter-spacing` for headings and body copy contents.

#### Word spacing

```
--USER__wordSpacing
```

Recommended values: a range from `0` to `1rem`. Increments are left to implementers’ judgment.

#### Letter spacing

```
--USER__letterSpacing
```

Recommended values: a range from `0` to `0.5rem`. Increments are left to implementers’ judgment.

#### Arabic Ligatures

```
--USER__ligatures
```

Possible values: `none` | `common-ligatures`

## Themes

In this model, themes are just a set of user variables with specific values.

It becomes even easier to override them for the user as the values are already user settings.

In other words, think of preset and custom themes as a set of variables, which makes it easier to create, manipulate and cache them.

## Alternative options

- Appending/removing overrides as `<style>`, dynamically
- Using custom attributes (at least for themes + appending/removing styles dynamically)

## User settings can be language-specific

It is important to note that the list of user settings you may provide users with can change depending on the primary language of the publication.

Indeed, it doesn’t make sense to have some user settings in some languages, and they would do more harm than good e.g. hyphens in CJK. Ideally, those settings should therefore be removed from the UI, or at least disabled, if needed.

### All languages other than Latin

Implementers will need to load different list of fonts based on the languages listed in [Default Fonts](../docs/CSS09-default_fonts.md).

The most complex issue is finding fonts for those languages, especially as mobile systems often ship with the minimum amount of fonts possible to support Indic, Arabic, Hebrew, CJK, etc. And when the platform provides an extended selection, users often have to download them beforehand.

The following is provided as guidance only:

1. the app should at least offer the publisher’s font and the default (`var(--RS__baseFontFamily)`) for the language – which should work automatically if the correct language is set for each document;
2. if implementers want to extend the list:
   1. use pre-installed fonts if the system offers some;
   2. use downloadable fonts if the system offers some;
   3. carefully pick fonts supporting the language and the idiosyncrasies of its typography;
   4. fall back to [Google Noto Fonts](https://www.google.com/get/noto/).
3. users probably have fonts already installed, re-use those fonts if possible (advanced setting in which they can access or declare those fonts).

### Right to left scripts

User settings to disable are:

- `--USER__wordSpacing`;
- `--USER__letterSpacing`.

User settings to add are:

- `--USER__ligatures`.

### CJK

For Chinese, Japanese, and Korean, implementers must manage both horizontal and vertical writing modes, since the pagination model differs.

#### Horizontal writing mode

User settings to disable are: 

- `--USER__textAlign`;
- `--USER__bodyHyphens`;
- `--USER__paraIndent`;
- `--USER__wordSpacing`;
- `--USER__letterSpacing`.

#### Vertical writing mode

This also impacts the Mongolian script.

User settings to disable are:

- `--USER__colCount`;
- `--USER__textAlign`;
- `--USER__bodyHyphens`;
- `--USER__paraIndent`;
- `--USER__wordSpacing`;
- `--USER__letterSpacing`.
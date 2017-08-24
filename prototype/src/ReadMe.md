# Quick start

Readium CSS is a set of reference stylesheets for EPUB Reading Systems. It provides: 

- a CSS normalize for EPUB contents;
- paged and scrolled views;
- default styles;
- reading modes (night, sepia, etc.);
- themes;
- user settings;
- media overlays and user highlights.

## Introduction

The following sections explain how Readium CSS basically works at the moment. Extended documentation is available in the `docs` folder.

Please feel free to file issues if you have any.

## How To

Inject ReadiumCSS stylesheets into the `<head>` of (X)HTML documents. 

1. `ReadiumCSS-base.css`
2. `ReadiumCSS-html5patch.css`
3. `ReadiumCSS-safeguards.css`
4. Authors’ stylesheet(s)
5. `ReadiumCSS-highlights.css`
6. `ReadiumCSS-pagination.css`
7. `ReadiumCSS-scroll.css`(if needed, must override pagination)
8. `ReadiumCSS-night_mode.css` or `ReadiumCSS-sepia_mode.css` (if needed)
9. `ReadiumCSS-os_a11y.css`
10. `ReadiumCSS-user_settings.css`
11. `ReadiumCSS-fs_normalize.css` (if needed)

Check the `CSS-stylesheets_order.md` document for further details.

By default, we don’t use classes or attributes but you can modify stylesheets in order to do so if you wish (that way, you could inject all stylesheets on load).

## Manage User Settings

Currently, user settings are managed using two mechanisms: 

- appending and removing stylesheets;
- setting user variables at the `:root` level.

### Extra Stylesheets

Scroll, reading modes (sepia and night), and font-size normalize require specific stylesheets. You should consequently append and remove them.

### User variables

All other settings can be set using `--USER__variables`. Set those properties to `html` and the cascade will automatically do its job.

To set a variable:

```
var root = document.documentElement || document.getElementById("iframe-wrapper").contentWindow.document.documentElement; 

root.style.setProperty("--USER__var", "value");
```

To remove a variable:

```
var root = document.documentElement || document.getElementById("iframe-wrapper").contentWindow.document.documentElement; 

root.style.removeProperty("--USER__var");
```

Please note you must implement a fallback strategy if you want to support Internet Explorer 11 and early versions of Microsoft Edge. User settings have been designed to work with inline styles (on `html`) whenever possible.

### Examples

#### Changing hyphenation and justification

```
root.style.setProperty("--USER__textAlign", "justify");
root.style.setProperty("--USER__bodyHyphens", "auto");
```

Of course this example is simplistic. You could for instance create a helper to set multiple properties at once.

#### Changing the type scale 

First, append `ReadiumCSS-fs_normalize.css` at the head of `head`.

Then:

```
root.style.setProperty("--USER__typeScale", "1.067");
```

## Create Themes

In this model, themes are a set of user settings you can store in a JSON object. Add the properties to `html` and you get a theme.

Check the `CSS-api.md` doc for the set of available user variables.
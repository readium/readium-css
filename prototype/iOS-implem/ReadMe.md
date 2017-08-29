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

1. `ReadiumCSS-before.css`
2. Authors’ stylesheet(s) (or `ReadiumCSS-default.css` if the epub has no author’s styles)
3. `ReadiumCSS-after.css`

## Manage User Settings

Currently, user settings are managed by setting user variables on `html`.

Check the API for the complete list of settings.

### User variables

All settings can be set using `--USER__variables`. Set those properties to `html` and the cascade will automatically do its job.

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

Check the `CSS09-user_prefs.md` doc for the set of available user variables.
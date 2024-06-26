# Migration Guide

[Implementers’ doc] [WIP]

This document aims to list changes that were made in `v.2` and how to handle them in your Reading System/apps when upgrading ReadiumCSS. 

## Removal of responsive columns

In version 1, ReadiumCSS used media queries to automatically handle the number of columns/pages to display based on certains conditions. To sum things up it switched from 1 to 2 columns when:

- the `width` of the window was large enough, based on the font-size;
- the device’s width (`device-width`) was within an arbitrary range based on the font-size, and in landscape orientation.

As a side-effect, this “auto-pagination model” (think of it as an “auto” setting for the number of columns/pages in user settings) was [not reliable enough for implementers](https://github.com/readium/readium-css/issues/143), and created issues with newer devices and form-factors (e.g. foldables). Sometimes it wouldn’t even swith to 2 columns when applying the setting because of the conditions above.

In version 2, ReadiumCSS removed these media queries and the “auto-pagination model” entirely. It applies styles the Reading System/app provides to it. Consequently, control over breakpoints is now the responsibility of the app. 

If you want to reimplement an “auto” user setting, and switch to 1 or 2 columns depending on the orientation of the device or the width of the window, you now have to handle it programmatically. 

## Removal of -webkit-perspective hack for older versions of Chromium

The following hack was used in version 1:

```
:root {
  -webkit-perspective: 1;
}
```

The issues it resolves are described in [CanIUse’s “known issues” for CSS Multicolumn](https://caniuse.com/multicolumn#bugs):

> Chrome is reported to incorrectly calculate the container height, often breaks on margins and padding, and can display one pixel of the next column at the bottom of the previous column. Some of these issues can be solved by adding `-webkit-perspective: 1;` to the column container. This creates a new stacking context for the container, and apparently causes Chrome to (re)calculate column layout.

That hack created a [performance issue for large HTML documents](https://github.com/readium/readium-css/issues/117) as a side-effect though, and it was consequently removed in version 2, especially as it was no longer needed.

Blink/Chromium switched to their new LayoutNG for columns in version `v.106.0.5245.0`. This means that if you have to deal with versions below, you have to re-implement this CSS hack specifically for these – and their older layout engine.

It could be something as simple as appending the style to the `html` element:

```
<html style="-webkit-perspective: 1">
```

or adding it in `head`:

```
<head>
  ...
  <style type="text/css">
    :root {
      -webkit-perspective: 1;
    }
  </style>
  ...
</head>
```

## Replacement of page margins user setting with line length user setting

In version 1 ReadiumCSS implemented a page margins user setting: `--USER__pageMargins`. 

This is no longer supported in version 2, as it has been replaced with a user setting for the line length of body copy (i.e. the `max-width` of the `body` element). `--USER__lineLength` should now be used.

The user setting should consequently be updated, either in the form of replacement or mimicking of the old one.

It is indeed possible to re-implement the page margins user setting by using the new variable, given margin will adjust automatically to the line length, but this also means that your updated logic will have to work backwards.

Otherwise, the line-length user setting can be a set of predefined values, a range, etc. It accepts the values that the CSS properties `max-width|height` do.

As a side effect, `--RS__pageGutter` is now set to `0` as default. This means no `padding` is applied to neither the `:root` nor `body` elements.
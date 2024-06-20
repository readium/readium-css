# Migration Guide

[Implementers’ doc] [WIP]

This document aims to list changes that were made in `v.2` and how to handle them in your Reading System/apps when upgrading ReadiumCSS. 

## Removal of responsive columns

In version 1, ReadiumCSS used media queries to handle the number of columns/pages to display based on certains conditions. To sum things up it switched to 2 columns when:

- the `width` of the webpage was large enough
- the device’s width (`device-width`) was within an arbitrary range, and in landscape orientation.

As a side-effect, that “auto-pagination model” (think of it as an “auto” setting for the number of columns/pages in user settings) was [not reliable enough for implementers](https://github.com/readium/readium-css/issues/143), and created issues with newer devices and form-factors. Sometimes it wouldn’t swith to 2 columns when applying the setting because of the conditions above.

In version 2, ReadiumCSS removed these media queries and the “auto-pagination model”. It applies styles the Reading System/app provides to it. Consequently, control over breakpoints is now the responsibility of the app. 

If you want to switch to 1 or 2 columns depending on the orientation of the device or the width of the webpage, you now have to handle it programmatically. 

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

Blink/Chromium switched to their new LayoutNG implementations for columns in version `v.106.0.5245.0`. This means that if you have to deal with versions below, you have to re-implement this hack specifically for these – and their older layout engine.
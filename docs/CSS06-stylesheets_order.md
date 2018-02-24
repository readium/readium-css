# Order in which to append Readium CSS Reflowable Stylesheets

[Implementers’ doc] [Authors’ info]

Readium CSS is leveraging the cascade in order to provide authors with defaults, paginate contents and apply user overrides and themes. As a consequence, there is a specific order in which reflowable stylesheets must be added. Indeed, conformance with [CSS Cascading and Inheritance Level 3](https://www.w3.org/TR/css3-cascade/) requires that we make authors’ stylesheets an integral part of our cascade.

This order might evolve at some point in development, to make it easier to manage for implementers.

## Insert before the author’s stylesheets

The following modules must be inserted before the author’s stylesheets, in this exact order: 

1. `ReadiumCSS-base.css`
2. `ReadiumCSS-day_mode.css`
3. `ReadiumCSS-html5patch.css`
4. `ReadiumCSS-safeguards.css`

## Append if there is no author’s styles

The following modules must be appended if there is no external stylesheet (`<link>`), internal stylesheet (`<style>`) or inline styles (`style=" "`), in this exact order: 

1. `ReadiumCSS-default.css`

This default must be appended before all other stylesheets in the next section.

## Append after the author’s stylesheets

The following modules must be appended after the author’s stylesheets, ideally in this order: 

1. `ReadiumCSS-highlights.css`
2. `ReadiumCSS-pagination.css`
3. `ReadiumCSS-scroll.css`(if needed, must override pagination)
4. `ReadiumCSS-night_mode.css` or `ReadiumCSS-sepia_mode.css` (if needed)
5. `ReadiumCSS-os_a11y.css`
6. `ReadiumCSS-user_settings.css`
7. `ReadiumCSS-fs_normalize.css` (if needed)
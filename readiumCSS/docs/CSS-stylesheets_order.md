# Order in which to append Readium CSS Reflowable Stylesheets

Readium CSS is leveraging the cascade in order to provide authors with defaults, paginate contents and apply user overrides and themes. As a consequence, there is a specific order in which reflowable stylesheets must be added.

Of course implementers may decide to merge modules so that they can deal with less stylesheets.

## Insert before the author’s stylesheets

The following modules must be inserted before the author’s stylesheets, in this exact order: 

1. `ReadiumCSS-base.css`
2. `ReadiumCSS-html5patch.css`
3. `ReadiumCSS-safeguards.css`

## Append if there is no author’s styles

The following modules must be appended if there is no external stylesheet (`<link>`), internal stylesheet (`<style>`) or inline styles (`style=" "`), in this exact order: 

1. `ReadiumCSS-default.css`

This default must be appended before all other stylesheets in the next section.

## Append after the author’s stylesheets

The following modules must be appended after the author’s stylesheets, in this exact order: 

1. `ReadiumCSS-highlights.css`
2. `ReadiumCSS-pagination.css`
3. `ReadiumCSS-scroll.css`(if needed)
4. `ReadiumCSS-night_mode.css` or `ReadiumCSS-sepia_mode.css` (if needed)
5. `ReadiumCSS-user_settings.css`
6. `ReadiumCSS-fs_normalize.css` (if needed)
# readium-css

A set of reference stylesheets for EPUB Reading Systems, starting with Readium 2.

Readium CSS provides: 

- a CSS normalize for EPUB contents;
- paged and scrolled views;
- default styles;
- reading modes (night, sepia, etc.);
- themes;
- user settings;
- media overlays and user highlights.

## License

BSD-3-Clause (http://opensource.org/licenses/BSD-3-Clause)

See [license.txt](https://github.com/readium/readium-css/blob/master/LICENSE).

## Scope of this project

The major goal of Readium CSS is to provide implementers with reliable and modern styles for EPUB 2 and EPUB 3 publications, and authors with good interoperability. 

Those stylesheets were not designed and should not be used for (Portable) Web Publications, or other existing formats like FB2, PRC, Mobi, TEI, etc.

Some issues, which may be raised during development, will be documented so that they can serve as a reference for future specifications.

## Testing

You can use the [webpub manifest prototype](https://github.com/HadrienGardeur/webpub-manifest/tree/gh-pages/examples/paged-viewer) with the [RS-streamer-js](https://github.com/edrlab/r2-streamer-js) in a local development environment.

Please note you’ll have to manually inject stylesheets and apply settings via the console, or design and code scripts if you want a GUI (user settings menu).

## Known implementations

There is no public implementation of Readium CSS so far. 

Consequently, if you are encountering rendering issues with Readium, please report them on the [Readium-shared-js repository](https://github.com/readium/readium-shared-js).

## Docs

See Wiki for overarching concepts and the docs folder for technical details (markdown files).
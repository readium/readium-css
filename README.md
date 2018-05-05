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

**Readium CSS is currently in alpha** (version `1.0.0-alpha.1`).

## License

BSD-3-Clause (http://opensource.org/licenses/BSD-3-Clause)

See [license.txt](https://github.com/readium/readium-css/blob/master/LICENSE).

## Scope of this project

The major goal of Readium CSS is to provide implementers and authors with reliable and modern styles for EPUB 2 and EPUB 3 publications, with good interoperability. 

Those stylesheets were not designed and should not be used for other existing formats like FB2, PRC, Mobi, TEI, etc., and works in progress like Web Publications or Portable Web Publications.

Some issues, which may be raised during development, will be documented so that they can serve as a reference for future specifications.

## Testing

An [iOS test app](https://github.com/readium/r2-testapp-swift) for the Swift implementation of Readium 2 is using Readium CSS and can be [downloaded on the App Store](https://itunes.apple.com/us/app/r2-reader/id1363963230?mt=8).

An [Android test app](https://github.com/readium/r2-testapp-kotlin) for the Kotlin implementation of Readium 2 is using Readium CSS. Stable builds are [available on Google Play](https://play.google.com/store/apps/details?id=org.readium.r2reader). To follow the development of this app, [join the beta channel](https://play.google.com/apps/testing/org.readium.r2reader).

The Readium Desktop app is using Readium CSS and [is available for Linux, MacOS and Windows](https://github.com/edrlab/readium-desktop/releases).

You can also use the [webpub manifest prototype](https://github.com/HadrienGardeur/webpub-manifest/tree/gh-pages/examples/paged-viewer) with the [RS-streamer-js](https://github.com/edrlab/r2-streamer-js) in a local development environment. Please note you’ll have to manually inject stylesheets and apply settings via the console, or design and code scripts if you want a GUI (user settings menu).

## Other known implementations

There is no external implementation of Readium CSS so far.

Consequently, if you are encountering rendering issues with Readium (iOS apps, Android apps, or the Readium Chrome App), please report them on the [github section dedicated to the proper Readium project](https://github.com/readium) (readium-js, readium-shared-js, readium-sdk, etc.).

## Docs

See Wiki for overarching concepts and the docs folder for technical details (markdown files).
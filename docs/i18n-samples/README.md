# ReadiumCSS i18n samples

This folder contains a set of small samples whose goal is to help implementers test and improve the internationalization support of their app.

The primary focus are text (typography, fonts) and rendition (`page-progression-direction`, `dir`, and `writing-mode`). However they can also be used to: 

- test the UI of the app (toc, run-in headings, language-specific user settings, etc.);
- metadata parsing (`dc:title`, multiple `dc:language` items, and alternate script).

## Classification

The `latin.epub` file serves as a base, it is a control which allows implementers to check if there is no rendition issue to fix before testing all other samples.

### Left to Right 

#### Indic

- Bengali
- Gujarati
- Hindi
- Kannada
- Malayalam
- Oriya
- Punjabi
- Sinhalese
- Tamil
- Telugu

#### Other Languages

- Amharic
- Armenian
- Cherokee
- Inuktitut
- Khmer
- Lao
- Thai
- Tibetan

### Right to left

- Arabic
- Hebrew
- Persian/Farsi

### CJK

#### Horizontal writing

- Chinese
- Japanese
- Korean

#### Vertical writing

- Japanese (`vertical-rl`)
- Mongolian (`vertical-lr`)

### Edge Cases

The most complex i18n issue to handle at the rendition level is managing publications in which some documents are in another language, and either `direction` or `writing-mode` differs from the publication.

Consequently, two samples are provided to test those two edge cases:

- mixed-directions (`dir`);
- mixed-writing-modes (`writing-mode`).

Both files contain:

- 1 `<dc:title>` item for the publication (in Arabic and Japanese);
- 1 `alternate script` for the title (in English);
- 2 `<dc:language>` (Arabic || Japanese && English);
- 1 `page-progression-direction` attribute on the `<spine>` and whose value is `rtl`;
- 1 table of content (`nav`) in the primary language (Arabic or Japanese);
- 1 title page in the primary language (Arabic or Japanese);
- 1 document in the primary language (Arabic or Japanese), with the following: 
    1. Mixed directions: a `dir="rtl"` attribute on `html`;
    2. Mixed writing modes: a `writing-mode: vertical-rl` style on `html`.
- 1 document in the secondary language (English), with the following:
    1. Mixed directions: a `dir="ltr"` attribute on `html`;
    2. Mixed writing modes: a `writing-mode: horizontal-tb` style on `html`.

Those two edge cases raise interoperability issues in the EPUB ecosystem. As of January 2018, expected results are:

1. Mixed direction: rendition based on the `page-progression-direction`, with every document forced on a `rtl` direction;
2. Mixed writing modes: rendition based on the `page-progression-direction`, with every document forced on a `vertical-rl` writing mode.

## Reporting issues

An [i18n-specific issue](https://github.com/readium/readium-css/issues/26) has been opened to deal with issues, documentation and support. Please feel free to raise any global issue you may encounter.
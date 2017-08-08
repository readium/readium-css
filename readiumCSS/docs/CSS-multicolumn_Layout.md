# How the multicolumn layout works

[Implementers doc] [CSS authors info]

Global References: 

- [W3C Spec](https://www.w3.org/TR/css3-multicol/)
- [W3C Mailing List — css-multicol](https://www.w3.org/Search/Mail/Public/search?keywords=%5Bcss-multicol%5D)

## Introduction

By using columns, content can flow from one column to another, and the number of columns can vary depending on the size of the viewport. The specification was originally designed to replace table-based multicolumn layout.

You can declare a multicolumn layout with one line of CSS: 

```
body {
  column-width: 15em;
}
```

Or 

```
body {
  column-count: 2;
}
```

Or

```
body {
  columns: 2 15em;
}
```

## The multi-column model

**Multi-column layout introduces a new type of container between the content box and the content, the column box.** This is a significant departure from the traditional box model. 

The content of a multicol element is flowed into column boxes, which are arranged into rows, like table cells (inline direction). Consequently: 

- column width is the length of the column box in the inline direction;
- column height is the height of the column box in the block direction;
- all column boxes in a row have the same column width and column height;
- adjacent column boxes are separated by a column gap, which may contain a column rule;
- all column gaps (and column rules) in the same row are equal;
- column rules only appear between columns that both have content;

Critical shortcomings can be pointed out in the column box model:

1. it is not possible to set properties/values on column boxes, which is why you can’t set the background of one specific column;
2. the column box has no concept of padding, margin or borders;
3. column boxes don’t establish containing blocks for elements with `position: fixed || absolute`.

However, floats inside multi-column layouts are positioned with regard to the column box where they appear.

Finally, since a multi-column element establishes a new block formatting context, a top margin set on the first child element will not collapse with the margins of the multicol element.

## The number and width of columns

Basically, two properties determine the width of columns: 

- `column-count`;
- `column-width`.

A third one, `columns`, is a shorthand which sets both.

### Column width

This property describes the width of columns in multicol elements.

Its values can be: 

- `auto`, which means the column width will be determined by other properties (`column-count` if set);
- `<length>`, which describes the optimal column width. 

The actual column width may be wider (to fill the available space), or narrower. But **the column width can only be narrower if the available space is smaller that the specified column width.**

#### Notes

- To ensure that `column-width` can be used with vertical text, column width means the length of the line boxes inside the columns.
- To set an exact column width, all length values (`width`, `column-width`, `column-gap`, and `column-rule-width`) must be specified.

### Column count

This property describes the number of columns of a multicol element.

Its values can be: 

- `auto`, which means the number of columns will be determined by other properties (`column-width` if set);
- `<integer>`, which describes the optimal number of columns into which the content of the element will be flowed.

It is important to note that **if both ‘column-width’ and ‘column-count’ have non-auto values, the integer value describes the maximum number of columns.**

### Columns

This is the shorthand property for setting `column-width` and `column-count`. Omitted values are set to their initial values (`auto`).

### Pseudo-algorithm

The pseudo-algorithm below determines the used values for ‘column-count’ (N) and ‘column-width’ (W). There are two other variables in the pseudo-algorithm:

- `available-width`, it is unknown if the multi-column element is floating with a `width` of `auto`, it is the same as the used width of the multi-column element—in vertical text, the used height replaces used width in this calculation.
- `shrink-to-fit`, the result of a shrink-to-fit computation.

```
(01)  if ((column-width = auto) and (column-count = auto)) then
(02)        exit; /* not a multicol element */

(03)  if ((available-width = unknown) and (column-count = auto)) then
(04)    exit; /* no columns */

(05)  if (available-width = unknown) and (column-count != auto) and (column-width != auto) then
(06)    N := column-count;  
(07)    W := column-width;
(08)  exit;

(09)  if (available-width = unknown) then
(10)    available-width := shrink-to-fit;

(11)  if (column-width = auto) and (column-count != auto) then
(12)    N := column-count;
(13)    W := max(0, (available-width - ((N - 1) * column-gap)) / N);
(14)  exit;

(15)  if (column-width != auto) and (column-count = auto) then
(16)    N := max(1, floor((available-width + column-gap) / (column-width + column-gap)));
(17)    W := ((available-width + column-gap) / N) - column-gap;
(18)  exit;

(19)  if (column-width != auto) and (column-count != auto) then
(20)    N := min(column-count, floor((available-width + column-gap) / (column-width + column-gap)))
(21)    W := ((available-width + column-gap) / N) - column-gap;
(22)  exit
```

What is important to understand there is that the `column-width` can either be a floor or a ceiling, depending on the value of `column-count`.

Let’s take some examples.

```
/* Condition starting at line 11 applies */
body {
  column-width: auto;
  column-count: 2;
}
```

The column width is not set, it entirely depends on `column-count` and `column-gap` (which suggested default is `1em`).

Columns theoretically have a floor (`0`) and a ceiling (line 13)

```
/* Condition starting at line 15 applies */
body {
  column-width: 300px;
  column-count: auto;
}
```

In this example, the number of columns is computed depending on the column width.

In other words, the column width is a ceiling: it can’t be larger than `300px` but can shrink if the available width is less.

```
/* Condition starting at line 19 applies */
body {
  column-width: 300px;
  column-count: 2;
}
```

In this example, the column width is a floor: if 2 columns (2 × column width and the gap) can fit, `column-count` will be honored, else `column-width` grows to the width available. If there is additional width available when 2 columns fit, `column-width` will grow as well.

## Column gaps and rules

What is important is that column gaps take up space while column rules don’t.

1. column gaps will push apart content in adjacent columns (within the same multicol element);
2. if there is a column rule between columns, it will appear in the middle of the gap.

As regards column rules: 

- they are painted just above the background of the multicol element so that child elements with `z-index` values to be on top of column rules; 
- they are only drawn between two columns that both have content.

## Fragmentation (column break)

When a page or column break splits a box, the box’s margins, borders, and paddings have no visual effect where the split occurs. It is important to remark `outline` and `box-shadow` are not discussed at all in the spec. 

The spec says “the margin immediately after a forced page or column break will be preserved” but that isn’t necessarily the case in practice, CSS authors often having to resolve to `padding-top` to force a margin after a page break.

From experience, avoiding a `break-inside` elements flowing in 2 or 3 columns can also be problematic (the element vertical alignment is completely off).

## Column span

You can only span all columns or none. It is not possible to declare an `<integer>`. 

An element establishes a new block formatting context if its `column-span` is set to `all`. In other words, `column-span` kind of resets the flow to the first column.

We may not necessarily worry about this (in authors’ CSS) because the User Agent can treat it as `column-span: none` if it can’t find room to make the element spanning. Constraining the height of columns should be enough to prevent a column span, especially with overflow.

## Filling columns

By default, columns will be balanced (minimal variation in column length), they won’t be filled sequentially.

This default can be overridden with

```
body {
  column-fill: auto;
}
```

It’s worth noting User Agents should try to honor `widows` and `orphans` in any case.

## Overflow

What is important to remark is that: 

- content that extends into column gaps is clipped in the middle of the column gap;
- a multicol element can have more columns that it has room for, additional column boxes are created in the inline direction (page or column break, constrained height, etc.);
- columns that appear outside the multicol element are called overflow columns.

## Notorious limitations

When the spec was published, the *Financial Times* immediately switched to [its own JavaScript implementation](https://labs.ft.com/articles/ft-columnflow/?mhq5j=e3) for the following reasons: 

- configurable column widths, gutters and margins;
- better handling of `position: absolute || fixed`;
- support of `column-span: <integer>`;
- better fragmentation (column breaks);
- grouping of columns into pages;
- enforce a baseline grid;
- better handling of `box-shadow` and `outline`.

As far as I can tell, this implementation might create some issues, especially when it comes to a11y because it duplicates and hides part of elements to manage fragmentation.

## Notes

It is my understanding the [Opera implementation of `overflow: -o-paged-x` in Presto](http://www.wiumlie.no/2011/reader/) solved most of the spec’s limitations, as listed by the *Financial Times*: 

- `position: fixed || absolute`;
- fragmentation;
- `column-span: integer`;
- overflow, by switching to paged media;
- implementing [CSS figures](https://figures.spec.whatwg.org) as a bonus.

[An editor’s draft of CSS multicolumn Layout Module Level 2 exists](https://drafts.csswg.org/css-multicol-2/) but it is quite empty at the moment. 

From experience, I can also report there tends to be implementation-specific bugs with newer layout specs e.g. flexbox, grid, etc.

### Missing pieces

There are several shortcomings we must deal with: 

- the `column-gap` applies to adjacent column boxes, but there is nothing to set a `columns-start-margin` and `columns-end-margin`: this is particularly problematic when columns are set at the `:root` level and overflow;
- there is no JavaScript API available, we don’t even know the number of columns which have been created and their real width;
- since we can’t use `overflow: paged-x`, there is no way we can force the `scrollWidth` to be a multiple of the viewport, we must force the creation of an extra column if needed.
- the lack of “column queries” makes it really difficult for authors to do responsive design.
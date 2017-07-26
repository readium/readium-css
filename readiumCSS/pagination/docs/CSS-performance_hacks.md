# CSS Performance Hacks

[Implementers doc]

This document discusses the CSS specs implementers can use in case they have performance issues: 

1. `will-change`;
2. CSS containment.

At first sight, using those 2 specs can give tremendous results but you sometimes have to use them in clever ways: it’s not just about adding a line of CSS in your stylesheet.

## Will-change

### The fundamental rule of will-change

> Set will-change to the properties you’ll actually change, on the elements that are actually changing. And remove it when they stop.

### Abstract

The `will-change` property allows an author to inform the UA ahead of time of what kinds of changes they are likely to make to an element. The UA can then try to optimize how they handle the element ahead of time, performing potentially-expensive work preparing for an animation before the animation actually begins.

**In other words, `will-change` is a UA hint,** it doesn’t have any styling effect on the elements for which you’re using it. It’s worth noting it can have appearance effects though, if a new stacking context is created.

It is, in many ways, an official property for the infamous “translate-z hack.” Although it was meant for animation, it can also deal with more simple changes.

### Usage

```
will-change: <animateable-feature> = scroll-position || contents || <custom-ident>
```

#### Scroll-position

Indicates that the author expects to animate or change the scroll position of the element in the near future.

A browser might take this value as a signal to expand the range of content around the scroll window that is rendered, so that longer/faster scrolls can be done smoothly.

#### Contents

Indicates that the author expects to animate or change something about the element’s contents in the near future.

A browser might take this value as a signal to cache less aggressively on the element, or avoid caching at all and just continually re-render the element from scratch.

#### <custom-ident>

Indicates that the author expects to animate or change the property with the given name on the element in the near future.

A browser might take a value of transform as a signal that it should go ahead and promote the element to its own layer immediately, before the element starts to be transformed, to avoid any delay involved in rerendering the old and new layers.

### Drawbacks

By using `will-change`, you’re basically telling the browser the element is a few moments away from changing, the browser consequently dedicates memory and resources to this element. **If you use it for too many elements, it will thus degrade performance.**

This property should be considered a last resort, it was not meant for premature optimization. **You should use it only if you have to deal with performance issues.**

### Do’s and Dont’s

#### Do’s

- Use `will-change` sparingly in stylesheets
- Give `will-change` sufficient time to work
- Use `<custom-ident>` to target super specific changes (`left`, `opacity`, etc.)
- Use it in JavaScript if needed (add and remove hint)
- Remove `will-change` after the changes are done

#### Dont’s

- Don’t declare changes to too many properties
- Don’t apply it to too many elements
- Don’t waste resources on elements that have stopped changing

### Examples

#### UI elements

Specifying `will-change` for a small number of persistent UI elements in a page which should react snappily to the user is appropriate:

```
body > .sidebar {
  will-change: transform;
  /* Will use 'transform' to slide it out when the user requests. */
}
```

Because this is limited to a small number of elements, the fact that the optimization is rarely actually used doesn’t hurt very much.

#### User click

If an element is going to change when a user clicks on it, setting `will-change` on hover will usually give at least 200 milliseconds for the optimizations to be set up, as human reaction time is relatively slow.

```
.element { 
  transition: opacity 0.2s; 
  opacity: 1; 
}

.element:hover { 
  will-change: opacity; 
}

.element:active { 
  opacity: 0.3; 
}
```

#### Adding and removing the hint with JavaScript

This is probably the way to go, should you try using `will-change` to optimize performance.

Here we have the hint added on `:hover`, then removed when the animation has ended.

```
var el = document.getElementById('element');

// Set will-change when the element is hovered
el.addEventListener('mouseenter', hintBrowser);
el.addEventListener('animationEnd', removeHint);

function hintBrowser() {
  // The optimizable properties that are going to change
  // in the animation's keyframes block
  this.style.willChange = 'transform, opacity';
}

function removeHint() {
  this.style.willChange = 'auto';
}
```

### TO DO

- Check if it could be useful for user settings (user displaying menu should be reliable enough)
- Check if scroll could benefit from it (pagination)
- Check combo with CSS containment, if there is anything we can do with the latter
- Check if it doesn’t add too much complexity at the JS level
- Find (inventive) ways to leverage it on mobile, should it gives interesting results

### References

- [CSS Will Change Module Level 1](https://www.w3.org/TR/css-will-change-1/)
- [Can I Use](http://caniuse.com/#feat=will-change)
- [Mozilla Dev Network](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change)
- [Everything you need to know about the CSS will-change property](https://dev.opera.com/articles/css-will-change-property/)
- [CSS ‘will-change’ Property: A Performance Case Study](https://www.maxlaumeister.com/blog/css-will-change-property-a-performance-case-study/)

## CSS Containment

TBD
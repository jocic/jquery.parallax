# jQuery Parallax

jQuery parallax scrolling library with image preloader and custom scroll function (for those that use custom content scrollers).

# Versioning Scheme

I use a 3-digit version identifier, for example 1.0.1. These digits have the following meaning:

* The first digit (1) specifies the major version number.
* The second digit (0) specifies the minor version number.
* The third digit (1) specifies the patch version number.

# Examples

Before using the library you have to upload the files from the "src" folder to your server and add the library to your project.

```html
<link href="src/css/parallax.css" rel="stylesheet" type="text/css" />
<script src="src/js/parallax.js" type="text/javascript"></script>
```

Be sure to check out the demo if you are confused.

## Example 1 - Without Parameters

CSS

```css
#my-parallax {
    background: #111 url(../img/1.jpg) no-repeat 0px 0px;
    background-size: 100% auto;
}
```

HTML

```html
<div id="my-parallax" class="parallax parallax-dark"></div>
```

JS

```js
$("#my-parallax").parallax();
```

## Example 2 - With Parameters

HTML

```html
<div id="my-parallax" class="parallax parallax-dark"></div>
```

JS

```js
$("#my-parallax").parallax({
    image : "./demo/img/1.jpg",
    height : "400",
    scroll : "default"
});
```

## Example 3 - With Parameters & Manual Scroll

HTML

```html
<div id="my-parallax" class="parallax parallax-dark"></div>
```

JS - Setup

```js
$("#my-parallax").parallax({
    image : "./demo/img/1.jpg",
    height : "400",
    scroll : "default"
});
```

JS - Manual Scroll

```js
$("#my-parallax").parallaxScroll(scrollPosition);
```

# Themes

Three themes exist:

* .parallax-default - Background (#f65d96)

![Default Theme](demo/img/themes/theme-default.gif)

* .parallax-dark - Background (#111111)

![Dark Theme](demo/img/themes/theme-dark.gif)

* .parallax-light - Background (#ffffff)

![Light Theme](demo/img/themes/theme-light.gif)

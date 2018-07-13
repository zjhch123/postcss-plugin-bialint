# PostCSS Bia [![Build Status][ci-img]][ci]

[PostCSS] plugin for bia.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/zjhch123/postcss-plugin-bialint.svg
[ci]:      https://travis-ci.org/zjhch123/postcss-plugin-bialint

```css
.foo {
  background-image: url(https://www.baidu.com/1.png);  /* that will be ok*/
}
```

```css
.foo {
  background-image: url(http://www.baidu.com/1.png);  /* an error will be throw */
}
```

```css
.foo {
  background-image: url(http://www.baidu.com/1.png) /* ignore-protocol */;  /* ignore check */
}
```

## Usage

```js
postcss([ require('postcss-bialint') ])
```

See [PostCSS] docs for examples for your environment.

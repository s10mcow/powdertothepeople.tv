---
layout: post
title: Convert SASS to SCSS
---

Simple post. 

I had a bunch of SASS files mixed with SCSS files - we prefer SCSS. 

Manually convert? Fuck no!

Automatically convert? Fuck yes!


```javascript
sass-convert -R --from sass --to scss ./path/to/files
```

[gist of the above](https://gist.github.com/knowuh/1189728)

[sass-convert](https://github.com/SassDoc/sass-convert)



# whereurat
Add a bar to show where your scroll is on the top of the page

# usage
##include the script
```html
<script type="text/javascript" src="whereURAt.js"></script>
```

##run the script
```js
whereURAt.add();
```

# configuration
```js
whereURAt.add(config);
```

##example config:
```js
{
    barId: 'whereURAt-bar',
    barColor: '#298AD9',
    barHeight: '2px',
    animate: true,
    animationSpeed: 0.1,
    zIndex: '999999'
}
```
# Pinch to Zoom

A Javascript library that makes it easy to detect pinch and spread motions. This can be used for more than zooming, but that's what it was originally made for. 

This is inspired by https://github.com/anvaka/wheel which makes it super easy to detect wheel scrolling, I wanted something similar for pinching / spreading. 

## Usage

```
addPinchListener(domElement, function (event) {
    // All event properties are described below
    zoom(event.clientX, event.clientY, event.deltaY);
});

function zoom(x, y, delta) {
    var isZoomIn = delta < 0;

}
```

## Event properties

**clientX / clientY** - The x and y coordinates the user appears to be pinching towards.
**deltaX / deltaY** - The total movement the user has done in each direction. When pinching these numbers will be positive. When spreading these numbers will be negative.

## License 

MIT


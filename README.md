# Pinch to Zoom

A Javascript library that makes it easy to detect pinch and spread motions. This can be used for more than zooming, but that's what it was originally made for. 

This is inspired by https://github.com/anvaka/wheel which makes it super easy to detect wheel scrolling, I wanted something similar for pinching / spreading. 

## Usage

```
addPinchListener(domElement, function (event) {
    // All event properties are described below
    zoom(event.clientX, event.clientY, event.delta);
});

function zoom(x, y, delta) {


}
```

## Event properties

- **clientX / clientY** - The x and y coordinates the user appears to be pinching towards.
- **delta** - The total movement the user has performed with the pinch in pixels.

## License 

MIT


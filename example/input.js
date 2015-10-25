addPinchListener(renderer.view, function (e) {
  zoom(e.clientX, e.clientY, e.deltaY < 0);
});

addWheelListener(renderer.view, function (e) {
  zoom(e.clientX, e.clientY, e.deltaY < 0);
});

var getGraphCoordinates = (function () {
  var ctx = {
    global: { x: 0, y: 0} // store it inside closure to avoid GC pressure
  };

  return function (x, y) {
    ctx.global.x = x; ctx.global.y = y;
    return PIXI.InteractionData.prototype.getLocalPosition.call(ctx, bunnies);
  }
}());

function zoom(x, y, isZoomIn) {
  var direction = isZoomIn ? 1 : -1;
  var factor = (1 + direction * 0.1);
  bunnies.scale.x *= factor;
  bunnies.scale.y *= factor;

  // Technically code below is not required, but helps to zoom on mouse
  // cursor, instead center of container coordinates
  var beforeTransform = getGraphCoordinates(x, y);
  bunnies.updateTransform();
  var afterTransform = getGraphCoordinates(x, y);

  bunnies.position.x += (afterTransform.x - beforeTransform.x) * bunnies.scale.x;
  bunnies.position.y += (afterTransform.y - beforeTransform.y) * bunnies.scale.y;
  bunnies.updateTransform();
}

JSON.stringifyOnce = function(obj, replacer, indent){
    var printedObjects = [];
    var printedObjectKeys = [];

    function printOnceReplacer(key, value){
        if ( printedObjects.length > 2000){ // browsers will not print more than 20K, I don't see the point to allow 2K.. algorithm will not be fast anyway if we have too many objects
        return 'object too long';
        }
        var printedObjIndex = false;
        printedObjects.forEach(function(obj, index){
            if(obj===value){
                printedObjIndex = index;
            }
        });

        if ( key == ''){ //root element
             printedObjects.push(obj);
            printedObjectKeys.push("root");
             return value;
        }

        else if(printedObjIndex+"" != "false" && typeof(value)=="object"){
            if ( printedObjectKeys[printedObjIndex] == "root"){
                return "(pointer to root)";
            }else{
                return "(see " + ((!!value && !!value.constructor) ? value.constructor.name.toLowerCase()  : typeof(value)) + " with key " + printedObjectKeys[printedObjIndex] + ")";
            }
        }else{

            var qualifiedKey = key || "(empty key)";
            printedObjects.push(value);
            printedObjectKeys.push(qualifiedKey);
            if(replacer){
                return replacer(key, value);
            }else{
                return value;
            }
        }
    }
    return JSON.stringify(obj, printOnceReplacer, indent);
};

function writeArgs(type) {
   return function() { 
        var argtext = document.getElementById("argtext" + type);
        argtext.innerHTML = JSON.stringifyOnce(arguments[0]);
   }
    
}

// writeArgs("pinch")("test")

// $$("#canvas").pinch(writeArgs("pinch"));
// $$("#canvas").touch(writeArgs("pinch"));
// $$("#canvas").swipe(writeArgs("pinch"));
//Detect if is pinching
// $$("#canvas").pinching(writeArgs("pinching"));
//Pinch zoom
// $$("#canvas").pinchIn(writeArgs("pinchIn"));
// $$("#canvas").pinchOut(writeArgs("pinchOut"));

$$("#canvas").pinching(function (e) {
  var argtext = document.getElementById("argtextpinch");
  argtext.innerHTML = JSON.stringifyOnce(e.touch.delta);
  
  if (e.touch.delta != 0)
    zoom(1, 1, e.touch.delta < 0);
});

// $$("#canvas").pinchOut(function (e) {
  // zoom(1, 1, true);
// })
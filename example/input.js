addPinchListener(renderer.view, function (e) {
  zoom(e.clientX, e.clientY, e.delta);
});

addWheelListener(renderer.view, function (e) {
  zoom(e.clientX, e.clientY, e.deltaY);
});

addDragNDrop();

isPinching = false;

var getGraphCoordinates = (function () {
  var ctx = {
    global: { x: 0, y: 0} // store it inside closure to avoid GC pressure
  };

  return function (x, y) {
    ctx.global.x = x; ctx.global.y = y;
    return PIXI.InteractionData.prototype.getLocalPosition.call(ctx, bunnies);
  }
}());

function addDragNDrop() {
  stage.setInteractive(true);

  var isDragging = false,
      prevX, prevY;

  stage.touchstart = function (moveData) {
    var pos = moveData.global;
    prevX = pos.x; prevY = pos.y;
    isDragging = true;
  };

  stage.touchmove = function (moveData) {
    if (!isDragging) {
      return;
    }
    var pos = moveData.global;
    var dx = pos.x - prevX;
    var dy = pos.y - prevY;
    
    // if (isPinching) return;
    if ((Math.abs(dx) + Math.abs(dy)) > 100) return;

    bunnies.position.x += dx;
    bunnies.position.y += dy;
    prevX = pos.x; prevY = pos.y;
  };

  stage.touchend = function (moveDate) {
    isDragging = false;
  };
}

function zoom(x, y, delta) {
  var factor = (1 + (0-delta) / 300);
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


// $$("#canvas").pinchOut(function (e) {
  // zoom(1, 1, true);
// })
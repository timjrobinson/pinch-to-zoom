  addPinchListener(renderer.view, function (e) {
    zoom(e.clientX, e.clientY, e.deltaY < 0);
  });
  
  var getGraphCoordinates = (function () {
    var ctx = {
      global: { x: 0, y: 0} // store it inside closure to avoid GC pressure
    };

    return function (x, y) {
      ctx.global.x = x; ctx.global.y = y;
      return PIXI.interaction.InteractionData.prototype.getLocalPosition.call(ctx, bunnies);
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

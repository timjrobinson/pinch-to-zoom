addPinchListener(renderer.view, function (e) {
  zoom(e.clientX, e.clientY, e.delta);
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

function zoom(x, y, delta) {
  var factor = (1 + (0-delta) / 300);
  bunnies.scale.x *= factor;
  bunnies.scale.y *= factor;

  var beforeTransform = getGraphCoordinates(x, y);
  bunnies.updateTransform();
  var afterTransform = getGraphCoordinates(x, y);

  bunnies.position.x += (afterTransform.x - beforeTransform.x) * bunnies.scale.x;
  bunnies.position.y += (afterTransform.y - beforeTransform.y) * bunnies.scale.y;
  bunnies.updateTransform();
}
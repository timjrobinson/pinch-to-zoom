view = document.getElementById('canvas');
var renderer = PIXI.autoDetectRenderer(800, 600, view);

// create the root of the scene graph
var stage = new PIXI.Stage();

var container = new PIXI.Stage();

stage.addChild(container);

var bunnies = new PIXI.Graphics();

container.addChild(bunnies);

for (var j = 0; j < 5; j++) {

    for (var i = 0; i < 5; i++) {
        var bunny = PIXI.Sprite.fromImage('bunny.png');
        bunny.x = 40 * i;
        bunny.y = 40 * j;
        bunnies.addChild(bunny);
    };
};
/*
 * All the bunnies are added to the container with the addChild method
 * when you do this, all the bunnies become children of the container, and when a container moves,
 * so do all its children.
 * This gives you a lot of flexibility and makes it easier to position elements on the screen
 */
bunnies.x = 100;
bunnies.y = 60;

// start animating
animate();

function animate() {

    requestAnimationFrame(animate);

    // render the root container
    renderer.render(stage);
}

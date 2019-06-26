var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1, 
            speed: -3,
            gameItems: [
                {type: 'sawblade',x:400,y:380},
                {type: 'sawblade',x:700,y:380},
                {type: 'sawblade',x:1200,y:380},
                {type: 'spike', x:900, y:480},
                {type: 'spike', x:550, y:480},
                {type: 'spike', x:1400, y:480},
                {type: 'enemy', x:600, y:400},
                {type: 'enemy', x:1000, y:400},
                {type: 'reward', x:800, y:350}


            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // BEGIN EDITING YOUR CODE HERE
    
    function createSpike(x,y) {
    var hitZoneSize1 = 25;
    var damageFromObstacle = 25;
    var myObstacle = game.createObstacle(hitZoneSize1,damageFromObstacle);
    myObstacle.x = x;
    myObstacle.y = y;
    game.addGameItem(myObstacle);    
    var obstacle = draw.bitmap('http://pixelartmaker.com/art/a9e2bdec60a1267.png');
    myObstacle.addChild(obstacle);
    obstacle.scaleX = .4;
    obstacle.scaleY = .4;
    obstacle.x = -60;
    obstacle.y = -65;
}
    
    function createSawBlade(x,y) {
    var hitZoneSize = 25;
    var damageFromObstacle = 20;
    var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
    myObstacle.x = x;
    myObstacle.y = y;
    game.addGameItem(myObstacle);
    var obstacleImage = draw.bitmap('img/sawblade.png');
    myObstacle.addChild(obstacleImage);
    obstacleImage.x = -25;
    obstacleImage.y = -25;
    obstacleImage.rotationalVelocity = 10;
}  

    for (var i = 0; i<levelData.gameItems.length; i++) {
            var gameItem = levelData.gameItems[i];
            console.log(gameItem);
            if (gameItem.type === 'sawblade') {
                createSawBlade(gameItem.x,gameItem.y); 
            }
            else if (gameItem.type === 'spike') {
                createSpike(gameItem.x,gameItem.y); 
            } 
            else if (gameItem.type === 'reward') {
                createReward(gameItem.x, gameItem.y);
            } else {
                createEnemy(gameItem.x, gameItem.y);
            }
           
    
   //     for (var key in levelData.gameItems) {
   // var gameItem = levelData.gameItems[key].x;
   // var gameItems = levelData.gameItems[key].y;
   // createSawBlade(gameItem, gameItems);
   // createSpike(gameItem, gameItems);
   // createEnemy(gameItem, gameItems);
    // Create a sawblade using the .x and .y property of each game item object
}

    

        
    
    
    function createEnemy(x, y) {
    var enemy =  game.createGameItem('enemy',50);
    var redSquare = draw.bitmap('https://gamepedia.cursecdn.com/lolesports_gamepedia_en/thumb/7/71/Enemylogo_square.png/220px-Enemylogo_square.png?version=f74cf0243708086ee02ceb14adf3946b');
    redSquare.x = -100;
    redSquare.y = -100;
    enemy.addChild(redSquare);
    enemy.x = 400;
    enemy.y = groundY-50;
    enemy.scaleX = .4;
    enemy.scaleY = .4;
    game.addGameItem(enemy);  
    enemy.velocityX = -1;
     
    
    enemy.onPlayerCollision = function() {
    console.log('The enemy has hit Halle');
    game.changeIntegrity(-10);
    enemy.fadeOut();

        
    };
    enemy.onProjectileCollision = function() {
        console.log('Halle has hit the enemy');
        game.increaseScore(200);
        enemy.shrink();
    };

    }
    function createReward(x, y) {
    var reward =  game.createGameItem('reward',50);
    var square = draw.bitmap('https://www.pngkey.com/png/full/439-4392668_pixel-spaceship-png-pixel-spaceship.png');
    square.x = -100;
    square.y = -100;
    reward.addChild(square);
    reward.x = x;
    reward.y = y;
    reward.scaleX = .3;
    reward.scaleY = .3;
    game.addGameItem(reward);  
    reward.velocityX = -1;
     
    
    reward.onPlayerCollision = function() {
    console.log('The reward has hit Halle');
    game.increaseScore(200);
    reward.fadeOut();

         };
    }
    };  
};


    
// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
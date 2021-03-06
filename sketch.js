var astronaut, astronautImage;
var backgroundImage, goldcoinImage;
var lavaImage, lavaGroup;
var asteroidImage, holeImage, lives = 3;
var holeGroup, asteroidGroup, gameState = "start start";
var silverCoinGroup, silverCoin = 0, resetButton;
var resetButtonImage, alienImage;
var alienGroup, silverCoinImage, bulletImage;
var bulletCount = 0, bullet, bulletGroup;
var goldCoin = 0 /*story, instruction*/;
var storyImage, instructionImage, titleImage;
var showStoryImage = true, playButtonImage;
var amountAliensKilled = 0, score = 0;

function preload(){
  astronautImage = loadImage("astronaut.jpg");
  backgroundImage = loadImage("background.jpg");
  goldcoinImage = loadImage("coin.jpg");
  lavaImage = loadImage("lava.jpg");
  asteroidImage = loadImage("asteroid.png");
  holeImage = loadImage("hole.png");
  resetButtonImage = loadImage("reset.png");
  alienImage = loadImage("alien.jpg");
  silverCoinImage = loadImage("silverCoin.png");
  bulletImage = loadImage("bullet.png");
  storyImage = loadImage("Story.png");
  instructionImage = loadImage("instructions.png");
  titleImage = loadImage("text.png");
  playButtonImage = loadImage("playButton.png");
}

function setup(){
  createCanvas(800, 400);
  Background = createSprite(400, 200, 800, 400);
  astronaut = createSprite(200, 200, 50, 50);
  bullet = createSprite(-100, -100);
  title = createSprite(400, 150);
  playButton = createSprite(400, 300);
  //story = createSprite(400, 200, 800, 400);
  //resetButton = createSprite(400, 200);
  //coin = createSprite(350, 200);
  //lava = createSprite(450, 100);
  //asteroid = createSprite(600, 300);
  //hole = createSprite(700, 100);
  Background.addImage(backgroundImage);
  title.addImage(titleImage);
  //story.addImage(storyImage);
  astronaut.addImage(astronautImage);
  playButton.addImage(playButtonImage);
  //resetButton.addImage(resetButtonImage);
  //coin.addImage(coinImage);
  //lava.addImage(lavaImage);
  //asteroid.addImage(asteroidImage);
  //hole.addImage(holeImage);
  Background.scale = 2;
  astronaut.scale = 0.3;
  title.scale = 0.5;
  playButton.scale = 0.2;
  //story.scale = 0.7;
  //resetButton.scale = 0.1;
  //coin.scale = 0.2;
  //lava.scale = 0.2;
  //asteroid.scale = 0.09;
  //hole.scale = 0.2;
  //resetButton.visible = true;
  astronaut.visible = false;
  //resetButton.debug = true;

  //lavaGroup = new Group();
  //holeGroup = new Group();
  asteroidGroup = new Group();
  silverCoinGroup = new Group();
  alienGroup = new Group();
  bulletGroup = new Group();
}

function draw(){
  //background(backgroundImage);
  drawSprites();

  if(gameState === "start start"){
    if(mousePressedOver(playButton)){
      gameState = "start";
    }
  }

  if(gameState === "start"){
    if(showStoryImage === true){
      background(storyImage);
    }
    console.log(gameState);
    if(keyCode === 32){
      showStoryImage = false;
      background(instructionImage);
    }
    if(keyWentDown('a')){
      gameState = "play";
    }
  }


  if(gameState === "play"){
    astronaut.visible = true;
    title.visible = false;
    playButton.visible = false;
    spawnSilverCoin();
    //spawnLava();
    //spawnHole();
    spawnAsteroids();
    spawnAliens();

    textSize(15);
    fill("white");
    textAlign(CENTER);
    text("Silver coins: " + silverCoin, 50, 40);
    text("Gold coins: " + goldCoin, 50, 20);
    text("Score: " + score, 700, 20);
    text("Lives left: " + lives, 400, 20);

    astronaut.y = mouseY;
    Background.velocityX = -2;

    console.log(score);

    if(asteroidGroup.isTouching(astronaut) || alienGroup.isTouching(astronaut)){
      lives -= 1;
      alienGroup.destroyEach();
      asteroidGroup.destroyEach();
      if(lives < 1){
        gameState = "end";
      }
    }

    if(silverCoinGroup.isTouching(astronaut)){
      silverCoinGroup.destroyEach();
      silverCoin += 1;
    }

    if(keyWentDown("s")){
      shoot();
    }

    //console.log(amountAliensKilled);

    if(bulletGroup.isTouching(alienGroup)){
      amountAliensKilled += 1;
      score += 1;
      alienGroup.destroyEach();
      bullet.x = -100;
      bullet.y = -100;
    }

    //astronaut.debug = true;
    astronaut.setCollider("rectangle", 0, 0, 180, 280);
    score = 0;

    if(Background.x < 0){
      Background.x = Background.width/2;
    }
  }

  if(gameState === "end"){
    background("black");
    textSize(50);
    fill("red");
    textAlign(CENTER);
    text("You lose!", 400, 200);
    //resetButton.visible = true;
  }
}

/*function spawnLava(){
  //increase the rate the obstacles spawn as the game progresses.
  if(frameCount % 150 === 0){
    var lava = createSprite(800, random(100, 300), 50, 50);
    lava.velocityX = -2;
    lava.addImage(lavaImage);
    lava.scale = 0.1;
    lavaGroup.add(lava);
  }
}

function spawnHole(){
  if(frameCount % 250 === 0){
    var hole = createSprite(800, random(100, 300), 50, 50);
    hole.velocityX = -2;
    hole.setCollider("circle", 0, 0, 150);
    hole.addImage(holeImage);
    hole.scale = 0.1;
    holeGroup.add(hole);
  }
}*/

function spawnAsteroids(){
  if(frameCount % 350 === 0){
    var asteroid = createSprite(750, random(100, 300), 50, 50);
    asteroid.velocityX = -2;
    //asteroid.debug = true;
    asteroid.setCollider("rectangle", 0, 0, 1400, 1400);
    asteroid.addImage(asteroidImage);
    asteroid.scale = 0.05;
    asteroidGroup.add(asteroid);
  }
}

function spawnSilverCoin(){
  if(frameCount % 300 === 0){
    var silverCoin = createSprite(750, random(100, 300), 50, 50);
    silverCoin.velocityX = -2;
    silverCoin.setCollider("circle", 0, 0, 75);
    silverCoin.addImage(silverCoinImage);
    silverCoin.scale = 0.2;
    silverCoinGroup.add(silverCoin);
  }
}

function spawnAliens(){
  if(frameCount % 250 === 0){
    var alien = createSprite(750, random(100, 300), 50, 50);
    alien.velocityX = -2;
    alien.addImage(alienImage);
    alien.scale = 0.3;
    alienGroup.add(alien);
  }
}

function shoot(){
  bulletCount += 1;
  if(bulletCount === 1){
    bullet.addImage(bulletImage);
    bullet.scale = 0.2;
    bullet.x = astronaut.x + 30;
    bullet.y = astronaut.y - 30;
    bullet.velocityX = 5;
    bulletCount = 0;
    bulletGroup.add(bullet);
    if(bullet.x > 800){
      bullet.x = -100;
      bullet.y = -100;
    }
  }
}
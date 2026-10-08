/* =========================
   CONSTANTS
========================= */

// Size of the game canvas
const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 600;

// How long every ability stays active (in milliseconds)
const ABILITY_DURATION_MS = 5000;


/* =========================
   GLOBAL VARIABLES
========================= */

// Music and sound effects (loaded in preload)
let menuMusic;
let battleMusic;
let laserSound;
let alienSound;
let startLevelSound;

/* Nieuwe sound effects */
let blackHoleSound;
let giantSound;
let menuSelectSound;
let playerDeathSound;
let popSound;
let speedBoostSound;

// Time value that keeps increasing, used to rotate the black hole particles
let t = 0;

// All enemy balls that are currently in the game (items are added and removed, the array itself never changes)
const balls = [];

// Text element that shows how many balls are in the game
let ballCounter;

// Timer: seconds survived in the current round
let timer = 0;
let timerRunning = false;
let startTime = 0;
let previousTimer = -1; // Last second that was handled, so spawning only happens once per second


/* Main Menu, Levels & Death */
// Current screen: "menu", "lvl1", "lvl2", "lvl3" or "dead"
let gameState = "menu";


/* Player and Game Stats */
let player;
let speedboostItem;
let speedBoostActive = false;
let playerFill = 255; // Fill color of the player

const score = 0;

// Start position of the player
let playerY = 10;
let playerX = 10;
const PLAYER_START_X = 10;
const PLAYER_START_Y = 10;

/* Ability Speed */
let playerSpeed = 5;
const abilitySpawnTiming = 3; // Every second there is a 1 in 3 chance that an ability spawns
let ballSpawnRate = 10; // Every second there is a 1 in ballSpawnRate chance that a new ball spawns
let shakeScreen = false;
let ghostMode = false;
let abilityActive = false; // Only one ability can be active at the same time

/* Ability Size */
let playerSize = 10;
const shrinkPlayerTiming = 5;

/*Ability Black Hole*/
let blackHole = false;
const blackHoleY = 100;
const blackHoleX = 100;
const blackHoleSize = 50;
const blackHoleG = 500; // Gravity strength, used in the pull formula

/* Alien Ship Ability */
const launcherLocationX = 250;
const launcherLocationY = 0;

let spaceshipActive = false;

// Laser settings
let laserActive = false;
const laserWidth = 8;
const laserLength = 40;
const laserSpeed = 5;

// Current laser position
let laserX;
let laserY;

// Direction the laser flies in (normalized, so it has a length of 1)
let laserDirectionX;
let laserDirectionY;

let angle = 0;


/* =========================
   P5 MAIN FUNCTIONS
========================= */

// Loads all sounds and images before the game starts
function preload() {
  menuMusic = loadSound('./music/menu.wav');
  battleMusic = loadSound('./music/battle.wav');
  laserSound = loadSound('./music/ahmed_abdulaal-laser-312360.mp3');
  alienSound = loadSound('./music/alien-talk-3.wav');
  startLevelSound = loadSound('./music/start-level.wav');
  launcherSprite = loadImage('images/launcher1.png');

  /* Nieuwe sound effects */
  blackHoleSound = loadSound('./music/blackHole.mp3');
  giantSound = loadSound('./music/Giant.mp3');
  menuSelectSound = loadSound('./music/menuSelectClick.mp3');
  playerDeathSound = loadSound('./music/playerDeath.mp3');
  popSound = loadSound('./music/popSound.mp3');
  speedBoostSound = loadSound('./music/speedBoost.mp3');
}

// Runs once: sets the volumes, creates the page elements and the canvas
function setup() {
  // Set the volume of every sound
  menuMusic.setVolume(0.3);
  battleMusic.setVolume(0.2);
  laserSound.setVolume(0.5);
  alienSound.setVolume(0.4);
  startLevelSound.setVolume(0.6);

  /* Volume New Sounds */
  blackHoleSound.setVolume(0.5);
  giantSound.setVolume(0.5);
  menuSelectSound.setVolume(0.5);
  playerDeathSound.setVolume(0.6);
  popSound.setVolume(0.4);
  speedBoostSound.setVolume(0.5);

  // The game starts in the menu, so the menu music plays
  menuMusic.loop();

  // Game title above the canvas
  title = createElement(
    'h1',
    '<span class="bouncing">Bouncing</span> <span class="orbs">Orbs</span>'
  );

  title.parent("leftWrap");

  const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT

  );
  canvas.parent("leftWrap");

  // Text elements below the canvas: ball counter, active ability and timer
  ballCounter = createElement('h2', "Aantal ballen: 0");
  ballCounter.class("ballCounter");
  ballCounter.parent("leftWrap");

  resetBallsTitle = createElement('h2', 'Ability:');
  resetBallsTitle.class("ballsTutorial ability");
  resetBallsTitle.parent("leftWrap");

  timerElement = createElement('h2', "Tijd: 0");
  timerElement.class("ballsTutorial");
  timerElement.parent("leftWrap");

  // Start with one ball
  spawnBall();
}


// Runs every frame: draws the screen that belongs to the current game state
function draw() {
  background(0);

  // Pick the screen/level that belongs to the current game state
  if (gameState === "menu") {
    mainMenu();
  }

  if (gameState === "lvl1") {
      ballSpawnRate = 10;
    playGame1();
  }
  if (gameState === "lvl2") {
    playGame2();
  }
  if (gameState === "lvl3") {
    playGame3();
  }

  if (gameState === "dead") {
    deathScreen();
  }

  // Key 1 in the menu: stop the menu music, play the battle music, start level 1 and start the timer
  if (key === '1' & gameState == "menu") {
    menuMusic.stop();

    menuSelectSound.play();
    startLevelSound.play();
    battleMusic.loop();

    gameState = "lvl1";
    timerRunning = true;
    startTime = millis();
    previousTimer = -1;
  }
  // Key 2 in the menu: start level 2 (same steps as level 1)
  if (key === '2' & gameState == "menu") {
    menuMusic.stop();

    menuSelectSound.play();
    startLevelSound.play();
    battleMusic.loop();

    gameState = "lvl2";
    timerRunning = true;
    startTime = millis();
    previousTimer = -1;
  }
  // Key 3 in the menu: start level 3 (same steps as level 1)
  if (key === '3' & gameState == "menu") {
    menuMusic.stop();

    menuSelectSound.play();
    startLevelSound.play();
    battleMusic.loop();

    gameState = "lvl3";
    timerRunning = true;
    startTime = millis();
    previousTimer = -1;
  }

  // Spacebar on the death screen: go back to the menu
  if (keyCode === 32 & gameState == "dead")
    gameState = "menu";
}



/* =========================
   GAME STATES
========================= */

// Draws the main menu with the three level options
function mainMenu() {
  background(10);

  textAlign(CENTER);
  fill(255);
  // Level 1 option (with glow)
push()
  drawingContext.shadowBlur = 20;
  drawingContext.shadowColor = "cyan";
  textSize(28);
  text("Press 1 to play LVL 1", width / 2, 100);
pop()
  textSize(18);
  text("Easy", width / 2, 130);

  // Level 2 option (with glow)
push()
  drawingContext.shadowBlur = 20;
  drawingContext.shadowColor = "cyan";
  textSize(28);
  text("Press 2 to play LVL 2", width / 2, 190);
pop()
  textSize(18);
  text("Normal with abilities", width / 2, 220);

  // Level 3 option (with glow)
push()
  drawingContext.shadowBlur = 20;
  drawingContext.shadowColor = "cyan";
  textSize(28);
  text("Press 3 to play LVL 3", width / 2, 280);
pop()
  textSize(18);
  text("Hard with extra abilities", width / 2, 310);
}


// Level 1: only the player and the bouncing balls
function playGame1() {
  createPlayer();
  playerMovement();
  controlTimerAbilitys();
  gameInformation();
}

// Level 2: same as level 1, abilities are spawned by controlTimerAbilitys()
function playGame2() {
  createPlayer();
  playerMovement();
  controlTimerAbilitys();
  gameInformation();
}

// Level 3: level 2 plus the screen shake, black hole and alien launcher with laser
function playGame3() {
  // Shake the whole screen while the shake ability is active
  if (shakeScreen == true) {
    translate(random(-5, 5), random(-5, 5));
  }
  // Draw the alien launcher while the spaceship ability is active
  if (spaceshipActive == true) {
    createLauncher();
  }
  // Draw the black hole while the black hole ability is active
  if (blackHole == true) {
    createBlackHole();
  }
  createPlayer();
  playerMovement();
  controlTimerAbilitys();
  gameInformation();
  t += 0.05;

  // Move the laser and check if it hits a ball
  if (laserActive == true) {
    laserX += laserDirectionX * laserSpeed;
    laserY += laserDirectionY * laserSpeed;

    push();

    fill(255, 50, 50);
    noStroke();

    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = "red";

    circle(
      laserX,
      laserY,
      laserWidth
    );
    // Check the laser against every ball, a hit removes the ball
    for (let i = 0; i < balls.length; i++) {
      enemy = balls[i];

      const circleRadius = laserWidth / 2;
      const enemyRadius = enemy.size / 2;

      const distanceX = laserX - enemy.x;
      const distanceY = laserY - enemy.y;

      // Distance between the laser and the ball (Pythagoras)
      const laserDistance = sqrt(
        sq(distanceX) +
        sq(distanceY)
      );

      // The laser hits when the distance is smaller than both radiuses together
      const laserCollision =
        laserDistance <= circleRadius + enemyRadius;

      if (laserCollision) {
        popSound.play();
        balls.splice(i, 1);
      }


    }
    pop();
  }
}



// Death screen: resets all abilities and shows the score of the round
function deathScreen() {
  // Turn off all abilities and reset the ability text
  abilityActive = false;
  speedBoostActive = false;
  blackHole = false;
  resetBallsTitle.html(
    "Ability ="
  );

  resetBallsTitle.removeClass(
    "abilityActive"
  );
  push();

  drawingContext.shadowBlur = 15;
  drawingContext.shadowColor = "blue";

  fill(255, 255, 255);

  textSize(30);

  text(
    "Press the spacebar to continue",
    width / 2,
    150
  );

  textSize(25);

  // Show how many balls there were and how long the player survived
  text(
    "Balls In The Game: " + finalBallCount,
    width / 2,
    260
  );

  text(
    "You Survived For " + finalTime + " Seconds",
    width / 2,
    310
  );

  pop();
}



/* =========================
   PLAYER
========================= */

// Draws the player as a glowing circle at the current player position
function createPlayer() {
  push();

  drawingContext.shadowBlur = 20;
  drawingContext.shadowColor = "cyan";

  fill(playerFill);
  stroke(0, 200, 255);
  strokeWeight(4);

  player = ellipse(
    playerX,
    playerY,
    playerSize
  );

  pop();
}


// Moves the player with W, A, S and D (key codes for upper and lower case)
function playerMovement() {
  if (keyIsDown(65) || keyIsDown(97)) {
    // A
    playerX -= playerSpeed;
  }

  if (keyIsDown(68) || keyIsDown(100)) {
    // D
    playerX += playerSpeed;
  }

  if (keyIsDown(87) || keyIsDown(119)) {
    // W
    playerY -= playerSpeed;
  }

  if (keyIsDown(83) || keyIsDown(115)) {
    // S
    playerY += playerSpeed;
  }
}



/* =========================
   BALLS
========================= */

// Adds a new ball with a random height, size, color and speed at the right side of the canvas
function spawnBall() {
  balls.push({
    x: random(600, 600),
    y: random(0, 400),

    size: random(10, 50),

    r: random(255),
    g: random(255),
    b: random(255),

    speedX: random(-5, 5),
    speedY: random(-5, 5)
  });

  // Update the ball counter on the page
  ballCounter.html(
    "Aantal ballen: " + balls.length
  );
}


// Draws one ball with the given position, size and color
function drawBall(x, y, size, r, g, b) {
  fill(r, g, b);
  circle(x, y, size);
}


// Ends the round: saves the results, removes all balls, stops the timer and shows the death screen
function resetBalls(balls) {
  // Save the results so the death screen can show them
  finalBallCount = balls.length;
  finalTime = timer;

  playerDeathSound.play();

  // Remove all balls
  balls.length = 0;

  // Reset the timer and the texts on the page
  timerRunning = false;
  timer = 0;

  timerElement.html(
    'Tijd: ' + timer
  );

  ballCounter.html(
    "Aantal ballen: " + balls.length
  );
  playerX = PLAYER_START_X;
  playerY = PLAYER_START_Y;
  gameState = "dead";
}


// Gives every ball a new random color
function changeColor() {
  for (const ball of balls) {
    ball.r = random(255);
    ball.g = random(255);
    ball.b = random(255);
  }
}



/* =========================
   TIMER
========================= */

// Updates the timer and, once every second, spawns abilities and balls
function controlTimerAbilitys() {
  if (timerRunning) {
    // Seconds since the round started
    timer = floor((millis() - startTime) / 1000);
    timerElement.html('Tijd: ' + timer);
    // Only run this part when a new second has started
    if (timer !== previousTimer) {
      // Level 2 and 3 have abilities, level 3 also spawns balls faster
      if (gameState === "lvl2") {
        activateAbilities();
        ballSpawnRate = "5";
      }
      if (gameState === "lvl3") {
        activateAbilities();
        ballSpawnRate = "3";
      }
      // There is always at least one ball in the game
      if (balls.length == 0) {
        spawnBall();
      }

      // Random chance to spawn an extra ball
      if (random(ballSpawnRate) < 1)
        spawnBall();

      previousTimer = timer;
    }
  }
}


/* =========================
   ABILITIES
========================= */

// Gives a random chance to spawn an ability
function activateAbilities() {
  if (random(abilitySpawnTiming) < 1) {
    createRandomAbility();
  }
}

// Picks a random ability and activates it for ABILITY_DURATION_MS (only when no other ability is active)
function createRandomAbility() {
  const selectedAbility = random([
   
    'speedBoost',
    'shrinkPlayer',
    'shakeScreen',
    'ghostMode',
    'giantPlayer',
    'blackHole', 
    'spaceship'
  ]);

  if (abilityActive == false) {
    // Speed boost: player moves twice as fast
    if (selectedAbility == 'speedBoost') {
      push()
      fill(255, 180, 0);
      stroke(255, 230, 100);
      strokeWeight(3);

      drawingContext.shadowBlur = 25;
      drawingContext.shadowColor = "orange";
      abilityActive = true;

      speedBoostSound.play();

      playerSpeed = 10;

      // Show the active ability on the page
      resetBallsTitle.html(
        "Ability = SPEEDBOOST"
      );

      resetBallsTitle.addClass(
        "abilityActive"
      );

      // After the duration: go back to normal speed and clear the ability text
      setTimeout(() => {
        pop()
        abilityActive = false;
        speedBoostActive = false;

        playerSpeed = 5;

        resetBallsTitle.html(
          "Ability ="
        );

        resetBallsTitle.removeClass(
          "abilityActive"
        );
      }, ABILITY_DURATION_MS);

    // Shrink player: player becomes smaller, so it is harder to hit
    } else if (selectedAbility == 'shrinkPlayer') {
      playerSize = 1;
      abilityActive = true;

      resetBallsTitle.html(
        "Ability = SHRINK PLAYER"
      );

      resetBallsTitle.addClass(
        "abilityActive"
      );

      // After the duration: restore the size and clear the ability text
      setTimeout(() => {
        abilityActive = false;
        speedBoostActive = false;

        playerSize = 10;

        resetBallsTitle.html(
          "Ability ="
        );

        resetBallsTitle.removeClass(
          "abilityActive"
        );
      }, ABILITY_DURATION_MS);

    // Shake screen: the whole screen shakes (see playGame3)
    } else if (selectedAbility == 'shakeScreen') {
      abilityActive = true;
      shakeScreen = true;

      resetBallsTitle.html(
        "Ability = SHAKESCREEN"
      );

      resetBallsTitle.addClass(
        "abilityActive"
      );

      // After the duration: stop shaking and clear the ability text
      setTimeout(() => {
        abilityActive = false;
        shakeScreen = false;

        resetBallsTitle.html(
          "Ability ="
        );

        resetBallsTitle.removeClass(
          "abilityActive"
        );
      }, ABILITY_DURATION_MS);

    // Ghost mode: the player turns transparent and balls can not hit it
    } else if (selectedAbility == 'ghostMode') {
      push();
      background(150);
      abilityActive = true;
      ghostMode = true;
      fill(120, 220, 255, 80);
      stroke(120, 220, 255, 150);
      strokeWeight(2);

      drawingContext.shadowBlur = 25;
      drawingContext.shadowColor = "cyan";

      resetBallsTitle.html(
        "Ability = GHOSTMODE"
      );

      resetBallsTitle.addClass(
        "abilityActive"
      );

      // After the duration: turn collision back on and clear the ability text
      setTimeout(() => {
        background(150);
        abilityActive = false;
        ghostMode = false;
        pop();
        resetBallsTitle.html(
          "Ability ="
        );

        resetBallsTitle.removeClass(
          "abilityActive"
        );
      }, ABILITY_DURATION_MS);

    // Giant player: the player becomes bigger and red
    } else if (selectedAbility == 'giantPlayer') {
      push()
      fill(200, 40, 40);
      stroke(255, 100, 100);
      strokeWeight(5);
      drawingContext.shadowBlur = 30;
      drawingContext.shadowColor = "red";
      abilityActive = true;
      playerSize = 25;
      playerFill = 50;

      giantSound.play();

      resetBallsTitle.html(
        "Ability = GIANT PLAYER"
      );

      resetBallsTitle.addClass(
        "abilityActive"
      );

      // After the duration: restore size and color and clear the ability text
      setTimeout(() => {
        pop()
        abilityActive = false;
        playerSize = 10;
        playerFill = 255;

        resetBallsTitle.html(
          "Ability ="
        );

        resetBallsTitle.removeClass(
          "abilityActive"
        );
      }, ABILITY_DURATION_MS);
    // Black hole: pulls the balls towards it (level 3 also removes the balls it touches)
    } else if (selectedAbility == 'blackHole') {
      abilityActive = true;
      blackHole = true;

      blackHoleSound.play();

      resetBallsTitle.html(
        "Ability = BLACK HOLE"
      );
      resetBallsTitle.addClass(
        "abilityActive"
      );

      // After the duration: remove the black hole and its sound
      setTimeout(() => {
        abilityActive = false;
        blackHole = false;
        blackHoleSound.stop();

        resetBallsTitle.html(
          "Ability ="
        );

        resetBallsTitle.removeClass(
          "abilityActive"
        );
      }, ABILITY_DURATION_MS);
    // Spaceship: shows a launcher, the player can shoot lasers with the mouse (see mouseClicked)
    } else if (selectedAbility == 'spaceship') {
      abilityActive = true;
      resetBallsTitle.html(
        "Ability = SPACE SHIP"
      );
      resetBallsTitle.addClass(
        "abilityActive"
      );
      spaceshipActive = true;
      alienSound.play();

      // After the duration: remove the launcher and the laser
      setTimeout(() => {
        abilityActive = false;
        laserActive = false;

        resetBallsTitle.html(
          "Ability ="
        );

        resetBallsTitle.removeClass(
          "abilityActive"
        );
        spaceshipActive = false
      }, ABILITY_DURATION_MS);
    }
  }
}



/* =========================
   CONTROLS
========================= */

// Keyboard actions: C ends the round, V changes the color of all balls
function keyPressed() {
  if (key === 'c') {
    resetBalls(balls);
  }

  if (key === 'v') {
    changeColor();
  }
}

//ACTUAL GAME
// Updates and draws every ball: movement, wall bounce, player collision, black hole pull and ball-to-ball bounce
function gameInformation() {
  for (const ball of balls) {
    // Move the ball
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Ball radius
    radius = ball.size / 2;

    // Ball edges
    rightsideBall = ball.x + radius;
    leftsideBall = ball.x - radius;
    undersideBall = ball.y + radius;
    upsideBall = ball.y - radius;

    // Canvas walls
    rightsideWall = width;
    leftsideWall = 0;
    undersideWall = height;
    topWall = 0;

    // Bounce against the walls by reversing the speed
    if (rightsideBall >= rightsideWall) {
      ball.speedX = -ball.speedX;
    }

    if (leftsideBall <= leftsideWall) {
      ball.speedX = -ball.speedX;
    }

    if (undersideBall >= undersideWall) {
      ball.speedY = -ball.speedY;
    }

    if (upsideBall <= topWall) {
      ball.speedY = -ball.speedY;
    }


    /* Player collision */
    // Ghost mode turns the collision off
    if (ghostMode == false) {
      for (let i = 0; i < balls.length; i++) {
        enemy = balls[i];

        const playerRadius = playerSize / 2;
        const enemyRadius = enemy.size / 2;

        const distanceX = playerX - enemy.x;
        const distanceY = playerY - enemy.y;

        // Distance between the player and the ball (Pythagoras)
        const playerDistance = sqrt(
          sq(distanceX) +
          sq(distanceY)
        );

        // The player is hit when the distance is smaller than both radiuses together
        const playerCollision =
          playerDistance <= playerRadius + enemyRadius;

        if (playerCollision) {
          resetBalls(balls);
        }


      }
    }
    // Black hole: pull the ball towards the black hole with Newton's gravity formula
    if (blackHole == true) {
      const distanceX = blackHoleX - ball.x; //Calculate Distance X
      const distanceY = blackHoleY - ball.y; //Calculate Distance Y
      // Distance to the black hole (Pythagoras)
      const r = sqrt(
        sq(distanceX) +
        sq(distanceY)
      );
      // Direction towards the black hole (length of 1)
      const directionX = distanceX / r;
      const directionY = distanceY / r;
      // The closer the ball, the stronger the pull
      const force = blackHoleG * blackHoleSize / r ** 2;

      // Change the speed of the ball in the direction of the black hole
      ball.speedX += directionX * force;
      ball.speedY += directionY * force;

      // In level 3 the black hole also removes the balls it touches
      if (gameState === "lvl3") {
        for (let i = balls.length - 1; i >= 0; i--) {
          const enemy = balls[i];

          const blackHoleRadius = blackHoleSize / 2;
          const enemyRadius = enemy.size / 2;

          const distanceX = blackHoleX - enemy.x;
          const distanceY = blackHoleY - enemy.y;

          const blackHoleDistance = sqrt(
            sq(distanceX) +
            sq(distanceY)
          );

          const blackHoleCollision =
            blackHoleDistance <= blackHoleRadius + enemyRadius;

          if (blackHoleCollision) {
            popSound.play();
            balls.splice(i, 1);
          }
        }
      }
    }


    /* Ball-to-ball collision */
    // Compare every pair of balls once; when they touch they bounce back
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        const ballA = balls[i];
        const ballB = balls[j];

        const radiusA = ballA.size / 2;
        const radiusB = ballB.size / 2;

        const distanceX = ballB.x - ballA.x;
        const distanceY = ballB.y - ballA.y;

        const distance = sqrt(
          sq(distanceX) +
          sq(distanceY)
        );

        const collision =
          distance <= radiusA + radiusB;

        if (collision) {
          ballA.speedX = -ballA.speedX;
          ballA.speedY = -ballA.speedY;

          ballB.speedX = -ballB.speedX;
          ballB.speedY = -ballB.speedY;
        }
      }
    }

    // Draw the ball at its new position
    drawBall(
      ball.x,
      ball.y,
      ball.size,
      ball.r,
      ball.g,
      ball.b
    );
  }
}


//Ability Ideeen GHOST MODE
//Maak kleur van speler anders, shake wanneer ability bijna over is // zet colission uit met simpele if methode

/*
Newtonian Gravitational force formula.
F = kracht waarmee de bal naar de black hole wordt getrokken
G = zelfgekozen gravity strrength
M = sterkte/massa van de black hole
r = afstand tussen bal en black hole

dx = blackHoleX - ballX
dy = blackHoleY - ballY

a2 + b2 = c2 (je zoekt de schuine afstand met Pythagoras)
r = wortel(dx2 + dy2)
force = G * M / R2

Ball ● -----------> ⚫ Black hole
        afstand r

dx = verschil in X
dy = verschil in Y

        ↓

richting naar black hole

        ↓

kracht = G × M / r²

        ↓

speedX en speedY veranderen
*/

// Draws the black hole as a dark circle with 8 purple particles that rotate around it
function createBlackHole() {
  fill(10);
  stroke(120, 0, 255);
  strokeWeight(4);

  circle(
    blackHoleX,
    blackHoleY,
    blackHoleSize
  );

  // Place 8 particles evenly around the black hole; t makes them rotate
  for (let i = 0; i < 8; i++) {
    const angle = t + i * TWO_PI / 8;
    fill(180, 0, 255);
    noStroke();
    circle(
      blackHoleX + cos(angle) * 50,
      blackHoleY + sin(angle) * 50,
      10
    )
  }
}
/*Waar is de black hole?
        ↓
distanceX en distanceY

Hoe ver is hij?
        ↓
r = √(distanceX² + distanceY²)

Welke richting moet ik op?
        ↓
directionX = distanceX / r
directionY = distanceY / r

Hoe sterk trekt hij?
        ↓
force = G × M / r²

Pas die kracht toe op de snelheid
        ↓
speedX += directionX × force
speedY += directionY × force
function blackHoleMath() {
  distanceX = blackHoleX - ball.x;
  distanceY = blackHoleY - ball.y;
  r = wortel(distanceX2 + distanceY2);
  directionX = distanceX / r;
  directionY = distanceY / r;
  force = blackHoleG * blackHoleSize / r2;

 SpeedX =  speedX + directionX * force;
  speedY =  speedY + directionY * force;
*/
// Draws the alien launcher image at the top of the canvas
function createLauncher() {
  image(launcherSprite, launcherLocationX, launcherLocationY, 100, 100);
}

// Mouse click while the spaceship ability is active: fire a laser from the launcher towards the mouse
function mouseClicked() {
  if (spaceshipActive == true) {
    laserX = 300; // ongeveer midden launcher
    laserY = 80;

    // How far the mouse is from the laser start position
    const differenceX = mouseX - laserX;
    const differenceY = mouseY - laserY;

    // Length of that direction (Pythagoras)
    const distance = sqrt(
      sq(differenceX) +
      sq(differenceY)
    );

    // Normalize the direction so the laser always flies at the same speed
    laserDirectionX = differenceX / distance;
    laserDirectionY = differenceY / distance;
    angle = atan2(laserDirectionY, laserDirectionX);
    laserActive = true;
    laserSound.play();
  }
}


/*
Vector Normalisatie en het stuk met afstand gebruikt de stelling van pythagoras
doel - start
laserX start op 300
laserY start op 100

mouseX is op 500
mouseY = 300


Hoe ver naar rechts en hoe ver naar beneden ligt de muis?
differenceX = 500 - 300 = 200
differenceY = 300 - 100 = 200

Pythagoros omd e lengte van die richtingsvector te vinden
afstand = V(DX+2 + DY2)

Noramliseren van de vector (vector is een richting + een grootte/lengte)  (3,4) 3 naar rechts en 4 naar beneden
normaliseren is haal de afstand/grotte weg uit de vector en houd alleen de richting over



*/
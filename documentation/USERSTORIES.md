# User Stories - Bouncing Orbs

The user stories are in order of priority. The first stories together make the minimal working game. The stories after that make the game harder and more fun.

`- [x]` means the story is finished.

---

## Must have: the basic game

- [x] **US-01 Main menu**
  As a player, I want to see a main menu with three levels, so that I know which levels I can play.
  * The menu shows "Press 1 to play LVL 1", "Press 2 to play LVL 2" and "Press 3 to play LVL 3".
  * Under every level a short description is shown (Easy, Normal with abilities, Hard with extra abilities).

- [x] **US-02 Start a level**
  As a player, I want to press 1, 2 or 3 in the menu to start a level, so that I can choose how hard the game is.
  * Pressing 1 starts Level 1, pressing 2 starts Level 2 and pressing 3 starts Level 3.
  * The menu is replaced by the game screen after pressing the key.

- [x] **US-03 See the player**
  As a player, I want to see a circle on the screen, so that I know which object I control.
  * A circle is drawn on the canvas as soon as a level starts.
  * The circle has a glowing blue outline, so it stands out from the balls.

- [x] **US-04 Move the player**
  As a player, I want to move my circle with W, A, S and D, so that I can dodge the balls.
  * W moves the circle up, A moves it left, S moves it down and D moves it right.
  * The circle keeps moving as long as the key is held down.

- [x] **US-05 See the balls**
  As a player, I want to see colored balls moving across the screen, so that there is something to avoid.
  * At the start of a level there is at least one ball on the canvas.
  * Every ball has its own random size, color and speed.

- [x] **US-06 Balls bounce off the walls**
  As a player, I want the balls to bounce off the walls, so that the balls stay inside the game area.
  * When a ball touches the left or right wall, it bounces back horizontally.
  * When a ball touches the top or bottom wall, it bounces back vertically.

- [x] **US-07 Game ends when hit**
  As a player, I want the game to end when a ball touches my circle, so that the game has a challenge.
  * The round ends as soon as the player circle touches a ball.
  * All balls are removed and the death screen is shown.

- [x] **US-08 Death screen with results**
  As a player, I want to see my results after I die, so that I know how well I did.
  * The death screen shows how many balls were in the game.
  * The death screen shows how many seconds I survived.

- [x] **US-09 Back to the menu**
  As a player, I want to press the spacebar on the death screen to go back to the menu, so that I can try again.
  * Pressing the spacebar on the death screen shows the main menu.
  * Pressing the spacebar during a level does nothing.

- [x] **US-10 Timer**
  As a player, I want to see a timer that counts up, so that I know how long I have survived.
  * The text "Tijd: x" is shown below the canvas and goes up every second.
  * The timer starts at 0 when a level starts and is set back to 0 after dying.

- [x] **US-11 Ball counter**
  As a player, I want to see how many balls are in the game, so that I can see how crowded the screen is.
  * The text "Aantal ballen: x" is shown below the canvas.
  * The number changes when a ball is added to the game and when the game ends.

---

## Should have: harder levels and abilities

- [x] **US-12 More balls over time**
  As a player, I want new balls to appear while I play, so that the game gets harder the longer I survive.
  * Every second there is a random chance that a new ball appears.
  * There is always at least one ball in the game.

- [x] **US-13 Harder levels spawn more balls**
  As a player, I want balls to spawn more often in the harder levels, so that Level 3 is harder than Level 2.
  * Level 2 uses a ball spawn rate of 5.
  * Level 3 uses a ball spawn rate of 3, so new balls appear more often.

- [x] **US-14 Balls bounce off each other**
  As a player, I want the balls to bounce off each other, so that the movement of the balls is less predictable.
  * When two balls touch, both balls reverse their X and Y speed.
  * Two balls touching each other does not end the game.

- [x] **US-15 Random abilities**
  As a player, I want abilities to appear randomly in Level 2 and Level 3, so that the game stays interesting.
  * Level 1 has no abilities. In Level 2 and Level 3 an ability can start every second with a random chance.
  * Only one ability can be active at the same time.
  * The name of the active ability is shown next to "Ability =" below the canvas and is cleared when the ability ends.

- [x] **US-16 Speed Boost**
  As a player, I want a Speed Boost ability, so that I can dodge the balls faster.
  * While the ability is active my speed goes from 5 to 10.
  * After 5 seconds my speed is back to 5.

- [x] **US-17 Shrink Player**
  As a player, I want a Shrink Player ability, so that it is easier to avoid the balls.
  * My circle becomes smaller while the ability is active.
  * The ability ends after 5 seconds.

- [x] **US-18 Ghost Mode**
  As a player, I want a Ghost Mode ability, so that I can survive for a short time without being hit.
  * While Ghost Mode is active, balls can not end the game when they touch me.
  * After 5 seconds the balls can hit me again.

- [x] **US-19 Giant Player**
  As a player, I want a Giant Player ability, so that the game also has abilities that make it harder.
  * My circle becomes bigger and gets a darker color while the ability is active.
  * The ability ends after 5 seconds.

- [x] **US-20 Shake Screen**
  As a player, I want a Shake Screen ability in Level 3, so that Level 3 feels more chaotic.
  * While the ability is active the whole screen shakes in Level 3.
  * The shaking stops after 5 seconds.

---

## Should have: Level 3 extras

- [x] **US-21 Black hole**
  As a player, I want a black hole in Level 3 that pulls the balls towards it, so that the balls move in a different way.
  * The black hole is shown as a dark circle with 8 small circles rotating around it.
  * Balls curve towards the black hole, and the closer a ball is, the stronger the pull.
  * The black hole disappears after 5 seconds.

- [x] **US-22 Black hole removes balls**
  As a player, I want the black hole to remove the balls that touch it, so that the black hole helps me survive.
  * A ball that touches the black hole in Level 3 is removed from the game.
  * A pop sound plays when a ball is removed.

- [x] **US-23 Alien launcher**
  As a player, I want to see an alien launcher in Level 3, so that I know I can shoot.
  * The launcher image is shown at the top of the canvas while the Spaceship ability is active.
  * The launcher disappears after 5 seconds.

- [x] **US-24 Shoot a laser**
  As a player, I want to click with the mouse to shoot a laser, so that I can aim at the balls myself.
  * Clicking on the canvas fires a laser from the launcher in the direction of the mouse.
  * The laser only works while the Spaceship ability is active, and a laser sound plays when it is fired.

- [x] **US-25 Laser removes balls**
  As a player, I want the laser to remove the balls it hits, so that shooting is useful.
  * A ball that is touched by the laser is removed from the game.
  * A pop sound plays when a ball is removed.

---

## Could have: extra controls and sound

- [x] **US-26 Reset the game**
  As a player, I want to press C to end the current game, so that I can stop a round without waiting for a ball to hit me.
  * Pressing C during a level ends the round and shows the death screen.
  * The results of that round are shown on the death screen.

- [x] **US-27 Change the ball colors**
  As a player, I want to press V to change the colors of the balls, so that I can play around with the game.
  * Pressing V gives every ball a new random color.
  * Pressing V does not change the speed or position of the balls.

- [x] **US-28 Background music**
  As a player, I want to hear background music, so that the game feels more fun.
  * The menu music plays in a loop while the menu is shown.
  * When a level starts the menu music stops and the battle music plays in a loop.

- [x] **US-29 Sound effects**
  As a player, I want to hear sound effects, so that I get feedback about what happens in the game.
  * A sound plays when I select a level, when a level starts and when I die.
  * Abilities have their own sounds (Speed Boost, Giant Player, Black Hole and Spaceship).

  ## User Stories Peer Feedback

Reviewer: Sem
Date: 28-09-2026

I asked a classmate to review my user stories. We went through the checklist together.

* [V] Are there at least 10 user stories written down?
* [V] Are all stories written in the "As a … I want … so that …" format?
* [V] Is every story small enough to build in a few hours?
* [V] Does every story have at least 2 acceptance criteria?
* [V] Can the stories be built independently of each other?
* [V] Are the stories placed in a logical order?
* [V] Does every story appear in the sketch (nothing was made up that is not in the sketch)?
* [V] Are there no stories that actually describe multiple things at once?

Comments from the reviewer:
I don't have any feedback for Jack. He has a lot of user stories which are easy to read and understand.


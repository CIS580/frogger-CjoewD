"use strict;"

const MS_PER_FRAME = 1000/8;

/* Classes */
const Game = require('./game.js');
const Player = require('./player.js');
const Log = require('./log.js');
const Car = require('./car.js');

/* Global variables */
var canvas = document.getElementById('screen');
var backdrop = new Image();
backdrop.src = './assets/FroggerBackdrop.png';
var heart = new Image();
heart.src = './assets/heart.png';
var game = new Game(canvas, update, render);
var game = new Game(canvas, update, render);
var player = new Player({ x: 0, y: 230 })
var car = [new Car({ x: 256, y: 680, direction: 0 }), new Car({ x: 256, y: 420, direction: 0 }), new Car({ x: 256, y: 160, direction: 0 }), new Car({ x: 256, y: -120, direction: 0 }), new Car({ x: 256, y: -420, direction: 0 }),
            new Car({ x: 192, y: 680, direction: 1 }), new Car({ x: 192, y: 420, direction: 1 }), new Car({ x: 192, y: 160, direction: 1 }), new Car({ x: 192, y: -120, direction: 1 }),
            new Car({ x: 384, y: 300, direction: 1 }), new Car({ x: 384, y: 140, direction: 1 }), new Car({ x: 384, y: -10, direction: 1 }), new Car({ x: 384, y: -350, direction: 1 }),
            new Car({ x: 448, y: 660, direction: 0 }), new Car({ x: 448, y: 110, direction: 0 }),
            new Car({ x: 512, y: -200, direction: 0 }), new Car({ x: 512, y: -400, direction: 0 }), new Car({ x: 512, y: 230, direction: 0 })];
var log = [new Log({ x: 69, y: 100, direction: 0 }), new Log({ x: 69, y: 300, direction: 0 }), new Log({ x: 69, y: -150, direction: 0 }), new Log({ x: 69, y: -520, direction: 0 }), 
            new Log({ x: 645, y: 100, direction: 1 }), new Log({ x: 645, y: 300, direction: 1 }), new Log({ x: 645, y: -150, direction: 1 }), new Log({ x: 645, y: -520, direction: 1 })];
var timer = 1000 / 8; //used to determine when cars spawn
var totalScore = 0;
var level = 1;
var lives = 3;
var logCheck = false;
var gameState = "start";
var forFlash = true;
var timer = 0;



window.onkeyup = function (event) {
      switch (event.keyCode) {
          case 13:
			switch(gameState){
				case "lose":
				case "win":
					lives = 3;
					totalScore = 0;
					level = 1;
					player.reset();
					for (i = 0; i < car.length; i++) {
						car[i].resetSpeed();
					}
					for (i = 0; i < log.length; i++) {
						log[i].resetSpeed();
					}
				case "start":
					gameState = "running";
			}
			break;
		case 27:
			if(gameState == "running"){
				lives = 3;
				totalScore = 0;
				level = 1;
				player.reset();
				gameState = "start";
				for (i = 0; i < car.length; i++) {
					car[i].resetSpeed();
				}
				for (i = 0; i < log.length; i++) {
					log[i].resetSpeed();
				}
			}
			break;
      }
  }


/**
 * @function masterLoop
 * Advances the game in sync with the refresh rate of the screen
 * @param {DOMHighResTimeStamp} timestamp the current time
 */
var masterLoop = function(timestamp) {
  game.loop(timestamp);
  window.requestAnimationFrame(masterLoop);
}
masterLoop(performance.now());


/**
 * @function update
 * Updates the game state, moving
 * game objects and handling interactions
 * between them.
 * @param {DOMHighResTimeStamp} elapsedTime indicates
 * the number of milliseconds passed since the last frame.
 */
function update(elapsedTime, ctx) {
	switch(gameState){
		case "start":
			
			break;
		case "running":
			//win checked
			if(player.getState() == "won"){
				switch(level){
					case 5:
						totalScore += 500 * lives;
						gameState = "win";
					case 4:
						totalScore += 400;
					case 3:
						totalScore += 300;
					case 2:
						totalScore += 200;
					case 1:
						totalScore += 100;
					level++;
					for (i = 0; i < car.length; i++) {
						car[i].upSpeed();
					}
					for (i = 0; i < log.length; i++) {
						log[i].upSpeed();
					}
				}
			}
			
			//check death
			if(player.getState() != "dead") {
				switch(player.x){
					case 64: //logs
						if(player.getState() != "locked") {
							logCheck = false;
							for(i = 0; i<4;i++){ 
								if(player.y < -10){
									player.lock();
								}
								if(player.y+54 > log[i].y && player.y < log[i].y + 50 && log[i].getState() == "float"){
									logCheck = true;
								}
							}
							if(!logCheck){
								player.kill();
								lives--;
							}
						}
						player.y -= log[0].getSpeed();
						break;
					case  192:
						for(i = 5; i<9;i++){
							if(player.y+54 > car[i].y && player.y < car[i].y + 100){
								player.kill();
								lives--;
							}
						}
						break;
					case 256:
						for(i = 0; i<5;i++){
							if(player.y+54 > car[i].y && player.y < car[i].y + 100){
								player.kill();
								lives--;
							}
						}
						break;
					case 384:
						for(i = 9; i<13;i++){
							if(player.y+54 > car[i].y && player.y < car[i].y + 100){
								player.kill();
								lives--;
							}
						}
						break;
					case 448:
						for(i = 13; i<15;i++){
							if(player.y+54 > car[i].y && player.y < car[i].y + 100){
								player.kill();
								lives--;
							}
						}
						break;
					case 512:
						for(i = 15; i<18;i++){
							if(player.y+54 > car[i].y && player.y < car[i].y + 100){
								player.kill();
								lives--;
							}
						}
						break;
					case 640: //logs
						if(player.getState() != "locked") {
							logCheck = false;
							for(i = 4; i<8;i++){ 
								if(player.y > 375){
									player.lock();
								}
								if(player.y+54 > log[i].y && player.y < log[i].y + 50 && log[i].getState() == "float"){
									logCheck = true;
								}
							}
							if(!logCheck){
								player.kill();
								lives++;
							}
						}
						player.y += log[0].getSpeed();
						break;
				}
				if(lives < 1)gameState = "lose";
			}
			else{
				switch(player.x){
					case 64:
						player.y -= log[0].getSpeed();
						break;
					case 640:
						player.y += log[0].getSpeed();
						break;
				}
			}
			
			player.update(elapsedTime);
			// TODO: Update the game objects

			//cars
			for(i = 0; i<car.length;i++){
				car[i].update(elapsedTime);
			}

			//logs
			for(i = 0; i<log.length;i++){
				log[i].update(elapsedTime);
			}
			
			//score
			if((player.x == 64 || player.x == 192 || player.x == 256 || player.x == 384 || player.x == 448 || player.x == 512 || player.x == 640) && player.getState() != "dead"){
				totalScore++;
			}
			break;
		case "win":
		
			break;
		case "lose":
		
			break;
	}
}

/**
  * @function render
  * Renders the current game state into a back buffer.
  * @param {DOMHighResTimeStamp} elapsedTime indicates
  * the number of milliseconds passed since the last frame.
  * @param {CanvasRenderingContext2D} ctx the context to render to
  */
function render(elapsedTime, ctx) {
	switch(gameState){
		case "running":
		  ctx.drawImage(backdrop,0,0);
		  
		  //render logs
		  for (i = 0; i < log.length; i++) {
			  log[i].render(elapsedTime, ctx);
		  }
		  
		  // renders cars in correct order to player state
		  if(player.getState() == 'dead'){
				player.render(elapsedTime, ctx);
				
				for (i = 0; i < car.length; i++) {
				car[i].render(elapsedTime, ctx, "back");
				}
		  }
		  else{
				for (i = 0; i < car.length; i++) {
				car[i].render(elapsedTime, ctx, "back");
				}
				
				player.render(elapsedTime, ctx);
		  }
		  
			// render front of cars
		  for (i = 0; i < car.length; i++) {
			  car[i].render(elapsedTime, ctx, "front");
		  }
		  
		  //render screen info (lives, score, level)
		  ctx.fillStyle = "#eae5e1";
		  ctx.fillRect(0, 450, 760, 30);
		  ctx.fillStyle = "black";
		  ctx.fillRect(0, 445, 760, 5);
		  ctx.font = "bold 14px Arial";
		  ctx.fillText("Lives: ", 20, 470);
		  for (i = 0; i < lives; i++){
				ctx.drawImage(
					// image
					heart,
					// source rectangle
					0, 0, 44, 41,
					// destination rectangle
					65 + (i*25), 456, 20, 20
			  );
			}
		  ctx.fillText("Level: ", 680, 470);
		  ctx.fillText(level, 725, 470);
		  ctx.fillText("Score: ", 330, 470);
		  ctx.fillText(totalScore, 380, 470);
		  break;
		case "start":
			timer += elapsedTime;
			if (timer > MS_PER_FRAME * 2) {
				timer = 0;
				if(forFlash) forFlash = false;
				else forFlash = true;
			}
			ctx.drawImage(backdrop,0,0);
			ctx.fillStyle = "black";
			ctx.font = "bold 100px Arial";
			ctx.fillText("Frogger", 190, 150);
			if(forFlash){
				ctx.font = "bold 30px Arial";
				ctx.fillText("Press \"enter\" to start the game.", 160, 400);
			}
			break;
		case "win":
			timer += elapsedTime;
			if (timer > MS_PER_FRAME * 2) {
				timer = 0;
				if(forFlash) forFlash = false;
				else forFlash = true;
			}
			ctx.drawImage(backdrop,0,0);
			ctx.fillStyle = "black";
			ctx.font = "bold 100px Arial";
			ctx.fillText("Frogger", 190, 100);
			ctx.font = "bold 110px Arial";
			ctx.fillText("VICTORY", 140, 250);
			ctx.font = "bold 40px Arial";
			ctx.fillText("Score: " + totalScore, 270, 305);
			if(forFlash){
				ctx.font = "bold 30px Arial";
				ctx.fillText("Press \"enter\" to play again!", 187, 400);
			}
			break;
		case "lose":
			timer += elapsedTime;
			if (timer > MS_PER_FRAME * 2) {
				timer = 0;
				if(forFlash) forFlash = false;
				else forFlash = true;
			}
			ctx.drawImage(backdrop,0,0);
			ctx.fillStyle = "black";
			ctx.font = "bold 100px Arial";
			ctx.fillText("Frogger", 190, 100);
			ctx.font = "bold 110px Arial";
			ctx.fillText("GAME OVER", 45, 250);
			ctx.font = "bold 40px Arial";
			ctx.fillText("Score: " + totalScore, 270, 305);
			if(forFlash){
				ctx.font = "bold 30px Arial";
				ctx.fillText("Press \"enter\" to try again.", 200, 400);
			}
			for (i = 0; i < car.length; i++) {
				car[i].resetSpeed();
			}
			for (i = 0; i < log.length; i++) {
				log[i].resetSpeed();
			}
			break;
	}
}

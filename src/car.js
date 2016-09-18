"use strict";

const MS_PER_FRAME = 1000 / 8;

/**
 * @module exports the Player class
 */
module.exports = exports = Car;

/**
 * @constructor Player
 * Creates a new player object
 * @param {Postition} position object specifying an x and y
 */
function Car(position) {
    this.x = position.x;
    this.y = position.y;
	this.speed = 1;
    this.direction = position.direction;
    this.width = 64;
    this.height = 128;
    this.spritesheet = new Image();
    if (this.direction == 0) this.spritesheet.src = encodeURI('assets/cars_racer.png');
    else this.spritesheet.src = encodeURI('assets/cars_racer_flipped.png');
    this.image = Math.floor(((Math.random() * 10000) + 1)) % 4;
}

Car.prototype.upSpeed = function(){
	this.speed++;
}

Car.prototype.resetSpeed = function(){
	this.speed = 1;
}

/**
 * @function updates the player object
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 */
Car.prototype.update = function (time) {
    switch (this.direction) {
        case 0:
            this.y -= this.speed;
            if (this.y < -400) {
                this.y = 680;
                Math.floor(((Math.random() * 10000) + 1)) % 4;
            }
            break
        case 1:
            this.y += this.speed;
            if (this.y > 880) {
                this.y = -200;
                this.image = Math.floor(((Math.random() * 10000) + 1)) % 4;
            }
            break;
    }

}

/**
 * @function renders the player into the provided context
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 * {CanvasRenderingContext2D} ctx the context to render into
 */
Car.prototype.render = function (time, ctx, part) {
    switch(part){
	case "front":
		ctx.drawImage(
			// image
			this.spritesheet,
			// source rectangle
			this.image * 390, 0, 220, 221,
			// destination rectangle
			this.x, this.y, this.width, (this.height/2)
		);
		break;
	case "back": 
		ctx.drawImage(
			// image
			this.spritesheet,
			// source rectangle
			this.image * 390, 221, 220, 221,
			// destination rectangle
			this.x, this.y+ 64, this.width, (this.height/2)
		);
	}
}

"use strict";

const MS_PER_FRAME = 1000;

/**
 * @module exports the Player class
 */
module.exports = exports = Log;

/**
 * @constructor Player
 * Creates a new player object
 * @param {Postition} position object specifying an x and y
 */
function Log(position) {
    this.x = position.x;
    this.y = position.y;
	this.speed = 1;
    this.direction = position.direction;
    this.width = 64;
    this.height = 128;
    this.spritesheet = new Image();
    this.spritesheet.src = encodeURI('assets/log.png');
    this.image = Math.floor(((Math.random() * 10000) + 1)) % 4;
	this.timer = 0;
	this.state = "float";
	this.sinking = "down";
}

Log.prototype.upSpeed = function(){
	this.speed++;
}

Log.prototype.getState = function(){
	return this.state;
}

Log.prototype.getSpeed = function(){
	return this.speed;
}

Log.prototype.resetSpeed = function(){
	this.speed = 1;
}

/**
 * @function updates the player object
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 */
Log.prototype.update = function (time) {
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
		this.timer += time;
		if (this.timer > MS_PER_FRAME) {
			this.timer = 0;
			switch(this.state){
				case "float":
					if(Math.floor(((Math.random() * 10000) + 1)) % 30 == 1) this.state = "sink";
					break;
				case "mid":
					if(this.sinking == "up"){
						this.state = "float";
						this.sinking == "down";
					}
					else {
						this.state = "sink";
						this.sinking == "up";
					}
				case "sink":
					if(Math.floor(((Math.random() * 10000) + 1)) % 15 == 1) this.state = "mid";
			}
		}
}

/**
 * @function renders the player into the provided context
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 * {CanvasRenderingContext2D} ctx the context to render into
 */
Log.prototype.render = function (time, ctx) {
	switch(this.state){
		case "float": 
			ctx.drawImage(
				// image
				this.spritesheet,
				// source rectangle
				0, 0, 64, 128,
				// destination rectangle
				this.x, this.y, this.width, this.height
			);
			break;
		case "mid":
			ctx.drawImage(
				// image
				this.spritesheet,
				// source rectangle
				64, 0, 64, 128,
				// destination rectangle
				this.x, this.y, this.width, this.height
			);
			break;
	}
}

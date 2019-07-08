function Player(game, x, y, key, frame,wallLayer) {
	Phaser.Sprite.call(this,game,x,y,key,frame);
	this.anchor.set(0.5);
	this.wallLayer = wallLayer;

	game.physics.enable(this);
	this.body.bounce.y = 0.2;
	this.body.gravity.y = 350;
	this.body.collideWorldBounds = true;

	//Player's left and right animation
	this.animations.add('left', [0, 1, 2, 3], 10, true);
	this.animations.add('right', [5, 6, 7, 8], 10, true);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(){

	//Check the physics between player and platform
	game.physics.arcade.collide(this, this.wallLayer);


	//Reset the players velocity (movement)
	this.body.velocity.x = 0;

	if(cursors.left.isDown){

		//Move to left
		this.body.velocity.x = -150;
		this.animations.play('left');
	}else if(cursors.right.isDown){

		//Move to right
		this.body.velocity.x = 150;
		this.animations.play('right');
	}else{

		//Stand Still
		this.animations.stop();
		this.frame = 4;
	}

	//Allow the player to jump if they are on the ground
	if(cursors.up.isDown && this.body.blocked.down){
		this.body.velocity.y = -350;
	}

	//Set a win condition to the game
	if(score == 150){
		//After collect all stars, jump to game over state
		game.state.start('GameOver');
	}
}
class Player extends Sprite {
	init() {
		this.setImage(Videogame.image("car1"));
		this.addTag("player");
		this.addTag("enemyTarget");
		this.controller = Videogame.getController();
		this.layerIndex = 1000;
		this.setCenterX(this.scene.centerX);
		this.setSolid();
        
		this.iron = 0;
		
		this.canPlaceTurret = false;
	}

	update() {
		if (this.controller.keyDown(Command.UP) && this.top > 0) {
			this.y -= SPEED;
			this.setImage(Videogame.image("car1"));
		} else if (this.controller.keyDown(Command.DOWN) && this.bottom < this.scene.bottom) {
			this.y += SPEED;
			this.setImage(Videogame.image("car5"));
		} else if (this.controller.keyDown(Command.LEFT) && this.left > 0) {
			this.x -= SPEED;
			this.setImage(Videogame.image("car7"));
		 } else if (this.controller.keyDown(Command.RIGHT) && this.right < this.scene.right) {
			this.x += SPEED;
			this.setImage(Videogame.image("car3"));
		}

		if (this.controller.keyDown(Command.A)) {
			this.canPlaceTurret = true;
			this.scene.getObjectsWithTag("turret").forEach(element => {
				if(this.hasCollision(element)) {
					this.canPlaceTurret = false;
				}
			});
			this.placeTurret();
		}
	}

	onCollision(sprite) {
		if (sprite.hasTag("resource") && sprite.hasTag("iron")) {
            this.collectIron();
		}
	}
	
    collectIron() {
        // Play sounds
        // Play animation
        this.iron += 1;
	}
	
	placeTurret() {
		if(this.canPlaceTurret && this.iron >= 100) {
			this.iron -= 100;
			const playerBaseSprite = new Turret().setCenter(this.center);
			this.scene.add(playerBaseSprite);
		}
	}

	// die() {
	// 	Videogame.play("deathSound");
	// 	--game.lives;
	// 	Videogame.save(game);
	// 	this.expire();
	// 	this.scene.add(new Feather().setAccelerationX(0.1).setLeft(this.left).setTop(this.top));
	// 	this.scene.add(new Feather().setAccelerationX(-0.1).setRight(this.right).setTop(this.top));
	// 	this.scene.add(new Feather().setAccelerationX(0.1).setRight(this.right).setTop(this.top));
	// 	this.scene.add(new Feather().setAccelerationX(-0.1).setLeft(this.left).setTop(this.top));
	// }
}

class PlayerBase extends Sprite {
	init() {
		this.setImage(Videogame.image("playerBase"));
		this.addTag("playerBase");
		this.x = 1280-256;
		this.y = 720-256;
		this.layerIndex = 1500;
		this.hitPoints = 100;
		this.setSolid();
	}

	takeDamage() {
        this.hitPoints -= 1;

        if (this.hitPoints <= 0) {
            this.expire();
        }
    }
}
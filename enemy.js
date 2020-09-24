class Enemy extends Sprite {
	init() {
		this.setImage(Videogame.image("enemy1"));
		this.addTag("enemy");
		this.layerIndex = 2000;
        this.setSolid();
        this.hitBox = new Rect().setWidth(280).setHeight(280);
        this.hitBox.setCenter(this.center);
        this.fireRate = 100;
        this.fireRateTick = 0;
        
        this.hitPoints = 3;

        this.speed = 3;
        
        this.goingDown = true;
        this.goingRight = false;

        this.stepsToX = this.x;

        this.applyLevel(this, 0);
    }
    
    update() {
        this.layerIndex = this.bottom + 1000;
        this.hitBox.setCenter(this.center);
        if (this.tick > this.delay) {
         
            if (this.goingDown == true) {
                this.y += this.speed;
            } else {
                this.y -= this.speed;
            }

            if (this.x < this.stepsToX) {
                this.goingRight = true;
                this.x += this.speed;
            } else {
                this.goingRight = false;
            }
            
            if (this.goingRight == false) {
                if (this.y >= this.scene.bottom - this.height) {
                    this.goingDown = false;
                    this.goingRight = true;
                    this.stepsToX = this.x + 64;
                } else if (this.y <= this.scene.top) {
                    this.goingDown = true;
                    this.goingRight = true;
                    this.stepsToX = this.x + 64;
                }
            }
            

            if (this.fireRateTick == 0) {
                this.scene.getObjectsWithTag("turret").forEach(element => {
                    if(this.fireRateTick == 0 && element.hasCollision(this.hitBox)) {
                        this.fireRateTick++;
                        this.fire(element);
                    }
                });
            } else {
                this.fireRateTick++;
                if (this.fireRateTick >= this.fireRate) {
                    this.fireRateTick = 0;
                }
            }
       }
    }

    onCollision(sprite) {
		if (sprite.hasTag("playerBase")) {
            this.expire();
            sprite.takeDamage();
		}
	}

    takeDamage() {
        this.hitPoints -= 1;

        if (this.hitPoints <= 0) {
            this.expire();
        }
    }

    applyLevel(sprite, level) {
        sprite.hitPoints += level;
        
        switch (level) {
            case 4:
            case 8:
            case 10:
            case 15:
            case 20:
            case 25:
            case 30:
                sprite.speed++;
        }

    }
    
    fire(sprite) {
        var bullet = new EnemyBullet().setCenter(this.center);
        this.scene.add(bullet);

        var angleDeg = Math.atan2(sprite.y - this.y, sprite.x - this.x) * 180 / Math.PI;
        bullet.setSpeedToAngle(30, angleDeg);
    }
}

class EnemyBullet extends Sprite {
	init() {
		this.setImage(Videogame.image("iron"));
		this.addTag("enemyBullet");
		this.layerIndex = 1;
        this.setSolid();
    }

    update() {
        if(this.tick > 20) {
            this.expire();
        }
    }

    onCollision(sprite) {
		if (sprite.hasTag("turret")) {
            sprite.takeDamage();
            this.expire();
		}
	}
}
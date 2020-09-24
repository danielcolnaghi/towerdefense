class Turret extends Sprite {
	init() {
		this.setImage(Videogame.image("turretSimple1"));
        this.addTag("turret");
        this.addTag("enemyTarget");
        this.setSolid();
        this.hitBox = new Rect().setWidth(300).setHeight(300);
        this.hitBox.setCenter(this.center);
        this.fireRate = 100;
        this.fireRateTick = 0;

        this.hitPoints = 100;
    }
    
    update() {
        this.layerIndex = this.bottom;
        if (this.fireRateTick == 0) {
            this.scene.getObjectsWithTag("enemy").forEach(element => {
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

    takeDamage() {
        this.hitPoints -= 1;

        if (this.hitPoints <= 0) {
            this.expire();
        }
    }
    
    fire(sprite) {
        var bullet = new Bullet().setCenter(this.center);
        this.scene.add(bullet);

        var angleDeg = Math.atan2(sprite.y - this.y, sprite.x - this.x) * 180 / Math.PI;
        bullet.setSpeedToAngle(30, angleDeg);
    }
}

class Bullet extends Sprite {
	init() {
		this.setImage(Videogame.image("bullet1"));
		this.addTag("bullet");
		this.layerIndex = 1;
        this.setSolid();
    }

    update() {
        if(this.tick > 20) {
            this.expire();
        }
    }

    onCollision(sprite) {
		if (sprite.hasTag("enemy")) {
            sprite.takeDamage();
            this.expire();
		}
	}
}
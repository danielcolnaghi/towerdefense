class IronResource extends Sprite {
	init() {
        this.addTag("resource");
        this.addTag("iron");
        this.setImage(Videogame.image("iron"));
        this.setSolid();
        this.setTop(Videogame.random(400));
		this.setLeft(this.scene.width - this.width - Videogame.random(500));
        this.ironStorage = 100;
    }

	onCollision(sprite) {
		if (sprite.hasTag("player")) {
            this.removeIron();
            
            if (this.ironStorage <= 0) {
                this.expire();
                this.scene.add(new IronResource());
            }
		}
    }

    removeIron() {
        // Play sounds
        // Play animation
        this.ironStorage -= 1;
    }
}
class TitleScene extends Scene {
	init() {
		this.color = Color.Black;
		this.controller = Videogame.getController();
		this.transition = new BaseTransition();

		const grassSprite = new Sprite().setImage("grass").setCenter(this.center);
		this.add(grassSprite);

		const playerBaseSprite = new Sprite().setImage("playerBase").setCenter(this.center);
		playerBaseSprite.y += 200;
		this.add(playerBaseSprite);

		var label = new TextSprite();
		label.text = "TOWER DEFENSE";
		label.fontColor = Color.White;
		label.fontSize = 64
		label.height = 100;
		label.width = 400;
		label.setCenter(this.center)
		label.bottom -= 200
		this.add(label);
	}

	get next() {
		Videogame.clear();
		return new GameScene();
	}

	update() {
		if (this.controller.keyPush(Command.START)) {
			this.expire();
		}
	}
}

class GameOverScene extends Scene {
	init() {
		this.color = Color.Black;
		this.controller = Videogame.getController();
		this.transition = new BaseTransition();

		var label = new TextSprite();
		label.text = "GAME OVER";
		label.fontColor = Color.White;
		label.fontSize = 64
		label.height = 100;
		label.width = 400;
		label.setCenter(this.center)
		this.add(label);
	}

	get next() {
		Videogame.clear();
		return new TitleScene();
	}

	update() {
		if (this.controller.keyPush(Command.START) || this.tick >= 500) {
			this.expire();
		}
	}
}
class GameScene extends Scene {
	init() {
		this.color = Color.Black;
		this.controller = Videogame.getController();
		this.nextWaveEachTick = 1000;
		this.nextWaveTick = 0;
		this.waveLevel = 0;
		this.baseHitPoints = 100;
        
        var label = new TextSprite();
		label.text = "Game Scene";
		label.fontColor = Color.White;
		label.height = 160;
		label.width = 160;
		label.setCenter(this.center)
		this.add(label);

        const grassSprite = Videogame.sprite().setImage("grass").setCenter(this.center);
		this.add(grassSprite);

		this.playerBase = new PlayerBase();
		this.add(this.playerBase);

		for (let index = 0; index < 10; index++) {
			var ironSprite = new IronResource();
        	this.add(ironSprite);
		}
		
        this.labelIron = new TextSprite();
		this.labelIron.text = "Iron";
		this.labelIron.fontColor = Color.White;
		this.labelIron.height = 16;
		this.labelIron.width = 160;
		this.labelIron.setTop(16);
		this.labelIron.setLeft(32);
        this.add(this.labelIron);
        
		this.player = new Player();
		this.player.setCenter(this.center);
		this.add(this.player);

		this.releaseTheWave();
	}

	get next() {
		Videogame.clear();
		return new GameOverScene();
	}

	update() {
		this.nextWaveTick++;
		this.labelIron.text = "Iron " + this.player.iron + " Wave " + this.waveLevel + " Base HP " + this.playerBase.hitPoints;
		
		if (this.nextWaveTick >= this.nextWaveEachTick) {
			this.nextWaveTick = 0;
			this.releaseTheWave();
			this.waveLevel++;
		}
		if (this.playerBase.hitPoints <= 0) {
			this.expire();
		}
	}

	releaseTheWave() {
		for (let index = 1; index < 10; index++) {
			var enemy = new Enemy();
			this.add(enemy);
			enemy.delay = index * 10;
			enemy.applyLevel(enemy, this.waveLevel);
		}
	}
}
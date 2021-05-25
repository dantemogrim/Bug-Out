'use strict';

class Sidebars {
	constructor(game) {
		this.game = game;
	}

	preload() {
		this.game.load.image('sidebar', '/sidebar.png');
		this.game.load.image('topBar', '/fly.png');
	}

	create() {
		this.object = this.leftSidebar = this.game.physics.add.group({
			key: 'sidebar',
			repeat: 6,
			setXY: { x: 15, y: 100, stepY: 70 },
			setScale: { x: 0.4, y: 0.4 },
		});

		this.object = this.rightSidebar = this.game.physics.add.group({
			key: 'sidebar',
			repeat: 6,
			setXY: { x: 785, y: 100, stepY: 70 },
			setScale: { x: 0.4, y: 0.4 },
		});

		this.object = this.topSidebar = this.game.physics.add.group({
			key: 'topBar',
			repeat: 6,
			setXY: { x: 200, y: 10, stepX: 70 },
			setScale: { x: 0.7, y: 0.7 },
		});
	}
}

export default Sidebars;

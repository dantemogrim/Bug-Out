'use strict';

class Sidebars {
	constructor(game) {
		this.game = game;
	}

	preload() {
		this.game.load.image('sidebar', '/sidebar.png');
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
	}
}

export default Sidebars;

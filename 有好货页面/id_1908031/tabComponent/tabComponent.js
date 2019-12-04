const MENU_SYMBOL = Symbol('MENU');

class Tab {
	constructor(config) {
		this.contanier = config.contanier;
		this[MENU_SYMBOL] = Object.create(null);
		this.created();
	}

	get menus() {
		return this[MENU_SYMBOL].menus;
	}

	set menus(value) {
		return this[MENU_SYMBOL].menus = value;
	}

	created() {
		const root = document.createElement('ul');
		const context = document.createElement('div');
		context.className = 'context';
		for (let menu of this.menus) {
			const menuBox = document.createElement('li');
			const contextBox = document.createElement('div');
			menuBox.style.float = 'left';
			menuBox.style.paddingRight = '10px';
			menuBox.innerText = menu.text;
			contextBox.innerText = menu.context;
			if (menu.active) {
				menu.style.color = 'red';
				contextBox.style.display = 'block';
			} else {
				contextBox.style.display = 'none';
			}
			root.appendChild(menuBox);
		}
	}
}

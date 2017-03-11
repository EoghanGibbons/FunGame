/**
 * Menu class, built from a json file
 * @constructor
 * @param {string} currentMenu - the menu we should draw first
 */
ProjBel.Menu = function () {
    'use strict';
    /**
     * @type {string}
     */
    this.currentMenu = "";
    this.buttons = [];
};

ProjBel.Menu.prototype = {
    /**
     * Function called when states are started with parameters
     * @example
     * // Starts Menu, clears world, clears cache (must clear world to do this), passes parameter of 2
     * this.state.start('Menu', true, true, 2);
     */
    init: function (menu) {
        'use strict';
        this.currentMenu = menu || "mainMenu";
    },
    
	/**
	 * Creates The Menu
	 */
	create: function () {
		'use strict';
        var menuObject = this.cache.getJSON(this.currentMenu);
        this.add.image(0, 0, menuObject.background);
        menuObject.buttons.forEach(function (button) {
            //x position, y position, texture key, function to call on click,  context to call the function in (ie. what the this is), overFrame, out frame, downFrame
            this.buttons[button.command] = this.add.button(button.xPos, button.yPos, 'button', this.callButton, this.buttons[button.command], 2, 1, 0);
            this.buttons[button.command].properties = button;
            this.buttons[button.command].context = this;
            this.buttons[button.command].text = this.add.text(button.xPos, button.yPos, button.text, { fill: '#ffffff' });
            this.buttons[button.command].fixedToCamera = true;
        }, this);
	},
    
    callButton: function () {
        'use strict';
        ProjBel.Commands[this.properties.command](this.context, this.properties.property);
    }
};
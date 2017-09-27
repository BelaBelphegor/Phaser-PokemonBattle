class Battle extends Phaser.State
{
    preload()
    {   
        game.load.json('dratini_json', './assets/prefabs/dratini.json')
        game.load.json('electabuzz_json', './assets/prefabs/electabuzz.json')
    }
    create()
    {
        // - Une image en background.
        // - Une interface
        // - Deux pokémons
        //      1. Crawl les stats des pokémons / attaques.
        //      2. Utiliser Pokemon.API w8 and see.

        // Fake data for working state
        this.game.party = [];

        // Game logic.
        this.elasped_turn = 0;
        this.current_turn = 1;
        this.first_message_flag = false;

        // Background
        this.background = game.add.sprite(0, -90, 'grass_background');

        // UI
        this.battle_menu = new BattleMenu(this);

        // Pokemon
        this.pokemon_red = new Pokemon(this.game, 93, 178, 'dratini_back', game.cache.getJSON('dratini_json'));
        this.pokemon_red.anchor.set(0.5, 0.5);

        this.pokemon_blue = new Pokemon(this.game, 262, 27, 'electabuzz_front', game.cache.getJSON('electabuzz_json'));

        // Inputs
        this.arrow_down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.arrow_up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.button_yes = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.button_no = game.input.keyboard.addKey(Phaser.Keyboard.X);
        this.arrow_down.onDown.add(this.battle_menu.goDown, this.battle_menu);
        this.arrow_up.onDown.add(this.battle_menu.goUp, this.battle_menu);
        this.button_no.onDown.add(this.battle_menu.goBack, this.battle_menu);
        this.button_yes.onDown.add(this.onAction, this);
    }

    update()
    {
        // /!\ Important : externalize this code on :
        // BattleMenu.js
        // BattleMenuItem.js
        // Don't use cursor ! Use let key = game.input.keyboard.addKey(Phaser.Keyboard.UP)
        // key.onDown.add(function() {}, this);
        if (!this.first_message_flag)
        {
            this.battle_menu.showDialog("A wild " + (name => name.charAt(0).toUpperCase() + name.slice(1))(this.pokemon_blue.name) + " appear !");
            this.first_message_flag = true;
        }
    }

    onAction()
    {
        this.battle_menu.validate();
        if (this.battle_menu.current_state == EBattleMenuState.SHOW_MENU && this.battle_menu.current_menu_item == 3)
            this.state.start('Gameover');
        // End of turn
    }
}   
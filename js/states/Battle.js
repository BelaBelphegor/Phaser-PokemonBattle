class Battle extends Phaser.State {
    preload() {
        game.load.json('dratini_json', './assets/prefabs/dratini.json')
        game.load.json('electabuzz_json', './assets/prefabs/electabuzz.json')
        game.load.json('moves', './assets/prefabs/moves.json');
        game.load.json('species', './assets/prefabs/species.json');
    }
    create() {
        // - Une image en background.
        // - Une interface
        // - Deux pokémons
        //      1. Crawl les stats des pokémons / attaques.
        //      2. Utiliser Pokemon.API w8 and see.

        // Background
        this.background = game.add.sprite(0, -90, 'grass_background');

        // Fake data for working state
        this.game.party = [];
        this.game.database = {};
        this.game.database.moves = game.cache.getJSON('moves');
        this.game.database.moves.getMoveById = function (moves_id) {
            return game.database.moves.find(x => x.id == moves_id);
        };
        this.game.database.species = game.cache.getJSON('species');
        this.game.database.species.getSpeciesById = function (species_id){
          return game.database.species.find(x => x.id == species_id);
        };
        this.game.party[0] = new Pokemon(this.game, 93, 178, 'dratini_back', game.cache.getJSON('dratini_json'));
        this.game.encounter = {wild: null };
        this.game.encounter.wild = new Pokemon(this.game, 300, 63, 'electabuzz_front', game.cache.getJSON('electabuzz_json'));
        // Game logic.
        this.elasped_turn = 0;
        this.current_turn = 1;
        this.first_message_flag = false;

        // UI
        this.battle_menu = new BattleMenu(this.game);

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

    update() {
        // /!\ Important : externalize this code on :
        // BattleMenu.js
        // BattleMenuItem.js
        // Don't use cursor ! Use let key = game.input.keyboard.addKey(Phaser.Keyboard.UP)
        // key.onDown.add(function() {}, this);
        if (!this.first_message_flag) {
            this.battle_menu.showDialog("A wild " + this.game.encounter.wild.nickname + " appear !");
            this.first_message_flag = true;
        }
    }

    onAction() {
        // Validate flee button.
        if (this.battle_menu.current_state == EBattleMenuState.SHOW_MENU && this.battle_menu.current_menu_item == 3)
            this.state.start('Gameover');

        // Need to only set move and paste other logic code.
        if (this.battle_menu.current_state == EBattleMenuState.SHOW_MOVES) {
            // Move this logic on Battle.js
            let move = game.database.moves.getMoveById(game.party[0].attack.moves[this.battle_menu.current_menu_item]);
            this.battle_menu.showDialog(game.party[0].nickname + " use " +
                move.name +
                ' !');
            this.game.encounter.wild.current_hp -= game.party[0].damage(move.base_power,
                game.party[0].stats.attack,
                game.encounter.wild.stats.defense);
            if (game.encounter.wild.current_hp > 0)
            {
              // Ennemy move
              move = game.database.moves.getMoveById(game.encounter.wild.attack.moves[0]);
              this.battle_menu.showDialog(game.encounter.wild.specie.name + " use " +
                  move.name +
                  ' !');
              this.game.party[0].current_hp -= game.party[0].damage(move.base_power,
              game.encounter.wild.stats.special_attack, game.party[0].stats.special_defense)
            }
            // Loose condition
        }
        // If ennemy died
        if (this.game.encounter.wild.current_hp <= 0)
        {
          this.game.encounter.wild.destroy();
          this.game.encounter.wild = new Pokemon(this.game, 300, 63, 'dratini_front', game.cache.getJSON('dratini_json'));
          console.log(this.game.encounter.wild);
        }
        if (this.game.party[0].current_hp <= 0)
          this.state.start('Gameover');
        this.current_turn++;
        this.battle_menu.validate();
        // End of turn
    }
}

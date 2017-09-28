const EBattleMenuState =
    {
        SHOW_MENU: 0,
        SHOW_MOVES: 1,
    }

class BattleMenu {
    constructor(game) {
        this.game = game;
        this.current_menu_item = 0;
        this.current_state = EBattleMenuState.SHOW_MENU;
        this.create();
    }

    create() {
        let label_css = { font: "12px Arial", fill: "#000" };
        let selected_css = { font: "12px Arial", fill: "#F00" };
        this.msg_box = game.add.sprite(200, 250, 'fightbox');
        this.msg_box.anchor.set(0.5, 0.5);
        this.msg_box.scale.set(0.695, 0.65);
        this.msg_box_text = game.add.text(20, 225, "", { font: "14px Arial", fill: "#000", wordWrap: true, wordWrapWidth: 175 });
        this.label = [
            { 'text': game.add.text(245, 230, "Fight", selected_css), 'selected': true },
            { 'text': game.add.text(315, 230, "Bag", label_css), 'selected': false },
            { 'text': game.add.text(245, 255, "Team", label_css), 'selected': false },
            { 'text': game.add.text(315, 255, "Run", label_css), 'selected': false }
        ];

        // Interface Pokemon
    }

    goUp() {
        for (let i = 0; i < this.label.length; i++) {
            if (this.current_menu_item == i) {
                let next = ((i + 2) >= this.label.length) ? ((this.label.length - 1) % i) : i + 2;
                this.label[i].selected = false;
                this.label[i].text.setStyle({ font: "12px Arial", fill: "#000" });
                this.label[next].selected = true;
                this.label[next].text.setStyle({ font: "13px Arial", fill: "#F00" });
                this.current_menu_item = next;
                return;
            }
        }
    }

    goDown() {
        for (let i = 0; i < this.label.length; i++) {
            if (this.current_menu_item == i) {
                let next = ((i - 1) <= 0) ? 0 : i - 1;
                this.label[i].selected = false;
                this.label[i].text.setStyle({ font: "12px Arial", fill: "#000" });
                this.label[next].selected = true;
                this.label[next].text.setStyle({ font: "13px Arial", fill: "#F00" });
                this.current_menu_item = next;
            }
        }
    }

    goBack() {
        // Think to do il8n here.
        if (this.current_state == EBattleMenuState.SHOW_MOVES) {
            // Just rewrite this crap (later).
            this.label[0].text.setText("Fight");
            this.label[1].text.setText("Bag");
            this.label[2].text.setText("Team");
            this.label[3].text.setText("Run");
            this.current_state = EBattleMenuState.SHOW_MENU;
        }
    }

    validate() {
        // Rewrite this crap too.   
        if (this.current_state == EBattleMenuState.SHOW_MENU) {
            switch (this.current_menu_item) {
                case 0:
                    for (let i = 0; i < this.label.length; i++) {
                        if (this.game.party[0].attack.moves[i] === 0)
                            this.label[i].text.setText('-');
                        else
                            this.label[i].text.setText(this.game.database.moves.getMoveById(this.game.party[0].attack.moves[i]).name);
                    }
                    this.current_state = EBattleMenuState.SHOW_MOVES;
                    break;
                case 1:
                    this.showDialog("Not implemented yet.");
                    break;
                case 2:
                    this.showDialog("Not implemented yet.");
                    break;
                case 3:
                    this.showDialog("You fled the battle...");
                    break;
            }
        }
        else if (this.current_state == EBattleMenuState.SHOW_MOVES) {
            // Move this logic on Battle.js
            let move = this.game.database.moves.getMoveById(this.game.party[0].attack.moves[this.current_menu_item]);
            this.showDialog(this.game.party[0].nickname + " use " +
                move.name +
                ' !');
            this.game.party[0].damage(move.base_power,
                this.game.party[0].iv.attack,
                this.game.encounter.wild.iv.defense);
        }
    }

    showDialog(msg) {
        if (msg !== undefined)
            this.msg_box_text.setText(msg);
    }
}
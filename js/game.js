class Game extends Phaser.Game
{
    constructor()
    {   
        super(400, 300, Phaser.AUTO, 'content', null);
        this.scaleRatio = window.devicePixelRatio / 3;
        this.state.add('Boot', Boot, false);
        this.state.add('Preload', Preload, false);
        this.state.add('Battle', Battle, false);
        this.state.add('Gameover', Gameover, false);
        this.state.start('Boot');
    }
}

window.onload = function()
{
    window.game = new Game();
}
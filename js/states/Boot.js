class Boot extends Phaser.State
{
    create()
    {
        this.game.stage.backgroundColor = '#fff';
       //scaling options
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //have the game centered horizontally
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setMinMax(320, 240, 640, 480);
        //physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 0;
        this.state.start('Preload');
    }
}
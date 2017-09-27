class Gameover extends Phaser.State
{
    create()
    {
        game.stage.backgroundColor = '#000';
        game.add.text(20, 100, "You are a victim and have just been racked $ 578. The last salary your mother had set aside for your adventure... Once again you have proved to her that she should not place her trust in you. Game over.", {font: "14px Arial", fill: "#fff", wordWrap: true, wordWrapWidth: 370});
    }
}
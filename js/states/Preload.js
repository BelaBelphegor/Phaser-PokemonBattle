class Preload extends Phaser.State
{
    preload()
    {
       /* console.log("Enter on preload !");
        this.load.tilemap('level', './assets/level.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tileset', './assets/open_tileset.png');
        this.load.spritesheet('player', './assets/characters/mage_f.png', 24, 33, 11);
        this.load.spritesheet('dagger', './assets/characters/weapon/dagger.png', 64, 64, 4);
        this.load.spritesheet('ydraflui', './assets/characters/ydraflui.png', 48, 48, 11);*/
        this.load.image('dialoguebox', './assets/ui/dialoguebox.png');
        this.load.image('fightbox', './assets/ui/fightbox.png');
        this.load.image('dratini_back', './assets/pokemon/dratini_back.png');
        this.load.image('dratini_front', './assets/pokemon/dratini_front.png');
        this.load.image('electabuzz_back', './assets/pokemon/electabuzz_back.png');
        this.load.image('electabuzz_front', './assets/pokemon/electabuzz_front.png');
        this.load.image('grass_background', './assets/background/grass_background.png');
    }

    create()
    {
        this.state.start('Battle');
    }
}
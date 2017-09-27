const EPlayer_direction = 
{
    TOP: 0,
    RIGHT: 1,
    LEFT: 2,
    DOWN: 3,
}

class Player extends Phaser.Sprite
{
    constructor()
    {
        this.strength = 12;
        this.agility = 14;
        this.intelligence = 18;
        this.healthpoint = 7;
        this.direction = EPlayer_direction.DOWN;
        this.weapon = new Weapon();
    }
}
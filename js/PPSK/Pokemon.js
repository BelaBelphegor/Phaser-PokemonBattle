class Pokemon extends Phaser.Sprite
{
    constructor(game, x, y, sprite_name, object)
    {
        super(game, x, y, sprite_name);
        for (let keys in object)
            this[keys] = object[keys];
        this.anchor.set(0.5, 0.5);
        this.level = 5;
        this.game.add.existing(this);
    }

    damage(power, attack, defense)
    {
        let damage = (2 * this.level / 5 + 2) * power * attack / defense / 50 + 2;
        // Need to add more modifier. Only use RANDOM modifier.
        let modifier = (Math.random() * 1.0) + 0.80;

        damage = Math.round(damage * modifier);
        console.log(damage);
        return (damage);
    }

    experienceToNextLevel(level)
    {
        // See https://bulbapedia.bulbagarden.net/wiki/Experience#Experience_at_each_level
        // Fast :
        return ((4 * (level ^ 3)) / 5);
    }
}
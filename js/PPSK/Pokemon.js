class Pokemon extends Phaser.Sprite
{
    constructor(game, x, y, sprite_name, object)
    {
        super(game, x, y, sprite_name);
        for (let keys in object)
            this[keys] = object[keys];
        this.anchor.set(0.5, 0.5);
        this.game.add.existing(this);
        this.specie = game.database.species.getSpeciesById(this.growth.species);
        this.stats =
        {
          "hp": this.calculate_healthpoint(),
          "attack": this.calculate_stat('attack'),
          "defense": this.calculate_stat('defense'),
          "speed": this.calculate_stat('speed'),
          "special_attack": this.calculate_stat('special_attack'),
          "special_defense": this.calculate_stat('special_defense')
        }
        this.current_hp = this.stats.hp;
    }

    calculate_healthpoint()
    {
      let healthpoint = ((2 * this.specie.base_stats.hp + this.iv.hp +
        (this.ev.hp / 4)) * this.level) / 100 + this.level + 10;
      return (Math.floor(healthpoint));
    }

    calculate_stat(stat_name)
    {
      // Ajouter * nature modifier a la fin.
      let stat = (2 * this.specie.base_stats[stat_name] + this.iv[stat_name] + this.ev[stat_name] / 4)
      * this.level / 100 + 5;
      return (Math.floor(stat));
    }
    damage(power, attack, defense)
    {
        let damage = (2 * this.level / 5 + 2) * power * attack / defense / 50 + 2;
        // Need to add more modifier. Only use RANDOM modifier.
        let modifier = (Math.random() * 1.0) + 0.80;

        damage = Math.round(damage * modifier);
        return (damage);
    }

    experienceToNextLevel(level)
    {
        // See https://bulbapedia.bulbagarden.net/wiki/Experience#Experience_at_each_level
        // Fast :
        return ((4 * (level ^ 3)) / 5);
    }
}

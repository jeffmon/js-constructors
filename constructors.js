function Spell(name, cost, description){
  this.name = name;
  this.cost = cost;
  this.description = description;
}

Spell.prototype.getDetails = function(){
  return this.name + "|" + this.cost + "|" + " " + this.description + ".";
};

function DamageSpell(name, cost, damage, description){
  this.damage = damage;
  Spell.call(this, name, cost, description);
}

DamageSpell.prototype = Object.create(Spell.prototype, {
  constructor: DamageSpell
});

function Spellcaster(name, health, mana){
  this.name = name;
  this.health = health;
  this.mana = mana;
  this.isAlive = true;
}

Spellcaster.prototype.inflictDamage = function(damage){
  if(this !== undefined){
    this.health -= damage;
    if(this.health <= 0){
      this.health = 0;
      this.isAlive = false;
    }
  }

};

Spellcaster.prototype.spendMana = function(cost){
  if(cost <= this.mana){
    this.mana -= cost;
    return true;
  } else{
    return false;
  }
};

Spellcaster.prototype.invoke = function(whichSpell, target){
  if(whichSpell instanceof Spell === false || whichSpell === null){
    return false;
  }
  else{
    if(this.mana >= whichSpell.cost && whichSpell instanceof DamageSpell){
      if(target === null || target === undefined){
        return false;
      }else{
        target.inflictDamage(whichSpell.damage);
        this.spendMana(whichSpell.cost);
        return true;
      }

    }else if(this.mana >= whichSpell.cost){
      this.spendMana(whichSpell.cost);
      return true;
    }else if(this.mana < whichSpell.cost){
      return false;
    }
  }
};

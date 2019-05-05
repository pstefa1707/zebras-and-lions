class creature {
  constructor() {
    this.health = MAX_HEALTH / 5;
    var rand = random(0,1000);
    if (rand > 100) {
      this.type = 0;
    } else if (rand > 50) {
      this.type = 1;
      zCount ++;
    } else {
      this.type = 2;
      lCount ++;
    }
  }
  
  getHealth() {
    return this.health;
  }
  
  getColor() {
    if (this.type == 0 || this.health == 0) {
      return color(0);
    } else {      
      switch (this.type) {
        case 1:
          return color(255);
        case 2:
          return color(255, 0, 0);
        default:
          return color(0);
      }
    }
  }
  
  heal(amount) {
    this.health += amount;
    if (this.health > MAX_HEALTH) {
      this.setHealth(MAX_HEALTH);
    }
  }
  
  update() {
    switch (this.type) {
      case 1:
        this.heal(1);
        break
      case 2:
        this.heal(-1);
        break;
      default:
        break;
    }
  }
  
  reproduce(otherCreature) {
    otherCreature.health = this.health;
    otherCreature.type = 1;
  }
  
  move(otherCreature) {
    otherCreature.health = this.health;
    otherCreature.type = this.type;
    this.setType(0);
    this.setHealth(20);
  }
  
  getType() {
    return this.type;
  }
  
  setType(type) {
    this.type = type;
  }
  
  setHealth(value) {
    this.health = value;
  }
}
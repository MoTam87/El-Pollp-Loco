class Level {
    enemies;
    clouds;
    backgroundObjects;
    collectableObjectcoins;
    collectableObjectBottles;
    level_end_x = 4000; // here the character can no longer walk (end of the map)
    constructor(enemies, clouds, backgroundObjects, collectableObjectcoins, collectableObjectBottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableObjectcoins = collectableObjectcoins;
        this.collectableObjectBottles = collectableObjectBottles;
    };
}



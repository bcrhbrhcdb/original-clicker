const BUILDINGS = [
    {
        id: 1,
        name: "Test",
        baseCost: 10,
        baseProduction: 1,
    }
    // Add more buildings here
];

// Building.js
class Building {
    constructor(id, name, baseCost, baseProduction) {
        this.id = id;
        this.name = name;
        this.baseCost = baseCost;
        this.baseProduction = baseProduction;
        this.currentProduction = baseProduction;
        this.cost = baseCost;
        this.count = 0;
    }

    produce(deltaTime) {
        return this.currentProduction * this.count * deltaTime;
    }

    buy() {
        this.count++;
        this.cost = Math.ceil(this.baseCost * Math.pow(1.15, this.count));
    }
}


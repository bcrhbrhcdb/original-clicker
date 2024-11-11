class Game {
    constructor(buildingsData) {
        this.clicks = 0;
        this.resources = 0;
        this.amountPerClick = 1;
        this.buildings = buildingsData.map(building => new Building(building.id, building.name, building.baseCost, building.baseProduction));
        this.lastUpdate = Date.now();
    }

    update() {
        const now = Date.now();
        const deltaTime = (now - this.lastUpdate) / 1000;
        this.lastUpdate = now;

        for (let building of this.buildings) {
            this.resources += building.produce(deltaTime);
        }

        this.display();
    }

    display() {
        console.log(`Resources: ${this.resources.toFixed(2)}`);
        const buildingArea = document.getElementById("buildings");
        buildingArea.innerHTML = ''; // Clear existing buttons

        this.buildings.forEach(building => {
            const buildingButton = document.createElement("button");
            buildingButton.id = `building-${building.id}`;
            buildingButton.textContent = `${building.name} (${building.count})`;
            buildingButton.onclick = () => this.buyBuilding(building.id);
            buildingButton.disabled = this.resources < building.cost;

            const costSpan = document.createElement("span");
            costSpan.textContent = ` Cost: ${building.cost}`;
            buildingButton.appendChild(costSpan);

            buildingArea.appendChild(buildingButton);
        });
    }

    buyBuilding(id) {
        const building = this.buildings.find(b => b.id === id);
        if (building && this.resources >= building.cost) {
            this.resources -= building.cost;
            building.buy();
            this.display();
        }
    }

    click() {
        this.clicks += this.amountPerClick;
        this.resources += this.amountPerClick;
        this.display();
    }
}

// main.js

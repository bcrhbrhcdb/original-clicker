class Game {
    constructor(buildingsData) {
        this.clicks = 0;
        this.resources = 0;
        this.totalResources = 0;
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
        const resources = document.getElementById("resources");
        resources.innerText = this.resources;
        const buildingArea = document.getElementById("buildings");
        buildingArea.innerHTML = ''; // Clear existing buttons

        this.buildings.forEach(building => {
            const buildingButton = document.createElement("button");
            buildingButton.style.display = "none";
            buildingButton.id = `building-${building.id}`;
            buildingButton.innerHTML = `${building.name}  (${building.count}) <br> gives ${building.baseProduction}/s`;
            if(this.totalResources >= building.baseCost){
                buildingButton.style.display = "block";
                buildingButton.onclick = () => this.buyBuilding(building.id);
                buildingButton.disabled = this.resources < building.cost;
            }
            const costSpan = document.createElement("span");
            costSpan.innerHTML = ` <br> Cost: ${building.cost}`;
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
        this.totalResources += this.amountPerClick;
        this.display();
    }
}
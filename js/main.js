const game = new Game(BUILDINGS);

// Set up game loop
setInterval(() => game.update(), 1000);

// Set up click handler
document.getElementById("clickButton").onclick = () => game.click();
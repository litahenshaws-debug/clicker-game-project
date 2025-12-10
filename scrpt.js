// --- Game Variables ---
let score = 0;
let scorePerClick = 1;

// Basic Auto-Clicker (1 score/sec)
let autoClickers = 0;
let autoClickerCost = 10;
const autoClickerIncome = 1;

// Click Power Upgrade (+1 score/click)
let clickPowerUpgrades = 0;
let clickPowerCost = 50;
const clickPowerIncrease = 1;

// Super Auto-Clicker (10 score/sec)
let superAutoClickers = 0;
let superAutoClickerCost = 500;
const superAutoClickerIncome = 10;

// --- DOM Elements ---
// Score displays
const scoreDisplay = document.getElementById('score');
const scorePerClickDisplay = document.getElementById('scorePerClickDisplay');
const clickButton = document.getElementById('clickButton');

// Upgrade 1: Basic Auto-Clicker
const autoClickerCostDisplay = document.getElementById('autoClickerCost');
const buyAutoClickerButton = document.getElementById('buyAutoClicker');

// Upgrade 2: Click Power
const clickPowerCostDisplay = document.getElementById('clickPowerCost');
const buyClickPowerButton = document.getElementById('buyClickPower');

// Upgrade 3: Super Auto-Clicker
const superAutoClickerCostDisplay = document.getElementById('superAutoClickerCost');
const buySuperAutoClickerButton = document.getElementById('buySuperAutoClicker');

// --- Functions ---

// 1. Update all score-related displays and button states
function updateDisplays() {
    // Update score and rate displays
    scoreDisplay.textContent = Math.floor(score);
    scorePerClickDisplay.textContent = scorePerClick;
    
    // Update costs
    autoClickerCostDisplay.textContent = autoClickerCost;
    clickPowerCostDisplay.textContent = clickPowerCost;
    superAutoClickerCostDisplay.textContent = superAutoClickerCost;

    // Check affordability for all buttons
    updateUpgradeButtons();
}

// 2. Handle the main click event
function handleClick() {
    score += scorePerClick;
    updateDisplays();
}

// 3. Buy Basic Auto-Clicker
function buyAutoClicker() {
    if (score >= autoClickerCost) {
        score -= autoClickerCost;
        autoClickers++;
        autoClickerCost = Math.floor(autoClickerCost * 1.5); // Increase cost
        updateDisplays();
    }
}

// 4. Buy Click Power Upgrade
function buyClickPower() {
    if (score >= clickPowerCost) {
        score -= clickPowerCost;
        clickPowerUpgrades++;
        scorePerClick += clickPowerIncrease; // Increase score per click
        clickPowerCost = Math.floor(clickPowerCost * 2); // Increase cost
        updateDisplays();
    }
}

// 5. Buy Super Auto-Clicker
function buySuperAutoClicker() {
    if (score >= superAutoClickerCost) {
        score -= superAutoClickerCost;
        superAutoClickers++;
        superAutoClickerCost = Math.floor(superAutoClickerCost * 1.8); // Increase cost
        updateDisplays();
    }
}

// 6. Game loop for auto-clicking (runs every 1 second)
function gameLoop() {
    // Calculate total passive income
    let totalIncome = 
        (autoClickers * autoClickerIncome) + 
        (superAutoClickers * superAutoClickerIncome);
    
    score += totalIncome;
    
    updateDisplays();
}

// 7. Update upgrade button state (disable if unaffordable)
function updateUpgradeButtons() {
    buyAutoClickerButton.disabled = score < autoClickerCost;
    buyClickPowerButton.disabled = score < clickPowerCost;
    buySuperAutoClickerButton.disabled = score < superAutoClickerCost;
}

// --- Event Listeners ---
// Link the main click button to the handler
clickButton.addEventListener('click', handleClick);

// Link the upgrade buttons to their respective functions
buyAutoClickerButton.addEventListener('click', buyAutoClicker);
buyClickPowerButton.addEventListener('click', buyClickPower);
buySuperAutoClickerButton.addEventListener('click', buySuperAutoClicker);

// --- Game Initialization ---
// Start the main game loop that runs every second (1000 milliseconds)
setInterval(gameLoop, 1000); 

// Initial update of displays and button states when the game loads
updateDisplays();

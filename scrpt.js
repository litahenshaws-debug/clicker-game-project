// --- Game Variables ---
let score = 0;
let scorePerClick = 1;

// Basic Auto-Clicker
let autoClickers = 0;
let autoClickerCost = 10;
const autoClickerIncome = 1; // Income per basic auto-clicker

// Click Power Upgrade
let clickPowerUpgrades = 0;
let clickPowerCost = 50;
const clickPowerIncrease = 1; // Amount scorePerClick increases

// Super Auto-Clicker
let superAutoClickers = 0;
let superAutoClickerCost = 500;
const superAutoClickerIncome = 10; // Income per super auto-clicker

// --- DOM Elements ---
const scoreDisplay = document.getElementById('score');
const scorePerClickDisplay = document.getElementById('scorePerClickDisplay');
const clickButton = document.getElementById('clickButton');

// Upgrade displays and buttons
const autoClickerCostDisplay = document.getElementById('autoClickerCost');
const buyAutoClickerButton = document.getElementById('buyAutoClicker');

const clickPowerCostDisplay = document.getElementById('clickPowerCost');
const buyClickPowerButton = document.getElementById('buyClickPower');

const superAutoClickerCostDisplay = document.getElementById('superAutoClickerCost');
const buySuperAutoClickerButton = document.getElementById('buySuperAutoClicker');

// --- Functions ---

// 1. Update all score-related displays
function updateDisplays() {
    scoreDisplay.textContent = Math.floor(score);
    scorePerClickDisplay.textContent = scorePerClick;
    
    autoClickerCostDisplay.textContent = autoClickerCost;
    clickPowerCostDisplay.textContent = clickPowerCost;
    superAutoClickerCostDisplay.textContent = superAutoClickerCost;

    updateUpgradeButtons();
}

// 2. Handle the main click
function handleClick() {
    score += scorePerClick;
    updateDisplays();
}

// 3. Buy Basic Auto-Clicker
function buyAutoClicker() {
    if (score >= autoClickerCost) {
        score -= autoClickerCost;
        autoClickers++;
        autoClickerCost = Math.floor(autoClickerCost * 1.5);
        updateDisplays();
    }
}

// 4. Buy Click Power Upgrade
function buyClickPower() {
    if (score >= clickPowerCost) {
        score -= clickPowerCost;
        clickPowerUpgrades++;
        scorePerClick += clickPowerIncrease;
        clickPowerCost = Math.floor(clickPowerCost * 2); // More expensive scaling
        updateDisplays();
    }
}

// 5. Buy Super Auto-Clicker
function buySuperAutoClicker() {
    if (score >= superAutoClickerCost) {
        score -= superAutoClickerCost;
        superAutoClickers++;
        superAutoClickerCost = Math.floor(superAutoClickerCost * 1.8);
        updateDisplays();
    }
}

// 6. Game loop for auto-clicking (runs every 1 second)
function gameLoop() {
    // Calculate total income from all auto-clickers
    let totalIncome = 
        (autoClickers * autoClickerIncome) + 
        (superAutoClickers * superAutoClickerIncome);
    
    score += totalIncome;
    
    updateDisplays();
}

// 7. Update upgrade button state (disable if unaffordable)
function updateUpgradeButtons() {
    // Basic Auto-Clicker
    buyAutoClickerButton.disabled = score < autoClickerCost;

    // Click Power
    buyClickPowerButton.disabled = score < clickPowerCost;
    
    // Super Auto-Clicker
    buySuperAutoClickerButton.disabled = score < superAutoClickerCost;
}

// --- Event Listeners ---
clickButton.addEventListener('click', handleClick);
buyAutoClickerButton.addEventListener('click', buyAutoClicker);
buyClickPowerButton.addEventListener('click', buyClickPower);
buySuperAutoClickerButton.addEventListener('click', buySuperAutoClicker);

// --- Game Initialization ---
// Start the main game loop that runs every second
setInterval(gameLoop, 1000); 

// Initial update of displays and button states
updateDisplays();

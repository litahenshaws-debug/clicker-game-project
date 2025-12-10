// --- Game Variables ---
let score = 0;
let autoClickers = 0;
let autoClickerCost = 10;
let scorePerClick = 1; // You can add upgrades for this later!

// --- DOM Elements ---
const scoreDisplay = document.getElementById('score');
const clickButton = document.getElementById('clickButton');
const buyAutoClickerButton = document.getElementById('buyAutoClicker');
const autoClickerCostDisplay = document.getElementById('autoClickerCost');

// --- Functions ---

// 1. Update the score display
function updateScoreDisplay() {
    scoreDisplay.textContent = Math.floor(score); // Use floor to keep the displayed score an integer
}

// 2. Handle the main click
function handleClick() {
    score += scorePerClick;
    updateScoreDisplay();
}

// 3. Handle buying the auto-clicker
function buyAutoClicker() {
    if (score >= autoClickerCost) {
        score -= autoClickerCost;
        autoClickers++;
        
        // Increase the cost for the next one (e.g., by 1.5x)
        autoClickerCost = Math.floor(autoClickerCost * 1.5);

        // Update the displays
        autoClickerCostDisplay.textContent = autoClickerCost;
        updateScoreDisplay();
        updateUpgradeButtons();
    }
}

// 4. Game loop for auto-clicking (runs every 1000 milliseconds = 1 second)
function gameLoop() {
    // Add score based on how many auto-clickers the player owns
    score += autoClickers * 1; // 1 score per second per auto-clicker
    updateScoreDisplay();
    updateUpgradeButtons(); // Check if player can afford upgrades every second
}

// 5. Update upgrade button state (disable if unaffordable)
function updateUpgradeButtons() {
    // Check Auto-Clicker
    if (score >= autoClickerCost) {
        buyAutoClickerButton.disabled = false;
    } else {
        buyAutoClickerButton.disabled = true;
    }
}

// --- Event Listeners ---
clickButton.addEventListener('click', handleClick);
buyAutoClickerButton.addEventListener('click', buyAutoClicker);

// --- Game Initialization ---
// Start the main game loop that runs every second
setInterval(gameLoop, 1000); 

// Initial update of button states
updateUpgradeButtons();
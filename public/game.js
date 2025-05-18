let resource = 0;
let rate = 1;
let upgradeCost = 10;
let prestigeCount = 0;
let userId = 'user1';

const resElem = document.getElementById('resource');
const rateElem = document.getElementById('rate');
const costElem = document.getElementById('upgrade-cost');

function updateUI() {
  resElem.textContent = Math.floor(resource);
  rateElem.textContent = rate.toFixed(1);
  costElem.textContent = upgradeCost;
}

function saveGame() {
  fetch('http://localhost:3003/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, gameState: { resource, rate, upgradeCost, prestigeCount } })
  });
}

function loadGame() {
  fetch(`http://localhost:3003/load/${userId}`)
    .then(res => res.json())
    .then(({ gameState }) => {
      if (gameState) {
        ({ resource, rate, upgradeCost, prestigeCount } = gameState);
        updateUI();
      }
    });
}

document.getElementById('clicker').onclick = () => {
  resource += 1;
  updateUI();
};

document.getElementById('buy-upgrade').onclick = () => {
  if (resource >= upgradeCost) {
    resource -= upgradeCost;
    rate += 1;
    upgradeCost = Math.floor(upgradeCost * 1.5);
    updateUI();
  }
};

document.getElementById('prestige').onclick = () => {
  if (resource >= 1000) {
    prestigeCount++;
    resource = 0;
    rate = 1 + prestigeCount * 2;
    upgradeCost = 10;
    updateUI();
  }
};

setInterval(() => {
  resource += rate;
  updateUI();
  saveGame();
}, 1000);

loadGame();

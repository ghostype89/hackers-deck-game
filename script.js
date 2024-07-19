document.addEventListener('DOMContentLoaded', () => {
    const deck = [
        { name: 'Virus Attack', type: 'attack', damage: 5 },
        { name: 'Data Corruption', type: 'attack', damage: 3 },
        { name: 'Firewall', type: 'defense', block: 5 },
        { name: 'Encryption', type: 'defense', block: 3 },
        { name: 'System Scan', type: 'utility', effect: 'draw' },
        { name: 'Code Injection', type: 'attack', damage: 7 },
        { name: 'Blackout', type: 'special', effect: 'stun' },
        { name: 'Override', type: 'special', effect: 'double_damage' }
    ];

    let hand = [];
    let playArea = [];
    let enemy = { health: 20, attack: 5 };
    let player = { health: 30, block: 0, drawCount: 1 };

    const deckElement = document.getElementById('deck');
    const handElement = document.getElementById('hand');
    const playAreaElement = document.getElementById('play-area');
    const enemyAreaElement = document.getElementById('enemy-area');
    const endTurnButton = document.getElementById('end-turn');
    const upgradesElement = document.getElementById('upgrades');
    const upgradeHealthButton = document.getElementById('upgrade-health');
    const upgradeDrawButton = document.getElementById('upgrade-draw');

    function drawCard() {
        for (let i = 0; i < player.drawCount; i++) {
            if (deck.length > 0) {
                const card = deck.pop();
                hand.push(card);
            }
        }
        renderHand();
    }

    function renderHand() {
        handElement.innerHTML = '';
        hand.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.innerHTML = `<strong>${card.name}</strong>`;
            cardElement.addEventListener('click', () => playCard(index));
            handElement.appendChild(cardElement);
        });
    }

    function playCard(index) {
        const card = hand.splice(index, 1)[0];
        playArea.push(card);
        renderHand();
        renderPlayArea();
    }

    function renderPlayArea() {
        playAreaElement.innerHTML = '';
        playArea.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.innerHTML = `<strong>${card.name}</strong>`;
            playAreaElement.appendChild(cardElement);
        });
    }

    function renderEnemy() {
        enemyAreaElement.innerHTML = `<div class="card"><strong>Enemy</strong><br>Health: ${enemy.health}</div>`;
    }

    function endTurn() {
        playArea.forEach(card => {
            if (card.type === 'attack') {
                enemy.health -= card.damage;
            } else if (card.type === 'defense') {
                player.block += card.block;
            } else if (card.type === 'special') {
                if (card.effect === 'stun') {
                    // Implement stun effect
                } else if (card.effect === 'double_damage') {
                    // Implement double damage effect
                }
            }
        });
        playArea = [];
        renderPlayArea();
        enemyAttack();
        renderEnemy();
        checkGameState();
    }

    function enemyAttack() {
        player.health -= Math.max(0, enemy.attack - player.block);
        player.block = 0;
    }

    function checkGameState() {
        if (enemy.health <= 0) {
            enemy.health = 20; // Reset for demonstration
            player.health = 30; // Reset for demonstration
            hand = [];
            playArea = [];
            upgradesElement.classList.remove('hidden');
        } else if (player.health <= 0) {
            alert('Game Over');
            // Reset game state for demonstration
            enemy.health = 20;
            player.health = 30;
            hand = [];
            playArea = [];
            upgradesElement.classList.remove('hidden');
        }
    }

    upgradeHealthButton.addEventListener('click', () => {
        player.health += 10;
        upgradesElement.classList.add('hidden');
    });

    upgradeDrawButton.addEventListener('click', () => {
        player.drawCount += 1;
        upgradesElement.classList.add('hidden');
    });

    deckElement.innerHTML = '<strong>Deck</strong>';
    for (let i = 0; i < 5; i++) {
        drawCard();
    }
    renderEnemy();

    endTurnButton.addEventListener('click', endTurn);
});

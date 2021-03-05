function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
Vue.createApp({
    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: []
        };
    },
    watch: {
        monsterHealth(value) {
            if (this.playerHealth == 0 && value == 0) {
                this.winner = "draw";
            } else if (value <= 0) {
                this.winner = "player";
            }
        },
        playerHealth(value) {
            if (this.monsterHealth == 0 && value == 0) {
                this.winner = "draw";
            } else if (value <= 0) {
                this.winner = "monster";
            }
        },
    },
    computed: {
        monsterBarStyles() {
            if (this.monsterHealth < 0) {
                return { width: "0%" };
            }
            return { width: this.monsterHealth + "%" };
        },
        playerBarStyles() {
            if (this.playerHealth < 0) {
                return { width: "0%" };
            }
            return { width: this.playerHealth + "%" };
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0;
        },
    },
    methods: {
        attackMonster() {
            this.currentRound++;
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.addLogMessage('player', 'attack', attackValue);
            this.attackPLayer();
        },
        attackPLayer() {
            const attackValue = getRandomValue(8, 15);
            this.addLogMessage("monster", "attack", attackValue);
            this.playerHealth -= attackValue;
        },
        specialAttackMonster() {

            this.currentRound++;
            const attackValue = getRandomValue(10, 25);
            this.addLogMessage("player", "special-attack", attackValue);
            this.monsterHealth -= attackValue;
            this.attackPLayer();
        },
        healPlayer() {
            var healValue = getRandomValue(8, 20);
            this.addLogMessage("player", "heal", healValue);

            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.attackPLayer();
        },
        resetGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
        },
        surrender() {
            this.winner = 'monster';
            this.logMessages = [];
        },
        addLogMessage(who, what, value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value,
            });
        }
    },
}).mount("#game");
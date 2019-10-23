class Player {
    constructor(id) {
        this.id = id;
    }

    send(msg) {
        this.ws.send(msg);
    }
}

module.exports = Player;
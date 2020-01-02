class Match {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
    }

    start() {
        this.player1.send('white');
        this.player2.send('black');

        this.status = 'started';

        this.player1.Event.on('move', data => this.playMove('white', data));
        this.player2.Event.on('move', data => this.playMove('black', data));

        this.player1.Event.on('finish', () => this.finish('white'));
        this.player2.Event.on('finish', () => this.finish('black'));
    }

    playMove(id, data) {
        let oppPlayer = id == 'white' ? this.player2 : this.player1;
        let oppColor = id == 'white' ? 'black' : 'white';
        console.log(`sending message to player ${oppColor}: ${data}`)
        oppPlayer.send(JSON.stringify({ data: data }));
    }

    finish(id) {
        if (this.status != 'finished') {
            let oppPlayer = id == 'white' ? this.player2 : this.player1;
            let oppColor = id == 'white' ? 'black' : 'white';
            console.log(`player ${oppColor} won`);
            oppPlayer.Event.emit('finish');
            
            this.status = 'finished';
        }
    }
}    

module.exports = Match;
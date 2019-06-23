const boardwidth = 6;
const w = 80;

class square {
	constructor(x, y, w, r, g, b, color, state) {
		this.x = x;
		this.y = y;
		this.w = w;
		// rgb(255,248,220) white
		// rgb(139,69,19) black
		this.r = r;
		this.g = g;
		this.b = b;
		this.color = color;
		this.state = 'clear';
	}
	
	show() {
		fill(this.r, this.g, this.b);		
		strokeWeight(2);
		rect(this.x, this.y, this.w, this.w);
	}
}

class amazon {
	constructor(x, y, team) {
		this.x = x;
		this.y = y;
		this.team = team
	}
}


function setup() {
	createCanvas(boardwidth * w, boardwidth * w);
	squares = []
	for (i=0; i < boardwidth; i++) {
		for (j=0; j < boardwidth; j++) {
			if ((i + j) % 2 != 0) {
				Square = new square(i * w, j * w, w, 139, 69, 19, 'black');
			}
			else {
				Square = new square(i * w, j * w, w, 255, 248, 220, 'white');
			}
			Square.show();
			squares.push(Square);
		}
	}
}

function draw() {

}
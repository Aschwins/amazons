const boardwidth = 6;
const w = 80;
const n_amazons = 2;
const move = 'white';


function create2darray(m, n, v) {
	// Function that creates an m x n array.
	// m rows, n cols
	mat = [];
	for (i=0; i < m; i++) {
		rows = [];
		for (j=0; j < n; j++) {
			rows.push(v);
		}
		mat.push(rows);
	}
	return mat;
}

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
	constructor(i, j, width, team) {
		this.i = i
		this.j = j
		this.w = width
		this.team = team
		this.x = i * width;
		this.y = j * width;
	}

	show() {

		if (this.team == 'black') {
			fill(0);
		}
		else {
			fill(255);
		}
		strokeWeight(1);
		rect(this.x + 0.2 * this.w, this.y + 0.85 * this.w, this.w * 0.6, this.w * 0.08);
		rect(this.x + 0.2 * this.w, this.y + 0.78 * this.w, this.w * 0.6, this.w * 0.10);
		rect(this.x + 0.3 * this.w, this.y + 0.60 * this.w, this.w * 0.4, this.w * 0.15);
		triangle(
			this.x + 0.1 * this.w, this.y + 0.40 * this.w, 
			this.x + 0.25 * this.w, this.y + 0.77 * this.w,
			this.x + 0.15 * this.w, this.y + 0.77 * this.w);
		triangle(
			this.x + 0.2 * this.w, this.y + 0.30 * this.w, 
			this.x + 0.3 * this.w, this.y + 0.58 * this.w, 
			this.x + 0.2 * this.w, this.y + 0.58 * this.w);	
		triangle(
			this.x + 0.35 * this.w, this.y + 0.20 * this.w, 
			this.x + 0.32 * this.w, this.y + 0.58 * this.w, 
			this.x + 0.42 * this.w, this.y + 0.58 * this.w);
		triangle(
			this.x + 0.5 * this.w, this.y + 0.10 * this.w, 
			this.x + 0.55 * this.w, this.y + 0.58 * this.w,
			this.x + 0.45 * this.w, this.y + 0.58 * this.w);
		triangle(
			this.x + 0.65 * this.w, this.y + 0.20 * this.w, 
			this.x + 0.58 * this.w, this.y + 0.58 * this.w, 
			this.x + 0.68 * this.w, this.y + 0.58 * this.w);	
		triangle(
			this.x + 0.8 * this.w, this.y + 0.30 * this.w, 
			this.x + 0.8 * this.w, this.y + 0.58 * this.w, 
			this.x + 0.7 * this.w, this.y + 0.58 * this.w);	
		triangle(
			this.x + 0.9 * this.w, this.y + 0.40 * this.w, 
			this.x + 0.85 * this.w, this.y + 0.77 * this.w, 
			this.x + 0.75 * this.w, this.y + 0.77 * this.w);
	}
}

function select_sq(mouse_x, mouse_y) {
	for (i = 0; i < boardwidth; i++) {
		row = squares[i];
		row.forEach(function(sq) {
			if (sq.x < mouse_x && 
				sq.x + sq.w > mouse_x && 
				sq.y < mouse_y && 
				sq.y + sq.w > mouse_y) {
			
				console.log(sq);
			}
		});
	}

}

// draw squares in draw. color select with yellow


function mousePressed() {
	console.log("mouse is pressed");
	select_sq(mouseX, mouseY);
}

function setup() {
	// Create the board with array of squares.
	createCanvas(boardwidth * w, boardwidth * w);
	squares = [];
	for (i=0; i < boardwidth; i++) {
		rows_sq = [];
		for (j=0; j < boardwidth; j++) {
			if ((i + j) % 2 != 0) {
				Square = new square(i * w, j * w, w, 139, 69, 19, 'black');
			}
			else {
				Square = new square(i * w, j * w, w, 255, 248, 220, 'white');
			}
			Square.show();
			rows_sq.push(Square);
		}
		squares.push(rows_sq);
	}

	board_array = create2darray(boardwidth, boardwidth, 0);
	// Create an Amazon
	A1 = new amazon(0, 2, w, 'black');
	A2 = new amazon(5, 3, w, 'white')
	console.log(squares);
}

function draw() {

	A1.show();
	A2.show();
	
}
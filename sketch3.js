const boardwidth = 5;
const sq_width = 60;

const states = [
    'white_selects', 'white_moves', 'white_shoots', 
    'black_selects','black_moves', 'black_shoots'];

function create2darray(m, n, fill_value = undefined) {
	// Function that creates an m x n array.
	// m rows, n cols, fill with fill_value
	mat = [];
	for (i=0; i < m; i++) {
		rows = [];
		for (j=0; j < n; j++) {
			rows.push(fill_value);
		}
		mat.push(rows);
	}
	return mat;
}

function DrawAmazon(x, y, w, color) {
    if (color == 'Black Amazon') {
        fill(0);
    }
    else {
        fill(255);
    }
    stroke(0);
    strokeWeight(1);
    rect(x + 0.2 * w, y + 0.85 * w, w * 0.6, w * 0.08);
    rect(x + 0.2 * w, y + 0.78 * w, w * 0.6, w * 0.10);
    rect(x + 0.3 * w, y + 0.60 * w, w * 0.4, w * 0.15);
    triangle(
        x + 0.1 * w, y + 0.40 * w, 
        x + 0.25 * w, y + 0.77 * w,
        x + 0.15 * w, y + 0.77 * w);
    triangle(
        x + 0.2 * w, y + 0.30 * w, 
        x + 0.3 * w, y + 0.58 * w, 
        x + 0.2 * w, y + 0.58 * w);	
    triangle(
        x + 0.35 * w, y + 0.20 * w, 
        x + 0.32 * w, y + 0.58 * w, 
        x + 0.42 * w, y + 0.58 * w);
    triangle(
        x + 0.5 * w, y + 0.10 * w, 
        x + 0.55 * w, y + 0.58 * w,
        x + 0.45 * w, y + 0.58 * w);
    triangle(
        x + 0.65 * w, y + 0.20 * w, 
        x + 0.58 * w, y + 0.58 * w, 
        x + 0.68 * w, y + 0.58 * w);	
    triangle(
        x + 0.8 * w, y + 0.30 * w, 
        x + 0.8 * w, y + 0.58 * w, 
        x + 0.7 * w, y + 0.58 * w);	
    triangle(
        x + 0.9 * w, y + 0.40 * w, 
        x + 0.85 * w, y + 0.77 * w, 
        x + 0.75 * w, y + 0.77 * w);
}

class Board {
    constructor(
        x, y, w, h, sq_width, state, n_amazons
        ) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.sq_width = sq_width;
        this.state = state;
        this.n_amazons = n_amazons;
        this.m = h / sq_width; // Maximum square vertically
        this.n = w / sq_width; // Maximum square horizontally

        // Create an m x n matrix
        this.matrix = create2darray(this.m, this.n, '0'); 
    }

    fill_board() {
        /* Fills the board with squares.*/
        for (i = 0; i < this.n; i++) {
            for (j = 0; j < this.m; j++) {
                if ((i + j) % 2 != 0) {
                    var square_color = "Black";
                }
                else {
                    var square_color = "White";
                }
                this.matrix[i][j] = new Square(
                    this.x + i * this.sq_width, 
                    this.y + j * this.sq_width,
                    '0',
                    this.sq_width,
                    square_color
                );
            }
        }
        
        // Fill the board with n_amazons for each side.
        var white_side = [];
        var black_side = [];
        for (i=0; i < boardwidth; i++) {
            white_side.push([0, i]);
            white_side.push([i, boardwidth-1]);
        }
        for (i=boardwidth-1; i>-1; i--) {
            black_side.push([boardwidth-1, i]);
            black_side.push([i, 0]);
        }
        const stepsize = Math.floor(black_side.length/this.n_amazons)
        for (i=0; i < this.n_amazons; i++){
            var white_amazon_square = white_side[stepsize * i];
            var black_amazon_square = black_side[stepsize * i];
            this.matrix[
                white_amazon_square[0]][white_amazon_square[1]
            ].state = 'White Amazon';
            this.matrix[
                black_amazon_square[0]][black_amazon_square[1]
            ].state = 'Black Amazon';
        }
        console.log("Board Filled with:")
        console.log(this.matrix)
    }

    show() {
        /* Shows the board on the canvas.*/
        for (i = 0; i < this.m; i++) {
            for (j = 0; j < this.n; j++) {
                this.matrix[i][j].show()
            }
        }
    }
}



class Square {
    constructor(x, y, state, width, color) {
        this.x = x;
        this.y = y;
        this.state = state;
        this.width = width;
        this.color = color;
    }

    show() {
        if (this.color == 'Black') {
            fill(139, 69, 19);
            stroke(0);
            strokeWeight(2);
            rect(this.x, this.y, this.width, this.width);
        }
        else {
            fill(255, 248, 220);
            stroke(0);
            strokeWeight(2);
            rect(this.x, this.y, this.width, this.width);
        }

        if (this.state == "White Amazon" || this.state ==  "Black Amazon") {
            DrawAmazon(this.x, this.y, this.width, this.state)
        }
    }
}

function setup() {
    createCanvas(boardwidth * sq_width, boardwidth * sq_width);
    board = new Board(
        0, 0, boardwidth * sq_width, 
        boardwidth * sq_width, sq_width, state = "white_selects", n_amazons = 2);
    board.fill_board();
    board.show();
}


function draw() {
    board.show();
}
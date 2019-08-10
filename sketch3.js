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

class Board {
    constructor(x, y, w, h, sq_width, state = 'white_selects', n_amazons) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.sq_width = sq_width;
        this.state = state;
        this.n_amazons = n_amazons;
        this.m = h / sq_width; // Maximum square vertically
        this.n = w / sq_width; // Maximum square horizontally
        this.matrix = create2darray(this.m, this.n, '0'); // Create an m x n matrix
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
    }
}

function setup() {
    createCanvas(boardwidth * sq_width, boardwidth * sq_width);
    board = new Board(
        0, 0, boardwidth * sq_width, 
        boardwidth * sq_width, sq_width, n_amazons = 0);
    board.fill_board();
    board.show();
}


function draw() {
    board.show();
}
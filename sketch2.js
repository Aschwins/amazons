// Global vars - alter these to change the game.
const boardwidth = 3;
const n_amazons = 1; //have to fix to have variable number of amazons.
const sq_width = 80;

// Global vars - don't alter these.
const states = ['w_select', 'w_move', 'w_shoot', 'b_select', 'b_move', 'b_shoot'];
var state = 'w_select';
const square_states = ['B', 'W', '0', '1', '2', 'F'];
const amazon_states = ['0', 'Move', 'Shoot'];
const board = create2darray(boardwidth, boardwidth, '0');

// Assign the first amazons to the board matrix.
board[0][0] = 'B';
board[boardwidth-1][boardwidth-1] = 'W';


class square {
    constructor(i, j, state) {
        this.i = i;
        this.j = j;
        this.state = state;
        this.x = j * sq_width;
        this.y = i * sq_width;
        this.w = sq_width;
    }

    show() {
        // Here comes a huge case. 
        // If square is selected.
        // If square is burnt. etc.

        // If the square is an option ('1')
        if (this.state == '1') {
            if ((this.i + this.j) % 2 != 0) {
                fill(139, 69, 19); // Black Square
                stroke(0);	
                strokeWeight(2);
                rect(this.x, this.y, this.w, this.w);
                noStroke();
                fill(85, 107, 47, 100);
                ellipseMode(CENTER);
                ellipse(this.x + 0.5 * this.w, this.y + 0.5 * this.w, this.w/5, this.w/5)
            }
            else {
                fill(255,248,220); // White Square
                stroke(0);
                strokeWeight(2);
                rect(this.x, this.y, this.w, this.w);
                noStroke();
                fill(85, 107, 47, 100);
                ellipseMode(CENTER);
                ellipse(this.x + 0.5 * this.w, this.y + 0.5 * this.w, this.w/5, this.w/5)
            }
        }
        else if (this.state == '2') {
            if ((this.i + this.j) % 2 != 0) {
                fill(139, 69, 19); // Black Square
                stroke(0);	
                strokeWeight(2);
                rect(this.x, this.y, this.w, this.w);
                noStroke();
                fill(178, 34, 34, 100);
                ellipseMode(CENTER);
                ellipse(this.x + 0.5 * this.w, this.y + 0.5 * this.w, this.w/5, this.w/5)
            }
            else {
                fill(255,248,220); // White Square
                stroke(0);
                strokeWeight(2);
                rect(this.x, this.y, this.w, this.w);
                noStroke();
                fill(178, 34, 34, 100);
                ellipseMode(CENTER);
                ellipse(this.x + 0.5 * this.w, this.y + 0.5 * this.w, this.w/5, this.w/5)
            }
        }
        else if (this.state == 'F'){
            if ((this.i + this.j) % 2 != 0) {
                fill(178, 34, 34, 100); // Black Square
                stroke(0);		
                strokeWeight(2);
                rect(this.x, this.y, this.w, this.w);
            }
            else {
                fill(178, 34, 34, 100); // White Square
                stroke(0);		
                strokeWeight(2);
                rect(this.x, this.y, this.w, this.w);
            }
        }
        else {
            if ((this.i + this.j) % 2 != 0) {
                fill(139, 69, 19); // Black Square
                stroke(0);		
                strokeWeight(2);
                rect(this.x, this.y, this.w, this.w);
            }
            else {
                fill(255, 248, 220); // White Square
                stroke(0);		
                strokeWeight(2);
                rect(this.x, this.y, this.w, this.w);
            }
        }

    }
}

class amazon {
    constructor(square, team, state = '0') {
        this.square = square;
        this.team = team;
        this.state = state;
        this.x = square.x;
        this.y = square.y;
        this.w = sq_width;
    }

    select() {

    }

    move(sq) {
        // Moves the amazon to a new square (i, j)
        this.square = sq;
        this.x = sq.x
        this.y = sq.y
        console.log("the amazon moved!")
    }

    shoot() {

    }

    show() {
		if (this.team == 'B') {
			fill(0);
		}
		else {
			fill(255);
        }
        stroke(0);
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

// Create a matrix of square objects
const squares = create2darray(boardwidth, boardwidth)
for (i=0; i < boardwidth; i++) {
    for (j=0; j < boardwidth; j++) {
        squares[i][j] = new square(i, j, board[i][j]);
    }
};

// Create amazons
const amazons = []
for (i=0; i < boardwidth; i++) {
    for (j=0; j < boardwidth; j++) {
        if (board[i][j] == 'W' || board[i][j] == 'B') {
            Amazon = new amazon(squares[i][j], board[i][j]);
            amazons.push(Amazon);
        }
    }
};

function create2darray(m, n, v = undefined) {
	// Function that creates an m x n array.
	// m rows, n cols, fill with v
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


function game_ended() {
    // Function that checks if the game is ended.
}

function select_amazon(mouse_x, mouse_y) {
    // Function which checks if a amazon is selected with a mouseclick
    // If mouseclick is on a square with an amazon return True
    let selection;
    amazons.forEach(a => {
        if (a.square.x < mouse_x && 
            a.square.x + a.square.w > mouse_x && 
            a.square.y < mouse_y && 
            a.square.y + a.square.w > mouse_y) {
                selection = a;
        }
    });
    return selection;
}

function select_square(mouse_x, mouse_y) {
    // Checks wether a square is selected. Returns the selected square.
    let selection;
    for (i=0; i < boardwidth; i++) {
        for (j=0; j < boardwidth; j++) {
            if (squares[i][j].x < mouse_x && 
                squares[i][j].x + squares[i][j].w > mouse_x && 
                squares[i][j].y < mouse_y && 
                squares[i][j].y + squares[i][j].w > mouse_y) {
                    selection = squares[i][j];
            }
        }
    }
    return selection;
}

function check_horizontal(i, j) {
    /*
    returns all horizontal locations [[0,1], [1,1],...] which are vacated (open)
    options

    */
    let options = []

    // Check left
    for (col = j - 1; col > -1; col--){
        if (board[i][col] == '0') {
            options.push([i, col])
        }
        else {
            break;
        }
    }
    // Check right
    for (col = j + 1; col < boardwidth; col++){
        if (board[i][col] == '0') {
            options.push([i, col])
        }
        else {
            break;
        }
    }
    return options;
}

function check_vertical(i, j) {
    /*
    returns all vertical locations [[2,0], [2,1],...] which are vacated (open)
    options

    */
   let options = []

   // Check above
   for (row = i - 1; row > -1; row--) {
       if (board[row][j] == '0') {
           options.push([row, j])
       }
       else {
           break;
       }
   }

   // Check below
   for (row = i + 1; row < boardwidth; row++){
       if (board[row][j] == '0') {
           options.push([row, j])
       }
       else {
           break;
       }
   }
   return options;
}

function check_diagonal(i,j) {
    // Checks all diagonal options.

    let options = [];
    let space_left = j;
    console.log('space_left', space_left);
    let space_right = boardwidth - j - 1;
    let space_up = i;
    console.log('space_up', space_up);
    let space_down = boardwidth - i - 1;


    // Check upleft
    for (offset = 1; offset <= min(space_left, space_up); offset++) {
        if (board[i - offset][j - offset] == '0') {
            options.push([i - offset, j - offset]);
        }
        else {
            break;
        }
    }

    // Check upright
    for (offset = 1; offset <= min(space_right, space_up); offset++) {
        if (board[i - offset][j + offset] == '0') {
            options.push([i - offset, j + offset]);
        }
        else {
            break;
        }
    }

    // Check downleft
    for (offset = 1; offset <= min(space_left, space_down); offset++) {
        if (board[i + offset][j - offset] == '0') {
            options.push([i + offset, j - offset]);
        }
        else {
            break;
        }
    }

    // Check downright
    for (offset = 1; offset <= min(space_right, space_down); offset++) {
        if (board[i + offset][j + offset] == '0') {
            options.push([i + offset, j + offset]);
        }
        else {
            break;
        }
    }

    return options;
}

function mousePressed() {
    // w_select stage
    if (state == 'w_select') {
        a = select_amazon(mouseX, mouseY);
        if (a != undefined) {
            if (a.team == 'W') {
                a.state = 'Move';
                let options = [];
                let diagonal_options = check_diagonal(a.square.i, a.square.j);
                let horizontal_options = check_horizontal(a.square.i, a.square.j);
                let vertical_options = check_vertical(a.square.i, a.square.j);
                options = diagonal_options.concat(horizontal_options).concat(vertical_options);
                options.forEach(option => {
                    board[option[0]][option[1]] = '1';
                    squares[option[0]][option[1]].state = '1';
                });
                state = 'w_move';
            }
        } 
    }


    // w_move stage
    else if (state == 'w_move') {
        // 1. Go back (deselect)
        a = select_amazon(mouseX, mouseY);
        if (a != undefined) {
            if (a.team == 'W') {
                a.state = '0';
                state = 'w_select';
                for (i = 0; i < boardwidth; i++) {
                    for (j = 0; j < boardwidth; j++) {
                        if (squares[i][j].state = '1') {
                            squares[i][j].state = '0';
                        }
                        if (board[i][j] == '1') {
                            board[i][j] = '0';
                        }
                    }
                }
            }
        }

        // 2. Move
        selected_square = select_square(mouseX, mouseY)
        if (selected_square != undefined) {
            if (selected_square.state == '1') {
                // Move the amazon
                let new_square = selected_square;
                amazons.forEach(a => {
                    if (a.state == 'Move') {
                        let old_square = a.square;
                        // Change the squares and board
                        old_square.state = '0';
                        board[old_square.i][old_square.j] = '0'
                        a.move(new_square);
                        new_square.state = 'W';
                        board[new_square.i][new_square.j] = 'W'


                        a.state = '0';

                        // Update all options back to zero.
                        for (i = 0; i < boardwidth; i++) {
                            for (j = 0; j < boardwidth; j++) {
                                if (squares[i][j].state == '1'){
                                    squares[i][j].state = '0'
                                }
                                if (board[i][j] == '1') {
                                    board[i][j] = '0'
                                }
                            }
                        }
                        state = 'w_shoot'

                        // Change all option_squares to '2' from the new square.

                        horizontal_options = check_horizontal(new_square.i, new_square.j);
                        vertical_options = check_vertical(new_square.i, new_square.j);
                        diagonal_options = check_diagonal(new_square.i, new_square.j);

                        options = horizontal_options.concat(vertical_options).concat(diagonal_options);
                        options.forEach(option => {
                            squares[option[0]][option[1]].state = '2';
                            board[option[0]][option[1]] = '2'
                        })
                    }
                })
            }
        }
    }

    // w_shoot
    else if (state == 'w_shoot'){
        selected_square = select_square(mouseX, mouseY);
        if (selected_square != undefined){
            if (selected_square.state == '2') {
                selected_square.state = 'F'; // F=Fire
                board[selected_square.i][selected_square.j] = 'F';
                // Update Squares
                for (i=0; i < boardwidth; i++) {
                    for (j=0; j < boardwidth; j++) {
                        if (squares[i][j].state == '2') {
                            squares[i][j].state = '0';
                        }
                        if (board[i][j] == '2') {
                            board[i][j] = '0';
                        }
                    }
                }
                state = 'b_select'
            }
        }
    }

    // b_select stage
    else if (state == 'b_select') {
        a = select_amazon(mouseX, mouseY);
        if (a != undefined) {
            if (a.team == 'B') {
                a.state = 'Move';
                let options = [];
                let diagonal_options = check_diagonal(a.square.i, a.square.j);
                let horizontal_options = check_horizontal(a.square.i, a.square.j);
                let vertical_options = check_vertical(a.square.i, a.square.j);
                options = diagonal_options.concat(horizontal_options).concat(vertical_options);
                options.forEach(option => {
                    board[option[0]][option[1]] = '1';
                    squares[option[0]][option[1]].state = '1';
                });
                state = 'b_move';
            }
        } 
    }

    // b_move stage
    else if (state == 'b_move') {
        // 1. Go back (deselect)
        a = select_amazon(mouseX, mouseY);
        if (a != undefined) {
            if (a.team == 'B') {
                a.state = '0';
                state = 'b_select';
                for (i = 0; i < boardwidth; i++) {
                    for (j = 0; j < boardwidth; j++) {
                        if (squares[i][j].state = '1') {
                            squares[i][j].state = '0';
                        }
                        if (board[i][j] == '1') {
                            board[i][j] = '0';
                        }
                    }
                }
            }
        }

        // 2. Move
        selected_square = select_square(mouseX, mouseY)
        if (selected_square != undefined) {
            if (selected_square.state == '1') {
                // Move the amazon
                let new_square = selected_square;
                amazons.forEach(a => {
                    if (a.state == 'Move') {
                        let old_square = a.square;
                        // Change the squares and board
                        old_square.state = '0';
                        board[old_square.i][old_square.j] = '0'
                        a.move(new_square);
                        new_square.state = 'B';
                        board[new_square.i][new_square.j] = 'B'


                        a.state = '0';

                        // Update all options back to zero.
                        for (i = 0; i < boardwidth; i++) {
                            for (j = 0; j < boardwidth; j++) {
                                if (squares[i][j].state == '1'){
                                    squares[i][j].state = '0'
                                }
                                if (board[i][j] == '1') {
                                    board[i][j] = '0'
                                }
                            }
                        }
                        state = 'b_shoot'

                        // Change all option_squares to '2' from the new square.

                        horizontal_options = check_horizontal(new_square.i, new_square.j);
                        vertical_options = check_vertical(new_square.i, new_square.j);
                        diagonal_options = check_diagonal(new_square.i, new_square.j);

                        options = horizontal_options.concat(vertical_options).concat(diagonal_options);
                        options.forEach(option => {
                            squares[option[0]][option[1]].state = '2';
                            board[option[0]][option[1]] = '2'
                        })
                    }
                })
            }
        }
    }

    // b_shoot stage
    else if (state == 'b_shoot'){
        selected_square = select_square(mouseX, mouseY);
        if (selected_square != undefined){
            if (selected_square.state == '2') {
                selected_square.state = 'F'; // F=Fire
                board[selected_square.i][selected_square.j] = 'F';
                // Update Squares
                for (i=0; i < boardwidth; i++) {
                    for (j=0; j < boardwidth; j++) {
                        if (squares[i][j].state == '2') {
                            squares[i][j].state = '0';
                        }
                        if (board[i][j] == '2') {
                            board[i][j] = '0';
                        }
                    }
                }
                state = 'w_select'
            }
        }
    }
    // w_select stage. 

    // presseing select twice resets "F"? !!!!!!
    //PResseigs seleclt twisce resets :F::F!!!
}

function setup() {
    // Create the board with array of squares.
	createCanvas(boardwidth * sq_width, boardwidth * sq_width);
    console.log(board);
    console.log(squares);
    console.log(amazons);
}

function draw() {
	for (i=0; i < boardwidth; i++) {
		for (j=0; j < boardwidth; j++) {
            squares[i][j].show();
		}
    }
    for (a=0; a < amazons.length; a++) {
        amazons[a].show();
    }
}
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

function SquareSelecter(mouse_x, mouse_y) {
    /* Square selecter. Returns the square which is pressed after a 
    mousepressed event.*/
    // Checks wether a square is selected. Returns the selected square.
    let selection;
    for (i=0; i < boardwidth; i++) {
        for (j=0; j < boardwidth; j++) {
            if (board.matrix[i][j].x < mouse_x && 
                board.matrix[i][j].x + board.matrix[i][j].width > mouse_x && 
                board.matrix[i][j].y < mouse_y && 
                board.matrix[i][j].y + board.matrix[i][j].width > mouse_y) {
                    selection = [i, j];
            }
        }
    }
    if (selection) {
        return selection;
    }
    else {
        return [undefined, undefined];
    };
}

function ShowOptions(board, i, j){
    /*
    Shows all available options for a selected square in a board object.
    Options are squares that can be reached horizontally, vertically
    and diagonally from the selected square, without being obstructed
    by a flaming square or another amazon.
    */
   let options = []

   // Check above
   for (row = i - 1; row > -1; row--) {
       if (board.matrix[row][j].state == '0') {
           options.push([row, j])
       }
       else {
           break;
       }
   }

   // Check below
   for (row = i + 1; row < boardwidth; row++){
       if (board.matrix[row][j].state == '0') {
           options.push([row, j])
       }
       else {
           break;
       }
   }

    // Check left
    for (col = j - 1; col > -1; col--) {
        if (board.matrix[i][col].state == '0') {
            options.push([i, col])
        }
        else {
            break;
        }
    }

    // Check right
    for (col = j + 1; col < boardwidth; col++) {
        if (board.matrix[i][col].state == '0') {
            options.push([i, col])
        }
        else {
            break;
        }
    }

    let space_left = j;
    let space_right = boardwidth - j - 1;
    let space_up = i;
    let space_down = boardwidth - i - 1;


    // Check upleft
    for (offset = 1; offset <= min(space_left, space_up); offset++) {
        if (board.matrix[i - offset][j - offset].state == '0') {
            options.push([i - offset, j - offset]);
        }
        else {
            break;
        }
    }

    // Check upright
    for (offset = 1; offset <= min(space_right, space_up); offset++) {
        if (board.matrix[i - offset][j + offset].state == '0') {
            options.push([i - offset, j + offset]);
        }
        else {
            break;
        }
    }

    // Check downleft
    for (offset = 1; offset <= min(space_left, space_down); offset++) {
        if (board.matrix[i + offset][j - offset].state == '0') {
            options.push([i + offset, j - offset]);
        }
        else {
            break;
        }
    }

    // Check downright
    for (offset = 1; offset <= min(space_right, space_down); offset++) {
        if (board.matrix[i + offset][j + offset].state == '0') {
            options.push([i + offset, j + offset]);
        }
        else {
            break;
        }
    }

    return options;
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

    reset(state) {
        for (i = 0; i < boardwidth; i++) {
            for (j = 0; j < boardwidth; j++) {
                board.matrix[i][j].selected = false;
                board.matrix[i][j].option = false;
                board.state = state;
            }
        }        
    }

    show_options(i, j) {
        /*
        Shows all available options for a selected square in a board object.
        Options are squares that can be reached horizontally, vertically
        and diagonally from the selected square, without being obstructed
        by a flaming square or another amazon.
        */
        let options = [];

        // Check above
        for (let row = i - 1; row > -1; row--) {
            if (this.matrix[row][j].state == '0') {
                options.push([row, j])
            }
            else {
                break;
            }
        }

        // Check below
        for (let row = i + 1; row < boardwidth; row++){
            if (this.matrix[row][j].state == '0') {
                options.push([row, j])
            }
            else {
                break;
            }
        }

        // Check left
        for (let col = j - 1; col > -1; col--) {
            if (this.matrix[i][col].state == '0') {
                options.push([i, col])
            }
            else {
                break;
            }
        }

        // Check right
        for (let col = j + 1; col < boardwidth; col++) {
            if (this.matrix[i][col].state == '0') {
                options.push([i, col])
            }
            else {
                break;
            }
        }

        let space_left = j;
        let space_right = boardwidth - j - 1;
        let space_up = i;
        let space_down = boardwidth - i - 1;


        // Check upleft
        for (let offset = 1; offset <= min(space_left, space_up); offset++) {
            if (this.matrix[i - offset][j - offset].state == '0') {
                options.push([i - offset, j - offset]);
            }
            else {
                break;
            }
        }

        // Check upright
        for (let offset = 1; offset <= min(space_right, space_up); offset++) {
            if (this.matrix[i - offset][j + offset].state == '0') {
                options.push([i - offset, j + offset]);
            }
            else {
                break;
            }
        }

        // Check downleft
        for (let offset = 1; offset <= min(space_left, space_down); offset++) {
            if (this.matrix[i + offset][j - offset].state == '0') {
                options.push([i + offset, j - offset]);
            }
            else {
                break;
            }
        }

        // Check downright
        for (let offset = 1; offset <= min(space_right, space_down); offset++) {
            if (this.matrix[i + offset][j + offset].state == '0') {
                options.push([i + offset, j + offset]);
            }
            else {
                break;
            }
        }

        options.forEach(option => {
            this.matrix[option[0]][option[1]].option = true;
        });

        return options;
    }

    moveAmazon(current_i, current_j, target_i, target_j) {
        /*
        Moves a square which contains an Amazon to square i, j.
        */
        if (
            (board.matrix[current_i][current_j].state == "White Amazon") ||
            (board.matrix[current_i][current_j].state == "Black Amaon")
            ) {
                board.matrix[target_i][target_j].state = board.matrix[current_i][current_j].state
                board.matrix[current_i][current_j].state = '0'
            }
        else {
            return
        }
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
        this.selected = false;
        this.option = false;
    }

    show() {
        stroke(0);
        strokeWeight(2);
        if (this.selected == true) {
            fill(255, 218, 185); // yellow
        }
        else if (this.color == 'Black') {
            fill(139, 69, 19); // black

        }
        else {
            fill(255, 248, 220); // white
        }
        rect(this.x, this.y, this.width, this.width);

        if (this.state == "White Amazon" || this.state ==  "Black Amazon") {
            DrawAmazon(this.x, this.y, this.width, this.state);
        }

        if (this.option == true) {
            noStroke();
            fill(85, 107, 47, 100); // Green
            ellipseMode(CENTER);
            ellipse(this.x + 0.5 * this.width, 
                this.y + 0.5 * this.width, this.width/5, this.width/5);
        }
    }
}

async function sendLog(data) {
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    const response = await fetch('/api/logs', options);
    const json = await response.json();
    console.log(json);
}


function mousePressed() {
    let [i, j] = SquareSelecter(mouseX, mouseY);

    console.log(board.state);
    if (i != undefined) {
        const data = {
            i,
            j
        };
        sendLog(data);

        if (board.state == "white_selects") {
            if (board.matrix[i][j].state == "White Amazon") {
                if (board.matrix[i][j].selected == true) {
                    board.reset("white_selects");
                }
                else {
                    board.reset("white_selects");
                    board.matrix[i][j].selected = true;
                    options = board.show_options(i, j);
                    board.state = "white_moves";
                }
            } 
            else {
                board.reset("white_selects");
            }
        }

        else if (board.state == "white_moves") {
            // sit 1: square outside a selector square gets pressed:
            // Reset board to white selects.


            // sit 2: square is a selector square

        }

        else if (board.state == "white_shoots") {

        }
        else if (board.state == "black_selects") {

        }
        else if (board.state == "black_moves") {

        }
        else if (board.state == "black_shoots") {
            
        }
        else {
            console.log("Something went wrong, please try again.")
        }
    }
    else {
        for (c = 0; c < boardwidth; c++) {
            for (k = 0; k < boardwidth; k++) {
                board.matrix[c][k].selected = false;
                board.matrix[c][k].option = false;
            }
        }
    }
}

function setup() {
    createCanvas(boardwidth * sq_width, boardwidth * sq_width);
    board = new Board(
        0, 0, boardwidth * sq_width, 
        boardwidth * sq_width, sq_width, state = states[0], n_amazons = 2);
    board.fill_board();
    board.show();
}


function draw() {
    board.show();
}
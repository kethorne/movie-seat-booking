//object with array of movies is storing seats in array for that movie ✅
//function that will use array to update or add HTML (including selected seats line) ✅
//onClick of seat, add selected info (and update HTML)
//onClick of submit, change from selected to occupied
//onChange of dropdown, update HTML to use seats from object ✅
let movies = {
    "The Princess Bride": {seats: [], price: 10},
    "The Rocky Horror Picture Show": {seats: [], price: 12},
    "Breakfast Club": {seats: [], price: 8},
    "Labyrinth": {seats: [], price: 9},
    "Office Space": {seats: [], price: 14},
    "Monty Python and the Holy Grail": {seats: [], price: 12},
    "The Big Lebowski": {seats: [], price: 14},
};
// console.log(movies.Labyrinth.price)
// console.log(movies["Labyrinth"].price)
// console.log(movies[selectedMovie].price)
let selectedMovie;
let numseatsSelected = 0;
//generates the seat on first time opening page for each movie
const seatGenerator = () => {
    const titles = Object.keys(movies);
    console.log(titles);
    titles.forEach((title, index) => {
        console.log(`${title}`);
        let seats = [];
        for (let rows = 0; rows < 6; rows++) {
            let row = []
            for (let seats = 0; seats < 8; seats++) {
                row.push({selected: false, occupied: Math.random() < .5})
            }
            seats.push(row);
        }
        movies[ title ].seats = seats
    });
    console.log(movies)
}
seatGenerator();
//updates the HTML to reflect seats occupied and selected for the selected movie
const updateHTML = () => {
    const movie = movies[ selectedMovie ];
    const seatContainer = document.getElementById(`seat-container`);
    let htmlToUpdate = `<div class="screen"></div>`;
    for (const [rowIndex, row] of movie.seats.entries()) {
        htmlToUpdate += `<div class="row">`;
        for (const [seatIndex, seat] of row.entries()) {
            if (seat.occupied) {
                htmlToUpdate += `<div class="seat occupied" data-rowIndex="${rowIndex}" data-seatIndex="${seatIndex}"></div>`;
            } else if (seat.selected) {
                htmlToUpdate += `<div class="seat selected"  data-rowIndex="${rowIndex}" data-seatIndex="${seatIndex}"></div>`;
            } else {
                htmlToUpdate += `<div class="seat" data-rowIndex="${rowIndex}" data-seatIndex="${seatIndex}"></div>`;
            }
        }
        htmlToUpdate += `</div>`;
    }
    //use template literal to reflect number of seats selected ${}
    document.getElementById("selectedTextRow").innerHTML = `<div class="row">
        <div class="text">You have selected <span id="count">${numseatsSelected}</span> seats for
            the price of $<span id="total">${movies[ selectedMovie ].price * numseatsSelected}</span></div>
        </div>`
    seatContainer.innerHTML = htmlToUpdate;
    console.log(movies[ selectedMovie ].price);
    console.log(numseatsSelected);
}
//event listener for the selected movie
document.getElementById("movie").addEventListener("change", (ev) => {
    selectedMovie = ev.target.value
    updateHTML();
});
//seat selection on click event
document.getElementById('seat-container').addEventListener("click", (ev) => {
    const rowIndex = ev.target.getAttribute("data-rowIndex")
    const seatIndex = ev.target.getAttribute("data-seatIndex");
    movies[ selectedMovie ].seats[ rowIndex ][ seatIndex ].selected = true;
    //add one to seats selected
    numseatsSelected += 1;
    updateHTML();
});
//seat selected turns to occupied on submit button event
document.getElementById('submit').addEventListener('click', (ev) => {
    console.log(movies[ selectedMovie ].seats[ 0 ][ 1 ].selected)
    for (const [rowIndex, row] of movies[ selectedMovie ].seats.entries()) {
        for (const [seatIndex, seat] of row.entries()) {
            if (seat.selected) {
                seat.selected = false;
                seat.occupied = true;
                console.log(rowIndex, seatIndex)
            }
        }
    }
    updateHTML();
});

const container = document.querySelector('.seat-container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let seatSelectIndex = [];

populateUI();

let ticketPrice = +movieSelect.value;


//save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

function setSeatData(seatsIndex) {
    localStorage.setItem('selectedSeatIndex', seatsIndex);
}
//update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    console.log(seatsIndex);

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}


//gets data from local storage and populates UI
function populateUI() {
    let selectedSeats = JSON.parse(localStorage.getItem('selected)s'));
    console.log(selectedSeats);
    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null) {
        console.log(selectedMovieIndex);
        movieSelect.selectedIndex = selectedMovieIndex;
    }

}
//movie select event
movieSelect.addEventListener('change', ev => {
    ticketPrice = +ev.target.value;
    console.log(ev.target.selectedIndex, ev.target.value);

    setMovieData(ev.target.selectedIndex, ev.target.value);

    updateSelectedCount();
})

//event listener for selecting a seat
container.addEventListener('click', (ev) => {
    console.log(ev.target);
    if(ev.target.classList.contains('seat') && !ev.target.classList.contains('occupied')) {
        ev.target.classList.toggle('selected')
        seatSelectIndex.push([...seats].indexOf(ev.target));
        updateSelectedCount();
    }
});

// submit event to set seats to occupied after selecting them
document.getElementById("submit").addEventListener('click', ev => {
    for (const selectedIndex of seatSelectIndex){
        seats[selectedIndex].classList.toggle('selected');
        seats[selectedIndex].classList.toggle('occupied');
    }



    // seat = +ev.target.index;
    // console.log(ev.target.selectedIndex, ev.target.index);
    //
    // setSeatData(ev.target.selectedIndex, ev.target.index);
    //
    // updateSelectedCount();
})

//initial count and total set
updateSelectedCount();

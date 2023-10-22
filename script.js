const cards = document.querySelectorAll('.card');
const flippedList = Array.from({length: cards.length}, (index) => true);
const clickAudio = new Audio("./click.mp3")

function max(a, b) {
    if (a > b) return a;
    return b;
}

function getFavouriteSaved() {
    cookies = document.cookie;
    maximum = 0;
    cookies.split(';').forEach((cookie) => {
        maximum = max(Number(cookie.split('=')[0]), maximum);
    })
    return maximum;
}

var favouritesSaved = getFavouriteSaved();

function fetchRandomJoke() {
    cards.forEach(card => {
        // // To remove start
        // card.querySelector('.setup').textContent = "setup";
        // card.querySelector('.punchline').textContent = "punchline";
        // card.getElementsByClassName("setup")[0].style.display = "block";
        // card.getElementsByClassName("punchline")[0].style.display = "block";   
        // return;
        // // To remove end
        fetch('https://official-joke-api.appspot.com/random_joke')
        .then(response => response.json())
        .then(data => {
                card.querySelector('.setup').textContent = data.setup;
                card.querySelector('.punchline').textContent = data.punchline;
                card.getElementsByClassName("setup")[0].style.display = "block";
                card.getElementsByClassName("punchline")[0].style.display = "block";   
            })
            .catch(error => console.error('Error fetching jokes:', error));
        })
}

function fetchRandomQuote() {
    cards.forEach(card => {
    fetch('https://api.quotable.io/random')
        .then(response => response.json())
        .then(data => {
            card.querySelector('.quote').textContent = data.content;
            card.querySelector('.author').textContent = data.author;
            card.getElementsByClassName("quote")[0].style.display = "none";
            card.getElementsByClassName("author")[0].style.display = "none";
            })
        .catch(error => console.error('Error fetching quotes:', error));
    })
}


function flipCard(card, index) {
        clickAudio.play()
        if (flippedList[index]) {
            flippedList[index] = !flippedList[index];
            card.style.transform = 'rotateY(180deg)';
            setups = card.querySelectorAll('.setup');
            setups.forEach(setup =>{
                setup.style.display = "none";
            })
            punchlines = card.querySelectorAll('.punchline');
            punchlines.forEach(punchline =>{
                punchline.style.display = "none";
            })
            authors = card.querySelectorAll('.author');
            authors.forEach(author =>{
                author.style.transform = "rotateY(180deg)"
                author.style.display = "block";
            })
            contents = card.querySelectorAll('.quote');
            contents.forEach(content =>{
                content.style.transform = "rotateY(180deg)"
                content.style.display = "block";
            })
        } else {
            flippedList[index] = !flippedList[index];
            card.style.transform = 'rotateY(0deg)';
            authors = card.querySelectorAll('.author');
            authors.forEach(author =>{
                author.style.display = "none";
            })
            contents = card.querySelectorAll('.quote');
            contents.forEach(content =>{
                content.style.display = "none";
            })
            setups = card.querySelectorAll('.setup');
            setups.forEach(setup =>{
                setup.style.display = "block";
            })
            punchlines = card.querySelectorAll('.punchline');
            punchlines.forEach(punchline =>{
                punchline.style.display = "block";
            })
        }
}

function liked(card) {
    clickAudio.play()
    author = card.querySelector('.author').textContent;
    quote = card.querySelector('.quote').textContent;
    setup = card.querySelector('.setup').textContent;
    punchline = card.querySelector('.punchline').textContent;
    index = favouritesSaved + 1;
    document.cookie = index+"="+author+"|"+quote+"|"+setup+"|"+punchline+";max-age=36500";
    favouritesSaved += 1;
}

fetchRandomJoke();
fetchRandomQuote();
cards.forEach((card, index) => {
    card.addEventListener('click', () => {flipCard(card, index)});
});

document.querySelectorAll('.container').forEach(container => {
    container.querySelector('.fa').addEventListener('click',() => {liked(container.querySelector('.card'))});
})
const clickAudio = new Audio("./click.mp3");

function max(a,b) {
    if (a > b) return a;
    return b;
}

function getFavouriteSaved() {
    cookies = document.cookie;
    maximum = 0;
    cookies.split(';').forEach((cookie) => {
        try{
            maximum = max(Number(cookie.split('=')[0]), maximum);
        } catch (error) {
            console.error(error);
        }
    })
    return maximum;
}

var favouritesSaved = getFavouriteSaved();

var sampleCard = '<div class="container"><div class = "card"> <div class="setup"></div><div class="punchline"></div><div class = "quote"></div><div class = "author"></div></div><i class="fa fa-close"></i></div>'

function loadFavourites() {
    const main = document.querySelector('.main');
    cookies = document.cookie;
    cookies = cookies.split(";");
    cookies.forEach(cookie => {
        var [index, content] = cookie.split('=');
        if (content != "") {
        var [author, quote, setup, punchline] = content.split("|");
        main.innerHTML += sampleCard;
        const cards = main.querySelectorAll('.container');
        const lastCard = cards[cards.length - 1];
        lastCard.id=index;
        lastCard.querySelector('.author').textContent = author;
        lastCard.querySelector('.author').style.display = "none";
        lastCard.querySelector('.quote').textContent = quote;
        lastCard.querySelector('.quote').style.display = "none";
        lastCard.querySelector('.setup').textContent = setup;
        lastCard.querySelector('.punchline').textContent = punchline;
        }
    })
}

loadFavourites();

const cards = document.querySelectorAll('.card')
const flippedList = Array.from({length: cards.length}, (index) => true);

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

function unliked(card) {
    clickAudio.play()
    const index = card.id;
    document.cookie = index + "=;max-age=0;";
    card.parentElement.removeChild(card);

}

cards.forEach((card, index) => {
    card.addEventListener('click', () => {flipCard(card, index)});
});

document.querySelectorAll('.container').forEach(container => {
    container.querySelector('.fa').addEventListener('click',() => {unliked(container)});
})

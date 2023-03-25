const jokesContainer = document.getElementById("div-joke");
const jokesForm = document.getElementById("joke_form");

let currentLength = 0;
const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:666/api/jokes');
xhr.responseType = 'json';
xhr.send();
xhr.onload = () =>{
    const jokes = xhr.response;
    if(jokes.length){
        jokesContainer.innerHTML = '';
        jokes.forEach(joke =>{
            jokesContainer.innerHTML += getJokeHTML(joke);
        });
        currentLength = jokes.length;
    }
};
function getJokeHTML(joke){
    return`
    <div class="Jokes" id="joke_${joke.id}">
            <div id="Jokes-children">
                ${joke.content}
            <span>${joke.likes}</span>
            <div id="Jokes-children">
                <button id="button" onclick="like(${joke.id})">
                    <span class="material-symbols-outlined">
                        thumb_up
                    </span>
                </button>
            </div>
            <span>${joke.dislikes}</span>
            <div id="Jokes-children">
                <button id="button" onclick="dislike(${joke.id})">
                    <span class="material-symbols-outlined">
                        thumb_down
                    </span>
                </button>
            </div>
        </div>
                `  
}
jokesForm.addEventListener('submit', (event) =>{
    event.preventDefault();
    const content = jokesForm.text.value;
    const joke = {content}
    const addJokeXhr = new XMLHttpRequest();
    addJokeXhr.open('POST', 'http://localhost:666/api/jokes');
    addJokeXhr.send(JSON.stringify(joke));
    addJokeXhr.onload = () => {
        jokesContainer.innerHTML += getJokeHTML(joke);
        currentLength++;
    }
})
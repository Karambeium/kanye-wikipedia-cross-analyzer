const pokeURL = "https://pokeapi.co/api/v2/";
const yeURL = "https://api.kanye.rest/";
const twitterURL = "https://api.twitter.com/1.1/statuses/update.json?status=";
let currentPokemonData = {};
let currentPokemonJSON = {};
let currentYeData = {};
let currentYeJSON = {};
let currentWikiData = {};
let currentWikiJSON = {};
let totalWords = 0;
let imagizableWords = 0;
let alreadyImaged = false;
let quoteLength = 0;
let currentImagizable = 0;

async function getPokemonInfo() {
    try {
        currentPokemonData = await fetch(pokeURL + "pokemon/" + document.getElementById("pokemon-input").value);
        currentPokemonJSON = await currentPokemonData.json();
        console.log(currentPokemonJSON);
    } catch {
        console.log("Unable to Complete Request");
    }
}

async function getKanyeQuote() {
    alreadyImaged = false;
    document.getElementById("imagized").innerHTML = "";
    document.getElementById("word-list").innerHTML = "";
    currentImagizable = 0;
    quoteLength = 0;
    document.getElementById("current-quote-word-tally").innerHTML = "";
    try {
        currentYeData = await fetch(yeURL);
        currentYeJSON = await currentYeData.json();
        console.log(currentYeJSON);
        document.getElementById("quote").innerHTML = currentYeJSON.quote + "- Kanye West";
        
    } catch {
        console.log("Unable to Complete Request");
    }
}

function getImages() {
    if (!alreadyImaged) {
        let cleanQuote = currentYeJSON.quote.replace(/[^a-zA-Z ']/g,"");
        let quoteArray = cleanQuote.split(" ");
        quoteLength = quoteArray.length;
        let localImagizableWords = imagizableWords;
        console.log(quoteArray);
        quoteArray.forEach(element => {
            totalWords += 1;
            findImage(element);
        });
        alreadyImaged = true;
        if (localImagizableWords === imagizableWords) {
            document.getElementById("word-tally").innerHTML = imagizableWords
                + " words have been imagizable out of a total of "
                + totalWords + " total words.";
            document.getElementById("current-quote-word-tally").innerHTML = currentImagizable
                + " words in this quote have been imagizable out of "
                + quoteLength + " words in the current quote.";
        }
    }
}

async function findImage(element) {
    try {
        let wikiURL = "https://en.wikipedia.org/w/api.php?action=query&titles=" + element + "&prop=pageimages&format=json&pithumbsize=100&origin=*";
        console.log(wikiURL);
        currentWikiData = await fetch(
            wikiURL, {
        });
        currentWikiJSON = await currentWikiData.json();
        console.log(currentWikiJSON);
        console.log(Object.values(currentWikiJSON.query.pages)[0].title);
        let data = Object.values(currentWikiJSON.query.pages)[0];
        if (data.hasOwnProperty("thumbnail")) {
            console.log(data.thumbnail);
            document.getElementById("imagized").innerHTML += "<img src='" + data.thumbnail.source + "' style='transform: scale(auto);'></img>";
            imagizableWords += 1;
            currentImagizable += 1;
            document.getElementById("word-list").innerHTML += element.substring(0,1).toUpperCase().concat(element.substring(1)) + ", ";
            document.getElementById("word-tally").innerHTML = imagizableWords
                + " words have been imagizable out of a total of "
                + totalWords + " total words.";
            document.getElementById("current-quote-word-tally").innerHTML = currentImagizable
                + " words in this quote have been imagizable out of "
                + quoteLength + " words in the current quote.";
        } else {
            return;
        }
    } catch {
        console.log("oops");
    }
}
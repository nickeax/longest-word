const MAX_LENGTH = 8;
const ALPHABET = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

const lett = document.querySelector('#lett');
const inputLetters = document.querySelector('#inputLetters');
const resultsHeading = document.querySelector('#resultsHeading');

let results = [];

inputLetters.addEventListener('keyup', _ => {
    lettersArr = [];
    buildInputLetters(inputLetters.value);
    fetchTest();
})


class Letter {
    letter = '';
    used = false;

    constructor(l) {
        this.letter = l;
    }
}

let lettersArr = [];

function resetInputLetters() {
    lettersArr.forEach(x => {
        x.used = false;
    });
}

function buildInputLetters(str) {
    for(let i = 0; i < str.length; i++) {
        lettersArr.push(new Letter(str[i]));
    }
    lett.innerHTML = "";
    lettersArr.forEach(x => {
        console.log(lettersArr);
        
        lett.innerHTML += `<span class="inputLetters">${x.letter}</span>`;
    });
}

function processList(str) {
    let arr = str.split('\n');
    // arr = arr.filter(x => {
    //     return x.length <= inputLetters.value.length;
    // });

    arr = arr.map(x => {
        return x.trim();
    })
    return arr;
}

function longestWord(arr) {
    let arr2 = [];
    arr2 = arr.filter(x => {
        resetInputLetters();
        return canBeSpelt(x);
    });

    let tmpArr = arr2.sort((a, b) => {
        return b.length - a.length;
    });

    if (tmpArr.length === 0) {
        resultsHeading.innerHTML = "No words could be made from those letters!";
    } else resultsHeading.innerHTML = "Made from your letters";
    return tmpArr;
}

function canBeSpelt(str) {
    let numPassed = [];
    lettersArr.forEach(x => {
        if(x.used != true) {
            if(str.indexOf(x.letter) !== -1) {
                x.used = true;
                numPassed.push(1);
            }
        }
    });

    return str.length === numPassed.length;
}

// (async () => {
//     await fetchTest();
// })();

async function fetchTest() {
    let response = await fetch('words.txt');
    let responseText = await getTextFromStream(response.body);
    let resArr = longestWord(processList(responseText));
    
    let resultsList = document.querySelector('#resultsList');
    resultsList.innerHTML = "";    
    
    resArr.forEach(x => {
        resultsList.innerHTML += `<div class="resultsList">${x}</div>`;
    });
}

async function getTextFromStream(readableStream) {
    let reader = readableStream.getReader();
    let utf8Decoder = new TextDecoder();
    let nextChunk;

    let resultStr = '';

    while (!(nextChunk = await reader.read()).done) {
        let partialData = nextChunk.value;
        resultStr += utf8Decoder.decode(partialData);
    }

    return resultStr;
}
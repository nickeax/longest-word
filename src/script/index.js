import { words } from './data.js';
const MAX_LENGTH = 12;
const ALPHABET = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const lett = document.querySelector('#lett');
const inputLetters = document.querySelector('#inputLetters');
const resultsHeading = document.querySelector('#resultsHeading');

let firstUseFlag = false;
let lettersArr = [];
let allWords = [];
class Letter {
    letter = '';
    used = false;

    constructor(l) {
        this.letter = l;
    }
}

(function () {
    allWords = processList();
}());

inputLetters.addEventListener('keyup', _ => {
    firstUseFlag = true;
    lettersArr = [];
    if (inputLetters.value.length >= MAX_LENGTH) {
        inputLetters.value = "";
    }

    buildInputLetters(inputLetters.value);
    fetchTest();
})

function resetInputLetters() {
    lettersArr.forEach(x => {
        x.used = false;
    });
}

function buildInputLetters(str) {
    for (let i = 0; i < str.length; i++) {
        lettersArr.push(new Letter(str[i].toLowerCase()));
    }

    lett.innerHTML = "";

    lettersArr.forEach(x => {
        lett.innerHTML += `<span class="inputLetters">${x.letter}</span>`;
    });
}

function processList() {
    let arr = words;
    arr = arr.sort((a, b) => {
        return a.length - b.length;
    });

    arr = arr.map(x => {
        return x.trim();
    });

    return arr;
}

function longestWord() {
    let tmpArr = [];
    let i = 0;

    while (allWords[i].length <= lettersArr.length) {
        tmpArr.push(allWords[i++]);
    }

    let arr = tmpArr.filter(x => {
        return canBeSpelt(x);
    });

    arr = arr.sort((a, b) => {
        return b.length - a.length;
    });

    if (arr.length === 0 && !firstUseFlag) {
        resultsHeading.innerHTML = "No words could be made from those letters!";
    } else resultsHeading.innerHTML = "Words made from your letters";
    return arr;
}

function canBeSpelt(testWord) {
    resetInputLetters();
    let test = [];

    for (let i = 0; i < testWord.length; i++) {
        for (let j = 0; j < lettersArr.length; j++) {
            if (lettersArr[j].used === false && lettersArr[j].letter === testWord[i]) {
                test.push(testWord[i]);
                lettersArr[j].used = true;
            }
        }
    }
    let testStr = test.join('');
    return (testStr === testWord);
}

function fetchTest() {
    let resArr = longestWord();
    let resultsList = document.querySelector('#resultsList');
    resultsList.innerHTML = "";

    resArr.forEach(x => {
        let res = x.split('');
        res.forEach(y => {
            resultsList.innerHTML += `<span class="inputLetters">${y}</span>`;
        })
        resultsList.innerHTML += "<br>";
    });
}

function getTextFromStream() {
    return words;
}
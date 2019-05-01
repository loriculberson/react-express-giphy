require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const giphyAPIKey = process.env.GIPHY_API_KEY;
const wordnikAPIKey = process.env.WORDNIK_API_KEY;

const app = express();

const giphyAPI = `http://api.giphy.com/v1/gifs/search?api_key=${giphyAPIKey}&limit=1&offset=0&rating=G&lang=en&q=`;

const wordNikDetails = `?hasDictionaryDef=true&includePartOfSpeech=noun%2C%20adjective%2C%20verb&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&`

const wordNikAPI = `https://api.wordnik.com/v4/words.json/randomWord?${wordNikDetails}api_key=${wordnikAPIKey}`


// fetchWord resolves to an object that contains the word and the giphy 
const fetchWord = () => {
  return fetch(wordNikAPI)
  .then((res) => res.json())
  .then((json) => {
    console.log(json.word)
    return { 
      word: json.word, 
      giphyUrl: giphyAPI + json.word
    }
  })
}

const fetchGraphic = ({word, giphyUrl}) => {
  return fetch(giphyUrl)
    .then((res) => res.json())
    .then((json) => ({ 
      word: word, 
      imageUrl: json.data[0].images.fixed_height.url
    }))
}

const buildMediaObject = (res, {word, imageUrl}) => {
  const media = { word, imageUrl };
  res.send(media);
}

const buildErrorObject = (res) => {
  const media = { 
    word: 'Data not available!!!', 
    imageUrl: `https://media0.giphy.com/media/7lD9Gz5FxpRCg/200.gif`
  }
  res.send(media);
}

// app.get('/', (req, res) => res.send('Hello everyone!'))

app.get('/get-new-word', (req, res) => {
  fetchWord()
    .then(fetchGraphic)
    .then((...args) => buildMediaObject(res, ...args))
    .catch((...args) => buildErrorObject(res, ...args))
})

app.listen(5000, function () {
  console.log('Welcome to the app, listening on 5000!')
})
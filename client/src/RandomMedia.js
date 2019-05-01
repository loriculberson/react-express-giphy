import React, {useState} from 'react';
import './RandomMedia.css';

const RandomMedia = () => {
  const [ allMedia, setMedia ] = useState([{word: 'dog', giphyUrl: `https://media3.giphy.com/media/bbshzgyFQDqPHXBo4c/200.gif`}])

  const mediaList = allMedia.map((media, index) => {
    return (
      <div key={index}>
        <img src={media.giphyUrl} alt={media.dog}/>
        <p>{media.word}</p>
      </div>
    )
  })

  const generateMedia = () => {
    console.log("hi!!")
    // fetch word from the wordnik api 
    //pass word to giphy api
    //send the object of word and image url to client
    //console log the data in the console
    //add the media to state []
    //append the newest media to the DOM
  }

  return (
    <div className="App">
      <h1>Random Word & Giphy</h1>
      <button onClick={generateMedia}>Surprise!</button>
      {mediaList}
    </div>
  );
};

export default RandomMedia;

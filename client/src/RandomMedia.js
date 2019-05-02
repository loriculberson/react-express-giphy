import React, {useState} from 'react';
import axios from "axios";
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

  const updateMedia = (media) => setMedia([...allMedia, media])

  const generateMedia = async () => {
    // console.log('hi from generateMedia!')
    // fetch word from the wordnik api 
    //pass word to giphy api
    //send the object of word and image url to client
    //console log the data in the console
    //add the media to state []
    //append the newest media to the DOM
    const newMedia = await axios.get('/get-new-word');
    console.log('media', newMedia)
    return updateMedia(newMedia)
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

import React, {useState} from 'react';
import axios from "axios";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import styles from "./RandomMedia.module.css";

const RandomMedia = () => {
  const [ allMedia, setMedia ] = useState([])

  const mediaList = allMedia.map((media, index) => {
    return (
      <div className={styles.card}key={index}>
        <img src={media.imageUrl} alt={media.word}/>
        <p>{media.word}</p>
      </div>
    )
  })

  const updateMedia = (media) => setMedia([...allMedia, media])

  const generateMedia = async () => {
    try {
      const newMedia = await axios.get('/get-new-word');
      console.log('media:', newMedia.data)
      return updateMedia(newMedia.data)
    } catch(err) {
      console.log('MIKE ERROR:', err.response);
      toastr.error(`Error: ${err.response.status} ${err.response.data.error}`)
    }
  }
  
  const clearMedia = () => setMedia([])

  return (
    <div className={styles.app}>
      <section className={styles.header}>
      <section className={styles.error} data-error-results>error here</section>
        <h1>Random Word & Giphy</h1>
        <button data-surprise onClick={generateMedia}>Surprise!</button>
        <button onClick={clearMedia}>Clear</button>
      </section>
      <section data-media-results>
        {mediaList}
      </section>
    </div>
  );
};

export default RandomMedia;

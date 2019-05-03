import React, {useState} from 'react';
import axios from "axios";
import styles from "./RandomMedia.module.css";

const RandomMedia = () => {
  const [ allMedia, setMedia ] = useState([])

  const mediaList = allMedia.map((media, index) => {
    return (
      <div className={styles.card}key={index}>
        <img src={media.imageUrl} alt={media.dog}/>
        <p>{media.word}</p>
      </div>
    )
  })

  const updateMedia = (media) => setMedia([...allMedia, media])

  const generateMedia = async () => {
    const newMedia = await axios.get('/get-new-word');
    console.log('media', newMedia.data)
    return updateMedia(newMedia.data)
  }
  
  const clearMedia = () => setMedia([])

  return (
    <div className={styles.app}>
      <section className={styles.header}>
        <h1>Random Word & Giphy</h1>
        <button onClick={generateMedia}>Surprise!</button>
        <button onClick={clearMedia}>Clear</button>
      </section>
      <section className={styles.cardList}>
        {mediaList}
      </section>
    </div>
  );
};

export default RandomMedia;

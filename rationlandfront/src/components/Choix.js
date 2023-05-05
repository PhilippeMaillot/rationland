import { useState, useEffect } from 'react';
import '../styles/Choix.css'
export default function Choix() {
  const [question, setQuestion] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      const response = await fetch('/images');
      const data = await response.json();
      setImages(data);
    }
    fetchImages();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // ici vous pouvez envoyer la réponse de l'utilisateur à votre API pour la vérification
  }

  const handleNewQuestion = () => {
    const randomImageIndex = Math.floor(Math.random() * images.length);
    const randomImage = images[randomImageIndex];
    setQuestion(`Quel est le titre de ce jeu vidéo ? ${randomImage.name}`);
    setImageURL(randomImage.imageUrl);
  }

  return (
    <div>
      <h1>{question}</h1>
      <img src={imageURL} alt="Image de blind test" />
      <form onSubmit={handleSubmit}>
        <label htmlFor="reponse">Réponse :</label>
        <input type="text" id="reponse" name="reponse" />
        <button type="submit">Valider</button>
      </form>
      <button onClick={handleNewQuestion}>Nouvelle question</button>
    </div>
  );
}

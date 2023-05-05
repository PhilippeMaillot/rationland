import { useState, useEffect } from 'react';
import '../styles/Choix.css';

export default function Choix() {
  const [question, setQuestion] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [images, setImages] = useState([]);
  const [basePath, setBasePath] = useState('img/');

  useEffect(() => {
    async function fetchImages() {
      const response = await fetch('/images');
      const data = await response.json();
      const imagesWithFullPath = data.map(image => {
        return {
          ...image,
          path: basePath + image.imageUrl.split('/').pop()
        };
      });
      setImages(imagesWithFullPath);
    }
    fetchImages();
  }, [basePath]);

  const handleNewQuestion = () => {
    const randomImageIndex = Math.floor(Math.random() * images.length);
    const randomImage = images[randomImageIndex];
    setQuestion(`Quel est le titre de ce jeu vidéo ?`);
    setImagePath(randomImage.path);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reponseUtilisateur = e.target.reponse.value.toLowerCase();
    const reponseAttendue = imagePath.split('.')[0].toLowerCase();
    const estCorrect = reponseUtilisateur === reponseAttendue;
    setQuestion(`Quel est le titre de ce jeu vidéo ? La réponse était "${reponseAttendue}". Votre réponse est ${estCorrect ? 'correcte' : 'incorrecte'}.`);
  };

  return (
    <div>
      <h1>{question}</h1>
      {imagePath && <img src={require("../" + imagePath)} alt="Image de blind test" />} {/* Utilisation de require pour charger l'image */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="reponse">Réponse :</label>
        <input type="text" id="reponse" name="reponse" />
        <button type="submit">Valider</button>
      </form>
      <button onClick={handleNewQuestion}>Nouvelle question</button>
    </div>
  );
}

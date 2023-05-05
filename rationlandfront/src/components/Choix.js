import { useState, useEffect } from 'react';
import '../styles/Choix.css';

export default function Choix() {
  const [question, setQuestion] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [images, setImages] = useState([]);
  const [basePath, setBasePath] = useState('img/'); // ajout de l'état basePath

  useEffect(() => {
    async function fetchImages() {
      const response = await fetch('/images');
      const data = await response.json();
      const imagesWithFullPath = data.map(image => {
        return {
          ...image,
          path: basePath + image.imageUrl.split('/').pop() // construction du chemin complet
        };
      });
      setImages(imagesWithFullPath);
    }
    fetchImages();
  }, [basePath]); // écoute de l'état basePath

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
      {imagePath && <img src={imagePath} alt="Image de blind test" />} {/* utilisation de imagePath */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="reponse">Réponse :</label>
        <input type="text" id="reponse" name="reponse" />
        <button type="submit">Valider</button>
      </form>
      <button onClick={handleNewQuestion}>Nouvelle question</button>
    </div>
  );
}

async function getLocalAPIInfo(apiURL) {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

const apiURL = 'http://localhost:8000/jeux';
getLocalAPIInfo(apiURL)
  .then(data => console.log(data))
  .catch(error => console.error(error));
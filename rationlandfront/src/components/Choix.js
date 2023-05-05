import { useState } from 'react';

export default function Choix(){
  const [question, setQuestion] = useState('');
  const [imageURL, setImageURL] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // ici vous pouvez envoyer la réponse de l'utilisateur à votre API pour la vérification
  }

  const handleNewQuestion = () => {
    // ici vous pouvez appeler votre API pour récupérer une nouvelle question et une nouvelle image
    setQuestion('Quel est le titre de ce jeux vidéo ?');
    setImageURL('https://votreapi.com/image/blindtest.jpg');
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
  )
}

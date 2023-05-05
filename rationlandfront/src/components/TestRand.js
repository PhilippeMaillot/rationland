import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/App.css";

export default function TestRand() {
  const [jeu, setJeu] = useState(null);
  const [affichage, setAffichage] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [isMatch, setIsMatch] = useState(false);
  const [jeuxList, setJeuxList] = useState([]);
  const [filteredJeux, setFilteredJeux] = useState([]);
  const [showJeuxList, setShowJeuxList] = useState(false);

  const getRandomJeux = async () => {
    await axios.get("http://localhost:8000/nombrejeux")
      .then(function (res) {
        const randomNumber = Math.floor(Math.random() * res.data) + 1;
        getJeu(randomNumber);
      });
  };

  const getJeu = async (id) => {
    await axios.get("http://localhost:8000/jeux/" + id)
      .then(function (res) {
        console.log(res.data);
        setJeu(res.data);
        setAffichage(true);
      });
  };

  const fetchJeuxList = async () => {
    await axios.get("http://localhost:8000/jeux")
      .then(function (res) {
        setJeuxList(res.data.map(jeu => jeu.name));
      });
  };

  const checkMatch = () => {
    if (userInput.toLowerCase() === jeu.name.toLowerCase()) {
      setIsMatch(true);
    } else {
      setIsMatch(false);
    }
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
    if (event.target.value !== "") {
      const filtered = jeuxList.filter((jeu) =>
        jeu.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setFilteredJeux(filtered);
      setShowJeuxList(true);
    } else {
      setFilteredJeux([]);
      setShowJeuxList(false);
    }
  };

  const handleNextQuestion = () => {
    setAffichage(false);
    setUserInput("");
    setIsMatch(false);
    setShowJeuxList(false);
    getRandomJeux();
  };

  useEffect(() => {
    getRandomJeux();
    fetchJeuxList();
  }, []);

  return (
    <>
      {affichage ? (
        <div>
          <fieldset>
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
            />
            {showJeuxList && filteredJeux.length > 0 && (
              <ul>
                {filteredJeux.map((jeu, index) => (
                  <li key={index}>{jeu}</li>
                ))}
              </ul>
            )}
            <button onClick={checkMatch}>Valider</button>
            <button onClick={handleNextQuestion}>Question suivante</button>
            {isMatch ? (
              <p>Bravo, c'est le bon jeu !</p>
            ) : (
              <p>Ce n'est pas le bon jeu.</p>
            )}
            <img
              src={require("../img/" + jeu.imageUrl)}
              alt={jeu.name}
              style={{ width: "800px", height: "400px" }}
            />
          </fieldset>
        </div>
      ) : (
        <p>Chargement...</p>
      )}
    </>
  );
}

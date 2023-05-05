import axios from "axios"
import { useEffect, useState } from "react"

export default function TestRand(){
    const [jeux, setJeux]= useState('')
    const [affichage, setAffichage]= useState(false)

    const getRandomJeux= async() =>{
        await axios.get("http://localhost:8000/nombrejeux")
        .then(function (res) {
           const randomNumber = Math.floor(Math.random() * res.data) + 1;
            getJeux(randomNumber)
          }
        )
    }

    const getJeux= async(id)=>{
        await axios.get("http://localhost:8000/jeux/"+id)
        .then(function (res){
            console.log(res.data)
            setJeux(res.data)
            setAffichage(true)

        })
    }

    useEffect(()=>{
        getRandomJeux()
    },[])
    return(
        <>
        { affichage ? 
            <div>
              <fieldset>
              <p> id: {jeux.id} </p>
                <p> titre: {jeux.name} </p>
                <img src={require("../img/"+jeux.imageUrl)}/>
              </fieldset>
            </div>
        
  : <p>Chargement...</p> }
        </>
    )
}
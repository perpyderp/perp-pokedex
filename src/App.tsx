
import './App.css';

import { useState, useEffect } from "react";
import Grid from '@mui/material/Unstable_Grid2';
import Item from "@mui/material/Unstable_Grid2"
import { Pokemon } from './components/types';

import axios from "axios";

const totalPokemon: number = 1017;

function App() {

  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const url = "https://pokeapi.co/api/v2/pokemon/";

  useEffect(() => {
    for(let i: number = 1; i <= totalPokemon; i++) {
      axios.get(url + i)
        .then((response) => {
          // console.log(response);
          setPokemonData((prevData) => (
            [...prevData, { name: response.data["name"], types: response.data["types"]}]
          ))
        })
        .catch((error) => {
          console.log("There was an error getting pokemon data: " + error);
        })
    }
  }, [])

  return (
    <div className="App">
      <section id="pokemon-list" className="">
        <Grid container>
          <Grid md={6}>
            {pokemonData.map((pokemon, index) => (
                <Item key={index}>
                  {pokemon.name}
                </Item>
            ))}
          </Grid>
          <Grid md={6}>
              
          </Grid>
        </Grid>

      </section>
      <section id="pokemon-collected">
        <span>Collected: </span>
        <span>Seen: </span>
      </section>
      <footer>
        Created by <a href="https://github.com/perpyderp">Jacob Cuison</a>
      </footer>
    </div>
  );
}

export default App;

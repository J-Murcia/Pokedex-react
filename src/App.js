import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Pokedex from './components/Pokedex';
import Searchbar from './components/Searchbar';
import { getPokemonData, getPokemons, searchPokemon } from './Api';
import { FavoriteProvider } from './Context/FavoriteContext';

const {useState, useEffect} = React;

const localStorageKey = "favorite_pokemon";

export default function App() {
 
  const [pokemons, setPokemons] = useState([]);
  const [ page, setPage] = useState([0]);
  const [total,setTotal] = useState([0]);
  const [loading, setLoading] = useState([true]);
  const [favorites, setFavorites] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [searching, setSearching] = useState(false);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const data = await getPokemons(25, 25 * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url)
      });
      const results = await Promise.all(promises);
      setPokemons(results);
      setLoading(false);
      setTotal(Math.ceil(data.count / 25));
      setNotFound(false); // en case of searchbar empty, then i gets back to the initial screen (showing main amount of cards) ( setPokemons(results);  )
    } catch(err){} 
  }; 
  
  //*********************** Creado para trabajar el localStorage ***********************************/
  const loadFavoritePokemons = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
    setFavorites(pokemons);
  };

  useEffect(() => {
    loadFavoritePokemons();
  }, []);
  //********************************************************************************************** */


  useEffect(() => {
    if (!searching) { // cuando no se hace busqueda, se tenga los pokemones principales
      fetchPokemons();
    }
  },[page]);

  // **** se encarga de cambiar el emoji heart negro seleccionado en card a color rojo y suma ** //
  const updateFavoritePokemons = (name) => {
    const updated = [...favorites];
    const isFavorite = updated.indexOf(name); // Metodo indexOf devuelve el indice dentro del objeto String que realiza la llamada
    if (isFavorite >= 0) {
      updated.splice(isFavorite, 1); // Metodo splice permite cambiar el contenido del arreglo eliminando o sustituyendo elementos existentes por otros nuevos.
    }
    else {
      updated.push(name); // Metodo push es usado para agregar un elemento al final de un arreglo. 
    }
    setFavorites(updated);
          
            window.localStorage.setItem(localStorageKey, JSON.stringify(updated));
  };
  //***********************************************************************************************//

  //********************** Funcion para activar Searchbar ****************************************//
  const onSearch = async (pokemon) => {
    if(!pokemon) {
      return fetchPokemons();
    }
    setLoading(true); // para que mientras busca el pokemon, genera la alerta " Cargando Pokemones... " asignado en Pokedex
    setNotFound(false); // despues de haber buscado un pokemon existente o no, SEARCHBAR PERMITA REALIZAR OTRA BUSQUEDA ADICIONAL
    setSearching(true); // al buscar no obtengamos todos los pokemones
    const result = await searchPokemon(pokemon);
    if(!result) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    else {
    setPokemons([result]); // para que muestre el pokemon buscado en caso que exista
    setPage(0);
    setTotal(1); // cambia el indice de paginacion en caso de busqueda efectiva de pokemon existente 
    }
    setLoading(false); // luego completa la busqueda desactiva la alerta " Cargando Pokemones... "
    setSearching(false); // luego de haber efectuado una carga una busqueda desactivamos porque ya se encontro el pokemon deseado
  }
 //**********************************************************************************************//


  return (
    <FavoriteProvider value={{
      favoritePokemons: favorites,
       updateFavoritePokemons: updateFavoritePokemons
       }}>
    <div>
      <NavBar />
    <div className="App">
      <Searchbar onSearch={onSearch} />
      {notFound ? ( 
      <div className="no-results-found"> No se encontro el Pokemon que buscabas  <a href='https://emojitool.com/loudly-crying-face'>😭</a></div>
      ) : (
      <Pokedex loading={loading} pokemons={pokemons} page={page} setPage={setPage}
      total={total}
      />
      )}
    </div>
    </div>
    </FavoriteProvider>
  );
}
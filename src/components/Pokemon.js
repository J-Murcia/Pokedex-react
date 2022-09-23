import React, { useContext } from "react";
import FavoriteContext from "../Context/FavoriteContext";

const Pokemon = (props) => {

    const { pokemon } = (props);
    const {favoritePokemons, updateFavoritePokemons} = useContext(FavoriteContext);

    const blackHeart = "🖤";
    const redHeart = "❤️";

    const heart = favoritePokemons.includes(pokemon.name) ? redHeart : blackHeart;

    const clickHeart = (e) => {
        e.preventDefault(); // evita cualquier efecto secundario al darle click al boton 
        updateFavoritePokemons(pokemon.name);
    }

    return (
        <div className="pokemon-card"> 
        <div className="pokemon-img-container">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
        <div className="card-body">
            <div className="card-top">
                <h3>{pokemon.name}</h3>
                <div>#{pokemon.id}</div>
            </div>
            <div className="card-bottom">   
            <div className="pokemon-type">
                {pokemon.types.map((type, idx) => {
                return <div key={idx} className="pokemon-type-text">{type.type.name}</div>
            })}
                </div> 
                <button onClick={clickHeart}><div className="pokemon-favorite"> {heart} </div> </button>
            
            </div> 
        </div>
        </div>
    );
};

// en el retunr del ejemplo no tiene los parentesis, yo si se los deje

export default Pokemon; 
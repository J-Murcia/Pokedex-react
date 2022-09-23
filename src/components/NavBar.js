import React from "react";
import FavoriteContext from "../Context/FavoriteContext";


const {useContext} = React;


const NavBar = () => {

    const { favoritePokemons } = useContext(FavoriteContext);



    let imgUrl = "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"


    return (
     <nav> 
        <div></div>
        <div>
        <img src={imgUrl} alt="pokeApi-logo" className="navbar-image"/>
        </div>
        <div> &#10084;&#65039; {favoritePokemons.length}</div>
    </nav>
    );
};

export default NavBar;
import React from "react";
const {useState} = React;


const Searchbar = (props) => {

    const { onSearch }   = props;

    const [search, setSearch] = useState('');

// ************* Eventos JS para activar funciones de los botones ****************//
    const onChange = (e) => {
        setSearch(e.target.value);
        //****** seteado cuando el buscador este vacio **********//
         if (e.target.value.length === 0) {
            setSearch(null);
         }
         //******************************************************//
    };

    const onClick = async (e) => {
        onSearch(search);
    };

//********************************************************************************//
    
    return (
         <div className="searchbar-container">
        <div className="searchbar">
            <input placeholder="Buscar pokemon..."
            onChange={onChange} />
        </div>
        <div className="searchbar-btn">
           <button onClick={onClick}>Buscar</button>
        </div>
    </div>
    );

};


export default Searchbar;
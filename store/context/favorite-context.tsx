import { createContext, useState } from "react";

export const FavoriteContext:any = createContext({
    ids:[],
    addFavorite: (id:any) => {},
    removeFavorite: (id:any) => {}
});

const FavoriteContextProvider =({children}:any)=>{

    const [favoriteMealIds, setFavoriteMealIds] = useState([]);

    const addFavorite = (id:any) => {
        setFavoriteMealIds((currentFav):any => [...currentFav, id])
    }

    const removeFavorite = (id:any) => {
        setFavoriteMealIds((currentFav):any => currentFav.filter((ids => ids !== id)))
    }

    const value = {
        ids: favoriteMealIds,
        addFavorite: addFavorite,
        removeFavorite: removeFavorite
    }

    return (<FavoriteContext.Provider value={value} >{children}</FavoriteContext.Provider>)
}

export default FavoriteContextProvider;
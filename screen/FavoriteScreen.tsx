import { StyleSheet, Text, View } from "react-native"
import MealsIteam from "./MealsIteam"
import { FlatList } from "react-native-gesture-handler"
import { MEALS } from "../data/dummyData"
import { useContext } from "react"
import { FavoriteContext } from "../store/context/favorite-context"
import { useSelector } from "react-redux"
import { RootState } from "../store/redux/store"

const FavoriteScreen = ():JSX.Element =>{

    // const favoriteMealCtx:any = useContext(FavoriteContext)
    const favoriteMeals = useSelector((state:RootState)=> state.favoriteMeals.ids);

    // to display meals data on screen
    // const displayedMeals = MEALS.filter((mealIteam)=> favoriteMealCtx.ids.includes(mealIteam.id))
    const displayedMeals = MEALS.filter((mealsIteam)=> favoriteMeals.includes(mealsIteam.id))

    const renderMealItem =(iteamData:any) =>{
        const item = iteamData.item
        const mealData = {
            id:item.id,
            title: item.title,
            imageUrl: item.imageUrl,
            duration: item.duration,
            complexity: item.complexity,
            affordability: item.affordability
        }
        
        return (
            <MealsIteam {...mealData}/>
        )
    }

    // if(favoriteMealCtx.ids.length === 0){
    //     return(
    //         <View style={styles.rootContainer}>
    //             <Text style={styles.text}>You have no favorite meal yet!</Text>
    //         </View>
    //     )
    // }

    if(favoriteMeals.length === 0){
        return(
            <View style={styles.rootContainer}>
                <Text style={styles.text}>You have no favorite meal yet!</Text>
            </View>
        )
    }

     return(
        <View style={styles.container}>
            <FlatList data={displayedMeals} keyExtractor={(ele)=> ele.id} renderItem={renderMealItem}/>
        </View>
    )
    
}

const styles = StyleSheet.create({
    rootContainer: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    text:{
        fontSize: 18,
        fontWeight:'bold',
        color: '#fff'
    },
    container:{
        flex:1,
        padding:16
    },

}) 

export default FavoriteScreen;
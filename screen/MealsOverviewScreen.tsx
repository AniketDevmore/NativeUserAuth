import { FlatList, StyleSheet, Text, View } from "react-native"
import { CATEGORIES, MEALS } from "../data/dummyData";
import MealsIteam from "./MealsIteam";
import { useEffect, useLayoutEffect } from "react";

// as navigation we will get route prop for registered component
const MealsOverviewScreen = ({route, navigation}:any):JSX.Element => {

    //  to get data from parent
    const catId = route.params.categoryId;

    // to display meals data on screen
    const displayedMeals = MEALS.filter((mealIteam)=>{
        return mealIteam.categoryIds.indexOf(catId) >= 0
    })

    //  to show dynamic name of the screen
    useLayoutEffect(()=>{
        const categoryTitle = CATEGORIES.find((ele)=>(ele.id === catId))?.title
        navigation.setOptions({
            title: categoryTitle
        })
    },[catId, navigation])

    // to pass data to MealsIteam screen
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

    return(
        <View style={styles.container}>
            <FlatList data={displayedMeals} keyExtractor={(ele)=> ele.id} renderItem={renderMealItem}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:16
    }
}) 

export default MealsOverviewScreen;
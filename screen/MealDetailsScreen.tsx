import { Button, Image, ScrollView, StyleSheet, Text, View } from "react-native"
import { MEALS } from "../data/dummyData"
import MealDetail from "./MealDetail"
import { useContext, useLayoutEffect } from "react"
import { FavoriteContext } from "../store/context/favorite-context"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/redux/store"
import { addFavorite, removeFavorite } from "../store/redux/favorite"

const MealDetailScreen = ({route, navigation}:any):JSX.Element =>{
  // get data from context file context
  // const favoriteMealCtx:any = useContext(FavoriteContext)
  const dispatch = useDispatch()
  const favoriteMealIds = useSelector((state:RootState) => state.favoriteMeals.ids)

  // get meals id from parent
    const mealId:any = route.params.mealId

    //  get meals data from all data
    const seletedMeal:any = MEALS.find((meal) => meal.id === mealId);

    //  find out favorite meal context
    // const mealsFavorite = favoriteMealCtx.ids.includes(mealId);
    const mealsFavorite = favoriteMealIds.includes(mealId);

     // to pass data to mealDetails children
     const mealData = {
        duration: seletedMeal.duration,
        complexity: seletedMeal.complexity,
        affordability: seletedMeal.affordability
    }

    //  on top screen button screen click handle context
    // const headerButtonPressHandler = () =>{
    //     if(mealsFavorite){
    //       favoriteMealCtx.removeFavorite(mealId)
    //     } else{
    //       favoriteMealCtx.addFavorite(mealId)
    //     }
    // }

        const headerButtonPressHandler = () =>{
        if(mealsFavorite){
          dispatch(removeFavorite({id: mealId}))
        } else{
          dispatch(addFavorite({id: mealId}))
        }
    }

    //  add icon button at the top of the screen
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight: () =>{
                return (<View style={mealsFavorite ? styles.topBtnTrue : styles.topBtnFalse}>
                  <Button title="Add Me!" onPress={headerButtonPressHandler}/>
                </View>)
            }
        })
    },[navigation,headerButtonPressHandler])
    
    return (
        <ScrollView style={styles.root}>
            <Image source={{uri: seletedMeal?.imageUrl}} style={styles.image}/>
            <Text style={styles.title}>{seletedMeal?.title}</Text>
            <MealDetail {...mealData} textStyle={styles.detailText}/>

            <View style={styles.listOuter}>
              <View style={styles.listContainer}>
                   <View style={styles.subtitleContainer}>
                       <Text style={styles.subTitle}>Ingredients</Text>
                  </View>
                  {seletedMeal.ingredients.map((ing:any)=> (
                     <View key={ing} style={styles.listItem}>
                         <Text style={styles.itemText}>{ing}</Text>
                     </View>
                 ))}
                 <View style={styles.subtitleContainer}>
                        <Text style={styles.subTitle}>Steps</Text>
                 </View>
                 {seletedMeal.steps.map((step:any)=> (
                     <View key={step} style={styles.listItem}>
                        <Text style={styles.itemText}>{step}</Text>
                     </View>
                ))}
              </View>
            </View>
        </ScrollView>
    )
}

export default MealDetailScreen;

const styles = StyleSheet.create({
  topBtnTrue:{
    borderWidth: 2,
    borderColor: 'yellow'
  },
  topBtnFalse:{
    borderWidth: 2,
    borderColor: 'transparent'
  },
    root:{
        marginBottom:32
    },
  image:{
    width: '100%',
    height: 350,
  },
  title:{
    fontWeight: 'bold',
    fontSize: 24,
    margin: 8,
    textAlign:'center',
    color:'#fff'
  },
  detailText:{
    color:'#fff'
  },
  subtitleContainer:{
    padding: 6,
    marginHorizontal:12,
    marginVertical:4,
    borderBottomColor: '#e2b497',
    borderBottomWidth: 2
  },
  subTitle:{
    color:'#e2b497',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign:'center',
  },
  listItem:{
    borderRadius:6,
    paddingHorizontal: 8,
    paddingVertical:4,
    marginVertical: 4,
    marginHorizontal: 12,
    backgroundColor: '#e2b497'
  },
  itemText:{
    color:'#351401',
    textAlign:'center'
  },
  listOuter:{
    alignItems:'center'
  },
  listContainer:{
    width:'80%'
  }
})
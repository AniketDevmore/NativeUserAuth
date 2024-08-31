import { useNavigation } from "@react-navigation/native"
import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native"
import MealDetail from "./MealDetail";

const MealsIteam = ({id, title, imageUrl, duration, complexity, affordability}:any):JSX.Element =>{

    const navigation:any = useNavigation();

    const selectMealHandler =()=>{
        navigation.navigate('MealDetail', {
            mealId: id
        })
    }

    // to pass data to mealDetails children
    const mealData = {
        duration: duration,
        complexity: complexity,
        affordability: affordability
    }

    return(
        <View style={style.mealItm}>
            <Pressable android_ripple={{color:'#ccc'}} style={({pressed}) => (pressed) ? style.buttonPressed : null} onPress={selectMealHandler}>
                <View style={style.innerContainer}>
                    <Image source={{uri: imageUrl}} style={style.image}/>
                    <Text style={style.title}>{title}</Text>
                </View>
                <MealDetail {...mealData}/>
            </Pressable>
        </View>
    )
}

const style = StyleSheet.create({
    mealItm:{
        margin:16,
        borderRadius: 8,
        overflow:Platform.OS === 'android' ? 'hidden' : 'visible',
        backgroundColor:'#fff',
        elevation: 4,
        shadowColor:'black',
        shadowOpacity:0.35,
        shadowOffset: {width: 0, height:2},
        shadowRadius: 16,
    },
    buttonPressed:{
        opacity:0.5,
    },
    innerContainer:{
        borderRadius: 8,
        overflow: 'hidden'
    },
    image:{
        width:'100%',
        height:200
    },
    title:{
        fontWeight:'bold',
        textAlign:'center',
        fontSize:18,
        margin:8
    },

})

export default MealsIteam;
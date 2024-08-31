import { FlatList, View } from "react-native"
import { CATEGORIES } from "../data/dummyData";
import CategoryGridTile from "./CategoryGridTile";


// navigation is special prop provides by navigation
const CategoriesScreen = ({navigation}:any):JSX.Element =>{  
    
    // flatlist render iteam function
    const renderCategoruIteam =(iteamData:any) => {

        const pressHandler = () =>{
            // to pass data to next components from this by navigation use {} as second parameter
             navigation.navigate('MealsOverview',{
                categoryId: iteamData.item.id
             })
        }
            return (
                <CategoryGridTile title={iteamData.item.title} color={iteamData.item.color} onPress={pressHandler}/>
            )
    }


    return(
        <FlatList data={CATEGORIES} keyExtractor={(ele)=> ele.id} renderItem={renderCategoruIteam} numColumns={2}/>
    )
}

export default CategoriesScreen;
import { StyleSheet, Text, View } from "react-native"

const MealDetail = ({duration,complexity,affordability, styles, textStyle}:any):JSX.Element =>{

    return(
        <View style={[style.details, styles]}>
              <Text style={[style.detailIteam, textStyle]}>{duration}m</Text>     
              <Text style={[style.detailIteam, textStyle]}>{complexity.toUpperCase()}</Text>
              <Text style={[style.detailIteam, textStyle]}>{affordability.toUpperCase()}</Text>
        </View>
    )
}

export default MealDetail;

const style = StyleSheet.create({
    details:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        padding: 8
    },
    detailIteam:{
        marginHorizontal: 4,
        fontSize:12
    }
})
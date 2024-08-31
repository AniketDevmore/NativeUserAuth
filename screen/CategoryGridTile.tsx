import { Platform, Pressable, StyleSheet, Text, View } from "react-native"

const CategoryGridTile = ({title, color, onPress}:any):JSX.Element =>{
    return(
        <View style={[styles.gridIteam, {backgroundColor:color}]}>
            <Pressable style={({pressed})=>[styles.button, pressed ? styles.buttonPressed : null]} android_ripple={{color:'#ccc'}} onPress={onPress}>
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    gridIteam: {
        flex:1,
        margin:16,
        height:150,
        borderRadius:8,
        backgroundColor:'white',
        elevation:4,
        // to add shadow on ios below can do for android set Pressable attribute as android_ripple
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowOffset: {width: 0, height:2},
        shadowRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible'
    },
    button:{
       flex:1, 
    },
    buttonPressed:{
        opacity:0.5,
    },
    innerContainer:{
        flex:1,
        padding:16,
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        fontWeight: 'bold',
        fontSize: 18,
    }
})

export default CategoryGridTile;
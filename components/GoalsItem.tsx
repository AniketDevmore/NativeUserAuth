import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

function GoalsItems (props:any) {

    return(
        <View>

       <FlatList data={props.allGoals} renderItem={(ele)=> (
          <Pressable onPress={props.delete.bind(ele, ele.index)}>
            <Text style={styles.goalIteam} key={ele.index}>{ele.item}</Text>
          </Pressable>
      
        )} alwaysBounceVertical={false}/>

       </View>
    )
}

const styles = StyleSheet.create({
    goalsContainer: {
        marginBottom: 20,
        height: 'auto'
    },
    goalIteam:{
        margin: 8,
        padding: 8,
        borderRadius: 6,
        backgroundColor: 'gray',
        color: '#fff'
    }
})

export default GoalsItems;
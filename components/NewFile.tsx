import React, { useState } from "react";
import {Button, StyleSheet, Text, TextInput, View, ScrollView, FlatList} from 'react-native'
import GoalsItems from "./GoalsItem";

function NewFile (): JSX.Element {

    const [goals, setGoals] = useState(String);
    const [allGoals, setAllGoals] = useState<string[]>([])

    const goalInputHandler=(event: string)=>{
        setGoals(event)
    };

    const goalClickHandler=()=>{
        setAllGoals(allGoals => [...allGoals, goals])
    }

    // on press delete 
    const deleteGoalHandler = (ele:number) =>{
        allGoals.splice(ele, 1)
        setAllGoals([...allGoals])
    }

return(
    <View style={styles.outer}>
        {/* <Text style={styles.mainPara}>Hello </Text>
        <View>
            <Text style={styles.innerText}>AAA</Text>
        </View>
        <View>
            <Button title="Click" />
        </View> */}
        <View style={styles.inputContainer}>
            <TextInput onChangeText={goalInputHandler} style={styles.textInput} placeholder="Your Goals..."/>
            <Button title="Add Goal" onPress={goalClickHandler}/>
        </View>
       <View style={styles.goalsContainer}>

       <GoalsItems allGoals={allGoals} delete={deleteGoalHandler}/>

       </View>

    </View>
)
}

const styles = StyleSheet.create({
    outerDiv: {
        margin: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainPara: {
        color: 'red',
        fontSize: 50,
    },
    innerText:{
        margin: 16,
        borderWidth: 1,
        borderColor: 'red',
        padding: 16,
    },


    outer: {
        paddingTop: 50,
        paddingHorizontal: 16,
        height: 580
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 24,
        marginBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    textInput:{
        borderWidth: 1,
        borderColor: '#cccccc',
        width: '70%',
        marginRight: 8,
        padding: 8
    },
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

 export default NewFile;
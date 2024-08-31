import { Pressable, Text, View } from "react-native";


const IconButton = ({onPress}:any):JSX.Element =>{

    return( 
        <Pressable onPress={onPress}>
            <Text>A</Text>
        </Pressable>
    )
}

export default IconButton;
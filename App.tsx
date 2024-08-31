import 'react-native-gesture-handler';

import { ActivityIndicator, AppRegistry, TouchableOpacity } from 'react-native';
import { name as newNative } from './app.json';


import React, { useContext, useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import NewFile from './components/NewFile';
import CategoriesScreen from './screen/CategoriesScreen';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MealsOverviewScreen from './screen/MealsOverviewScreen';
import MealDetailScreen from './screen/MealDetailsScreen';;
import FavoriteScreen from './screen/FavoriteScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FavoriteContextProvider from './store/context/favorite-context';
import { Provider } from 'react-redux';
import { store } from './store/redux/store';
import AuthContextProvider, { AuthContext } from './store/context/auth-context';
import { Colors } from './constants/styles';
import SignupScreen from './screen/SignupScreen';
import LoginScreen from './screen/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

AppRegistry.registerComponent(newNative, () => App);



function App(): JSX.Element {
  // const navigation = useNavigation();
  const Stack = createNativeStackNavigator();
  
  const Drawer = createDrawerNavigator();

 
  
  const Drawerstack = () => {
    const authCtx:any = useContext(AuthContext)
    const logoutHandler = () => {
      authCtx.logout()
    };
    return (
      <Drawer.Navigator screenOptions={{ headerStyle: { backgroundColor: '#351401' }, headerTintColor: 'white', sceneContainerStyle: { backgroundColor: '#3f2f25' }, drawerContentStyle: { backgroundColor: '#351401' }, drawerInactiveTintColor: '#fff', drawerActiveBackgroundColor: '#e4baa1', drawerActiveTintColor: '#351401' }}>
        <Drawer.Screen name='Categories' component={CategoriesScreen} options={{ title: 'All Categories', headerRight: ()=>{
          return(
            <TouchableOpacity onPress={logoutHandler} style={styles.logoutBtn}>
              <Text>Log Out</Text>
            </TouchableOpacity>
          )
        } }} />
        <Drawer.Screen name='Favorite' component={FavoriteScreen} />
      </Drawer.Navigator>
    )
  }

  const AuthScreen = () => {

    return(
      <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
    )
  }

  const AuthenticatedScreen = () => {
  //   <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#351401' }, headerTintColor: 'white', contentStyle: { backgroundColor: '#3f2f25' } }}>
  //   <Stack.Screen name='CategoriesScreen' component={Drawerstack} options={{ headerShown: false }} />
  //   <Stack.Screen name='MealsOverview' component={MealsOverviewScreen}

  //   // options={({route, navigation}:any)=> {
  //   //   const catId = route.params.categoryId;
  //   //   return {title: catId}

  //   // }}
  //   />
  //   {/* <Stack.Screen name='test' component={Drawerstack}/>  */}

  //   <Stack.Screen name='MealDetail' component={MealDetailScreen}
  //   // options={{headerRight:():any =>{
  //   //   return (<Button title='Tap me!'/>)
  //   // }}}
  //   />
  // </Stack.Navigator>

    return (
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#351401' }, headerTintColor: 'white', contentStyle: { backgroundColor: '#3f2f25' } }}>
        {/* we can put this screenOption inside stack.screen as well as option but we have to pss it in all components so we are passing in stack.navigator */}
       
        <Stack.Screen name='CategoriesScreen' component={Drawerstack} options={{ headerShown: false }} />
        <Stack.Screen name='MealsOverview' component={MealsOverviewScreen}

        // options={({route, navigation}:any)=> {
        //   const catId = route.params.categoryId;
        //   return {title: catId}

        // }}
        />
        {/* <Stack.Screen name='test' component={Drawerstack}/>  */}

        <Stack.Screen name='MealDetail' component={MealDetailScreen}
        // options={{headerRight:():any =>{
        //   return (<Button title='Tap me!'/>)
        // }}}
        />
      </Stack.Navigator>
    )
  }

  const Navigations = () => {
    const authCtx:any = useContext(AuthContext)
    console.log('authCtx------------->>',authCtx)
    return(
      <NavigationContainer>
        {!authCtx.isAuthenticated && <AuthScreen />}
        {authCtx.isAuthenticated && <AuthenticatedScreen />}
      </NavigationContainer>
      )
  }

  const Root = () => {
  const [isLoading, setIsloading] = useState(true);
    const authCtx:any = useContext(AuthContext);

    useEffect(() => {
      async function fetchtoken() {
          const storedtoken = await AsyncStorage.getItem('token')
          if (storedtoken) {
            authCtx.authenticate(storedtoken);
          }

          setIsloading(false)
      }
      fetchtoken();
    }, [])

    if(isLoading){
      return <ActivityIndicator color={'#fff'} size={'small'}/>
    }

    return <Navigations/>;
  }

  return (
    // <SafeAreaView >
    //   <NewFile/>
    // </SafeAreaView>
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={'#351401'} />
      {/* <FavoriteContextProvider> */}
      <Provider store={store}>
        <AuthContextProvider>
          <Root/>
        </AuthContextProvider>
      </Provider>
      {/* </FavoriteContextProvider> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#24180f'
  },
  logoutBtn:{
    backgroundColor:'red', 
    marginRight: 15, 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    borderRadius: 6
  }
})

export default App;
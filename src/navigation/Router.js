import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Activities, ActivitiesDetail, MyPlan, Profile, AddProfileForm, EditProfileForm, DeleteProfileForm} from '../screens';
import {Element3 , Activity, TaskSquare, UserSquare} from 'iconsax-react-native'; 
import { fontType, colors } from '../theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
function MainApp() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.green(),
        tabBarInactiveTintColor: colors.black(),
        tabBarStyle: {
          paddingBottom: 10,
          paddingTop: 5,
          height: 70,
        },
        tabBarLabelStyle: {
          marginTop: 5,
          fontSize: 10,
          fontFamily: fontType['Pjs-Medium'],
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused, color}) => (
            <Element3  
              color={color}
              variant={focused ? 'Bold' : 'Linear'}
              size={24}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Activities"
        component={Activities}
        options={{
          tabBarLabel: 'Activities',
          tabBarIcon: ({focused, color}) => (
            <Activity 
              color={color}
              variant={focused ? 'Bold' : 'Linear'}
              size={24}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MyPlan"
        component={MyPlan}
        options={{
          tabBarLabel: 'MyPlan',
          tabBarIcon: ({focused, color}) => (
            <TaskSquare  
              color={color}
              variant={focused ? 'Bold' : 'Linear'}
              size={24}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused, color}) => (
            <UserSquare
              color={color}
              variant={focused ? 'Bold' : 'Linear'}
              size={24}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ActivitiesDetail"
        component={ActivitiesDetail}
        options={{
          headerShown: false, 
          animationEnabled: true,
          animationTypeForReplace: 'pop',
          gestureEnabled: true,
          gestureDirection : 'horizontal',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
  name="AddProfileForm"
  component={AddProfileForm}
  options={{
    headerShown: true,  // Mengaktifkan header jika ingin menampilkannya
    title: 'Edit Profile',
    animationEnabled: true,
    animationTypeForReplace: 'pop',
    gestureEnabled: true,
    gestureDirection: 'horizontal',
    ...TransitionPresets.SlideFromRightIOS,
  }}
/>
<Stack.Screen
  name="EditProfileForm"
  component={EditProfileForm}
  options={{
    headerShown: true,
    title: 'Edit Profile',
    animationEnabled: true,
    animationTypeForReplace: 'pop',
    gestureEnabled: true,
    gestureDirection: 'horizontal',
    ...TransitionPresets.SlideFromRightIOS,
  }}
/>
<Stack.Screen
  name="DeleteProfileForm"
  component={DeleteProfileForm}
  options={{
    headerShown: true,
    title: 'Delete Profile',
    animationEnabled: true,
    animationTypeForReplace: 'pop',
    gestureEnabled: true,
    gestureDirection: 'horizontal',
    ...TransitionPresets.SlideFromRightIOS,
  }}
/>

    </Stack.Navigator>
  );
};
export default Router;

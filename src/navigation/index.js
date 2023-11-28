import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import {
  AntDesign,
  Entypo,
  Ionicons,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";
import { useEffect } from "react";
import { loginUser, setLoading } from "../store/authSlice";
const Navigation = () => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          loginUser({
            uid: authUser.uid,
            username: authUser.displayName,
            email: authUser.email,
          })
        );
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
        console.log("User is not logged in.");
      }
    });
  }, []);
  function BottomTabNav() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Dashboard"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo
                  name="home"
                  size={24}
                  color="#002580"
                  style={{ marginBottom: -3 }}
                />
              ) : (
                <AntDesign
                  name="home"
                  size={24}
                  color="black"
                  style={{ marginBottom: -3 }}
                />
              ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons
                  name="md-person-circle-sharp"
                  size={24}
                  color="black"
                />
              ) : (
                <Ionicons
                  name="md-person-circle-outline"
                  size={24}
                  color="black"
                />
              ),
            headerStyle: {
              backgroundColor: "#195F57",
            },
          }}
        />
      </Tab.Navigator>
    );
  }

  const user = useSelector((state) => state.user.user);
  const isLoading = useSelector((state) => state.user.isLoading);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            name="main"
            component={BottomTabNav}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}

        <Stack.Screen
          name="Signup"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;

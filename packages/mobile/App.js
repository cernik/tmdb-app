import * as React from "react";
import { AsyncStorage, Button, Text, TextInput, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "./src/SplashScreen";
import LoginScreen from "./src/LoginScreen";
import HomeScreen from "./src/HomeScreen";
import DetailsScreen from "./src/DetailsScreen";
import FavoritesScreen from "./src/FavoritesScreen";

import AuthContext from "./src/context";

const Stack = createStackNavigator();

const initialState = {
  isLoading: true,
  isLoggedOut: false,
  user: null,
};

function useAuthReducerWithContext() {
  const [state, dispatch] = React.useReducer((prevState, action) => {
    switch (action.type) {
      case "RESTORE":
        return {
          ...prevState,
          user: action.user,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          isLoggedOut: false,
          user: action.user,
        };
      case "LOGOUT":
        return {
          ...prevState,
          isLoggedOut: true,
          user: undefined,
        };
    }
  }, initialState);

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let user;

      try {
        const data = await AsyncStorage.getItem("user");
        if (data && typeof data === "string") {
          user = JSON.parse(data);
        }
      } catch (e) {
        throw e;
      }
      dispatch({ type: "RESTORE", user });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      login: async data => {
        AsyncStorage.setItem("user", JSON.stringify(data));
        dispatch({ type: "LOGIN", user: data });
      },
      logout: () => {
        AsyncStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
      },
      user: state.user,
    }),
    [state.user]
  );

  return [state, authContext];
}

const App = ({ navigation }) => {
  const [state, authContext] = useAuthReducerWithContext();
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{ headerShown: false }}
            />
          ) : !state.user ? (
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
                animationTypeForReplace: state.isLoggedOut ? "pop" : "push",
              }}
            />
          ) : (
            <React.Fragment>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Details" component={DetailsScreen} />
              <Stack.Screen name="Favorites" component={FavoritesScreen} />
            </React.Fragment>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;

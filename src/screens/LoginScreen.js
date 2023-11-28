import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { darkGreen } from "../components/Constants";
import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { auth, db } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setLoading } from "../store/authSlice";
import { useNavigation } from "@react-navigation/native";
const LoginScreen = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const isLoading = useSelector((state) => state.user.isLoading);
  const login = async () => {
    dispatch(setLoading(true));
    await auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        db.collection("users")
          .doc(auth.currentUser.uid)
          .get()
          .then((user) => {
            // dispatch(loginUser(user.data().currentUser));
            // navigation.navigate("main");
          });
      })
      .catch((error) => {
        alert(error);
      });
    dispatch(setLoading(false));
  };
  return (
    <View>
      <View style={{ alignItems: "center", width: 460 }}>
        <Text
          style={{
            color: "black",
            fontSize: 54,
            fontWeight: "bold",
            marginVertical: 20,
          }}
        >
          Login
        </Text>
        <View
          style={{
            backgroundColor: "white",
            height: 700,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 100,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 40, color: darkGreen, fontWeight: "bold" }}>
            Welcome Back
          </Text>
          <Text
            style={{
              color: "grey",
              fontSize: 19,
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            Login to your account
          </Text>

          <TextInput
            id="email"
            value={email}
            placeholder="Email / Username"
            style={{
              borderRadius: 100,
              color: darkGreen,
              paddingHorizontal: 10,
              width: "78%",
              backgroundColor: "rgb(220,220, 220)",
              marginVertical: 10,
            }}
            placeholderTextColor={darkGreen}
            onChangeText={setEmail}
          />
          <TextInput
            id="password"
            value={password}
            secureTextEntry
            placeholder="Password"
            onChangeText={setPassword}
            style={{
              borderRadius: 100,
              color: darkGreen,
              paddingHorizontal: 10,
              width: "78%",
              backgroundColor: "rgb(220,220, 220)",
              marginVertical: 10,
            }}
            placeholderTextColor={darkGreen}
          ></TextInput>
          <View
            style={{
              alignItems: "flex-end",
              width: "78%",
              paddingRight: 16,
              marginBottom: 200,
            }}
          >
            <Text
              style={{ color: darkGreen, fontWeight: "bold", fontSize: 16 }}
            >
              Forgot Password ?
            </Text>
          </View>

          <TouchableOpacity
            onPress={login}
            style={{
              backgroundColor: darkGreen,
              borderRadius: 100,
              alignItems: "center",
              width: 350,
              paddingVertical: 5,
              marginVertical: 10,
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>
              {isLoading ? "Loading" : "Login"}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Don't have an account ?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Signup")}
            >
              <Text
                style={{ color: darkGreen, fontWeight: "bold", fontSize: 16 }}
              >
                Signup
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});

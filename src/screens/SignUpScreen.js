import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { darkGreen } from "../components/Constants";
import { auth, db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setLoading } from "../store/authSlice";
const SignUpScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);
  const submit = () => {
    if (name == "" || email == "" || password == "" || confirm == "") {
      alert("All information is required");
    } else if (confirm !== password) {
      alert("Password donot matched");
    } else {
      dispatch(setLoading(true));
      auth
        .createUserWithEmailAndPassword(email, confirm)
        .then(() => {
          db.collection("users")
            .doc(auth.currentUser.uid)
            .set({
              uid: auth.currentUser.uid,
              name,
              email,
            })
            .then((user) => {
              alert("Account created successfully");
              navigation.navigate("Login");
              console.log(user);
            });
        })
        .catch((error) => {
          alert(error);
        });
      dispatch(setLoading(false));
    }
  };
  return (
    <View>
      <View style={{ alignItems: "center", width: 460 }}>
        <Text
          style={{
            color: "white",
            fontSize: 64,
            fontWeight: "bold",
            marginTop: 20,
          }}
        >
          Register
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 19,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          Create a new account
        </Text>
        <View
          style={{
            backgroundColor: "white",
            height: 700,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 50,
            alignItems: "center",
          }}
        >
          <TextInput
            id="name"
            value={name}
            onChangeText={setName}
            placeholder="Full Name"
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

          <TextInput
            id="email"
            value={email}
            onChangeText={setEmail}
            placeholder="Email / Username"
            style={{
              borderRadius: 100,
              color: darkGreen,
              paddingHorizontal: 10,
              width: "78%",
              backgroundColor: "rgb(220,220, 220)",
              marginVertical: 20,
            }}
            placeholderTextColor={darkGreen}
          ></TextInput>
          <TextInput
            id="password"
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry={true}
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
          <TextInput
            id="confirm"
            placeholder="Confirm Password"
            secureTextEntry={true}
            value={confirm}
            onChangeText={setConfirm}
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
              display: "flex",
              flexDirection: "row",
              width: "78%",
              paddingRight: 16,
              marginTop: 20,
            }}
          >
            <Text style={{ color: "grey", fontSize: 16 }}>
              By signing in, you agree to our{" "}
            </Text>
            <Text
              style={{ color: darkGreen, fontWeight: "bold", fontSize: 16 }}
            >
              Terms & Conditions
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              width: "78%",
              paddingRight: 16,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "grey", fontSize: 16 }}>and </Text>
            <Text
              style={{ color: darkGreen, fontWeight: "bold", fontSize: 16 }}
            >
              Privacy Policy
            </Text>
          </View>

          <TouchableOpacity
            onPress={submit}
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
              {isLoading ? "Loading" : "SignUp"}
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
              Already have an account ?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text
                style={{ color: darkGreen, fontWeight: "bold", fontSize: 16 }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;

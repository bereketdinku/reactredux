import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { darkGreen } from "../components/Constants";
import { getAuth, updatePassword, updateProfile } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, loginUser, logoutUser } from "../store/authSlice";
import { auth } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
const ProfileScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [authemail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const current = useSelector((state) => state.user.user);
  const isLoading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();
  const user = getAuth().currentUser;
  //update
  const submit = async () => {
    if (authemail == "" || password == "" || confirm == "") {
      alert("All information is required");
    } else if (current.email != authemail) {
      alert("Email is not yours");
    } else {
      dispatch(setLoading(true));
      await updatePassword(user, confirm)
        .then(() => {
          updateProfile(user, {
            displayName: name,
          });
          alert("Updated");
        })
        .catch((error) => {
          console.log(error);
        });
      dispatch(setLoading(false));
    }
  };

  // logout

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
          Update
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 19,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          edit profile
        </Text>
        <View
          style={{
            backgroundColor: "white",
            height: 700,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 50,
            alignItems: "center",
            marginTop: 50,
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
            value={authemail}
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
              {isLoading ? "Updating" : "Update"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

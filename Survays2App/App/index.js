import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axiosClient from "../AxiosClient/Axios";
import { Stack, useRouter } from "expo-router";
import { Styles } from "../Styles/MainStyles";
import { Colors, Sizes } from "../Styles/Themes";
import { Logo3 } from "../Styles/Images";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function App() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [passConf, setPassConf] = useState("");
  const [password, setPassword] = useState("");
  const [pageType, setPageType] = useState(true);
  const [userToken, setUserToken] = useState("");
  const [error, setError] = useState();
  const [data, setData] = useState([]);
  useEffect(() => {
    AsyncStorage.setItem("USER_TOKEN", "").then((data) => {});
  }, []);
  const SendData = () => {
    let response;
    if (pageType) {
      response = axiosClient.post("/login", { email, password });
    } else {
      response = axiosClient.post("/signup", {
        name: fullName,
        email,
        password,
        password_confirmation: passConf,
      });
    }
    response
      .then(({ data }) => {
        setData(data);
        AsyncStorage.setItem("USER_TOKEN", data.token);
        AsyncStorage.getItem("USER_TOKEN").then((Token) => {
          router.push("/Pages/dashboard");
        });
      })
      .catch((error) => {
        const finaleError = Object.values(error.response.data.errors).reduce(
          (accum, next) => [...next, ...accum],
          []
        );
        setError(finaleError);
      });
  };
  return (
    <SafeAreaView style={Styles.SafeAreaLoginPage}>
      <Stack.Screen
        options={{
          title: "",
          headerStyle: {
            backgroundColor: Colors.secondBackgroundColor,
          },
          headerShadowVisible: false,
        }}
      />
      <ScrollView>
        {error && (
          <View style={Styles.errorMessage}>
            {error.map((err, index) => (
              <Text key={index} style={Styles.errorText}>
                {err}
              </Text>
            ))}
          </View>
        )}
        {pageType === true ? (
          <View style={Styles.LoginPage}>
            <Image
              style={Styles.LoginLogo}
              resizeMode="contain"
              source={Logo3}
              tintColor={Colors.main}
            />
            <Text style={Styles.LoginText}>Login To Your Account:</Text>
            <Text style={Styles.InputText}>Email:</Text>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={Styles.Input}
              keyboardType="email-address"
              placeholder="Please Type Your Email"
            />
            <Text style={Styles.InputText}>Password:</Text>
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={Styles.Input}
              placeholder="Please Type Your Password"
              secureTextEntry
            />
            <TouchableOpacity style={Styles.LoginButton} onPress={SendData}>
              <Text style={Styles.LoginButtonText}>Login</Text>
            </TouchableOpacity>
            <Text style={Styles.accountQuestion}>
              Don`t Have An Account?{" "}
              <TouchableOpacity
                onPress={() => {
                  setError("");
                  setPageType(false);
                }}
              >
                <Text style={Styles.accountqubutton}>Create One</Text>
              </TouchableOpacity>{" "}
            </Text>
          </View>
        ) : (
          <View style={Styles.LoginPage}>
            <Image
              style={Styles.LoginLogo}
              resizeMode="contain"
              source={Logo3}
              tintColor={Colors.main}
            />
            <Text style={Styles.LoginText}>Create New Account</Text>
            <Text style={Styles.InputText}>Full Name:</Text>
            <TextInput
              value={fullName}
              onChangeText={(text) => setFullName(text)}
              style={Styles.Input}
              placeholder="Please Type Your Full Name"
            />
            <Text style={Styles.InputText}>Email:</Text>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={Styles.Input}
              keyboardType="email-address"
              placeholder="Please Type Your Email"
            />
            <Text style={Styles.InputText}>Password:</Text>
            <TextInput
              value={password}
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
              style={Styles.Input}
              placeholder="Please Type Your Password"
            />
            <Text style={Styles.InputText}>Password Confirmation:</Text>
            <TextInput
              value={passConf}
              secureTextEntry
              onChangeText={(text) => setPassConf(text)}
              style={Styles.Input}
              placeholder="Confirm Your Password"
            />
            <TouchableOpacity style={Styles.LoginButton} onPress={SendData}>
              <Text style={Styles.LoginButtonText}>Sign Up</Text>
            </TouchableOpacity>
            <Text style={Styles.accountQuestion}>
              Already Have An Account?{" "}
              <TouchableOpacity
                onPress={() => {
                  setError("");
                  setPageType(true);
                }}
              >
                <Text style={Styles.accountqubutton}>Login</Text>
              </TouchableOpacity>{" "}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

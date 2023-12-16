import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Colors } from "../../Styles/Themes";
import { HeaderStyle, MainPageStyle } from "../../Styles/MainStyles";
import { Logo3, Menu, Person1 } from "../../Styles/Images";
import { useState, useEffect } from "react";
import { useRouter, Stack } from "expo-router";
import axiosClient from "../../AxiosClient/Axios";
import { ScrollView } from "react-native";
import { FlatList } from "react-native";
import SurvayListItem from "../Components/SurvayListItem";
function survays() {
  const router = useRouter();
  const [sidePanel, setSidePanel] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
  useEffect(() => {
    setLoading(true);
    axiosClient
      .get("/survay")
      .then(({ data }) => {
        setData(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    axiosClient.get("me").then(({ data }) => {
      setCurrentUser(data);
    });
  }, []);
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerStyle: HeaderStyle.mainStyle,
          title: "",
          headerTitleAlign: "left",
          headerTintColor: Colors.white,
          headerShadowVisible: false,
          headerLeft: () => <Image source={Logo3} style={HeaderStyle.logo} />,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                sidePanel == true ? setSidePanel(false) : setSidePanel(true);
              }}
            >
              <Image
                source={Menu}
                style={HeaderStyle.sidePanelLogo(sidePanel)}
              />
            </TouchableOpacity>
          ),
        }}
      />
      {sidePanel && (
        <View style={HeaderStyle.sidePanel}>
          {currentUser && (
            <View style={HeaderStyle.currentUserCon}>
              <View style={HeaderStyle.currentUserImageCon}>
                <Image source={Person1} style={HeaderStyle.currentUserLogo} />
              </View>
              <View>
                <Text style={HeaderStyle.currentUserName}>
                  {currentUser.name}
                </Text>
                <Text style={HeaderStyle.currentUserEmail}>
                  {currentUser.email}
                </Text>
              </View>
            </View>
          )}
          <View style={HeaderStyle.sidePanelActionsCon}>
            <TouchableOpacity
              style={HeaderStyle.linkBtn}
              onPress={() => {
                router.replace("Pages/dashboard");
              }}
            >
              <Text style={HeaderStyle.linkText}>Dashboard</Text>
            </TouchableOpacity>
            <View style={HeaderStyle.linkDivider} />
            <TouchableOpacity
              style={HeaderStyle.linkBtnSelected}
              onPress={() => {
                router.replace("Pages/survays");
              }}
            >
              <Text style={HeaderStyle.linkText}>Survays</Text>
            </TouchableOpacity>
            <View style={HeaderStyle.linkDivider} />
            <TouchableOpacity
              style={HeaderStyle.linkBtn}
              onPress={() => {
                axiosClient.post("/logout").then(() => {
                  router.back();
                });
              }}
            >
              <Text style={HeaderStyle.linkText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {loading && (
        <ActivityIndicator
          color={Colors.main}
          size="100px"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        />
      )}
      {!loading && (
        <ScrollView>
          <View
            style={{
              width: "100%",
              backgroundColor: Colors.white,
              padding: 20,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Survays</Text>
          </View>
          <View style={MainPageStyle.mainViewCon}>
            {data.map((survay, index) => (
              <SurvayListItem survay={survay} key={index} />
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default survays;

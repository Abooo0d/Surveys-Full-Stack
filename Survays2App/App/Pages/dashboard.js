import { Stack, useRouter } from "expo-router";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Colors } from "../../Styles/Themes";
import { Styles, HeaderStyle, MainPageStyle } from "../../Styles/MainStyles";
import { Logo3, Menu, Person1 } from "../../Styles/Images";
import axiosClient, { setToken } from "../../AxiosClient/Axios";
import { useState, useEffect } from "react";
import LatestSurvay from "../Components/LatestSurvay";
import TotalItems from "../Components/TotalItems";
import LatestAnswers from "../Components/LatestAnswers";
import MainButton from "../Components/Core/mainButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Dashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState([]);
  const [data, setData] = useState();
  const [sidePanel, setSidePanel] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const GetData = () => {
    axiosClient
      .get("/dashboard")
      .then((res) => {
        setData(res.data);
        setLoading(false);
        return res;
      })
      .catch((err) => {
        if (err.response.status == 401) {
          setLoading(true);
          GetData();
        } else {
          setLoading(false);
        }
        return err;
      });
    axiosClient.get("me").then(({ data }) => {
      setCurrentUser(data);
    });
  };
  useEffect(() => {
    setLoading(true);
    setToken();
    GetData();
    setLoading(false);
  }, []);
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerStyle: HeaderStyle.mainStyle,
          title: "",
          headerTitleAlign: "left",
          headerTintColor: "#fff",
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
              style={HeaderStyle.linkBtnSelected}
              onPress={() => {
                router.replace("Pages/dashboard");
              }}
            >
              <Text style={HeaderStyle.linkText}>Dashboard</Text>
            </TouchableOpacity>
            <View style={HeaderStyle.linkDivider} />
            <TouchableOpacity
              style={HeaderStyle.linkBtn}
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
          size="400"
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
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Dashboard</Text>
            <MainButton
              color={Colors.green}
              text="Create New Survay"
              ClickEvent={() => router.push(`/Edit/0`)}
            />
          </View>
          {data && (
            <View style={MainPageStyle.mainViewCon}>
              {data.latestSurvay && (
                <LatestSurvay survay={data.latestSurvay}>
                  <MainButton
                    color={Colors.main}
                    text="Edit"
                    ClickEvent={() =>
                      router.push(`/Edit/${data.latestSurvay.id}`)
                    }
                  />
                  <MainButton
                    color={Colors.green}
                    text="View"
                    ClickEvent={() =>
                      router.push(`/View/${data.latestSurvay.id}`)
                    }
                  />
                </LatestSurvay>
              )}
              {data.totalSurvays && (
                <TotalItems title="Total Survays" count={data.totalSurvays} />
              )}
              {data.totalAnswers && (
                <TotalItems title="Total Answers" count={data.totalAnswers} />
              )}
              {data.latestAnswers && (
                <LatestAnswers answers={data.latestAnswers} />
              )}
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
export default Dashboard;

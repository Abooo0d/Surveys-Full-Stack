import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useGlobalSearchParams, useRouter, Stack } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Colors } from "../../Styles/Themes";
import { Styles, HeaderStyle, MainPageStyle } from "../../Styles/MainStyles";
import { Logo3, Menu, Person1 } from "../../Styles/Images";
import MainButton from "../Components/Core/mainButton";
import Checkbox from "expo-checkbox";
import axiosClient from "../../AxiosClient/Axios";
import * as FileSystem from "expo-file-system";
import DatePicker from "react-native-date-picker";
function EditSurvay() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState([]);
  const [sidePanel, setSidePanel] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [open, setOpen] = useState(false);
  const { id } = useGlobalSearchParams();
  const [survay, setSurvay] = useState({
    title: "",
    slug: "",
    status: "",
    description: "",
    image: "",
    image_url: "",
    expire_date: new Date(),
    questions: [],
  });
  const onImageChange = (ev) => {
    const uri =
      Platform.OS === "android"
        ? ev.replace("file://", "")
        : ev.replace("file://", "");
    const filename = ev.split("/").pop();
    const ext = filename.split(".")[1];
    const type = ext ? `image/${ext}` : `image`;
    const formData = new FormData();
    formData.append("image", {
      uri,
      name: `image.${ext}`,
      type,
    });
    setSurvay({ ...survay, image: formData._parts[0][1].uri });
    console.log(formData._parts[0][1].uri);
    // console.log(survay);
    // setSurvay({ ...survay, image: uri, image_url: uri });
    // console.log(survay.image);
  };

  const SendData = () => {
    axiosClient
      .post("/survay", survay)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        if (err && err.response) {
          const status = err.response.data.message;
          console.log(status);
        }
      });
  };
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
              style={HeaderStyle.linkBtn}
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
      <ScrollView>
        {id == 0 && (
          <>
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
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Create New Survay
              </Text>
            </View>
            <View
              style={{
                padding: 20,
                backgroundColor: Colors.backgroundColor,
                marginVertical: 20,
              }}
            >
              {/* Image */}
              <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Photo:</Text>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                    marginTop: 10,
                  }}
                >
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                      borderWidth: 2,
                      borderColor: Colors.main,
                      borderRadius: 10,
                    }}
                    source={{
                      uri:
                        survay.image_url !== ""
                          ? survay.image_url
                          : "https://static.vecteezy.com/system/resources/previews/004/999/463/non_2x/shopping-cart-icon-illustration-free-vector.jpg",
                    }}
                  />
                  {/* <MainButton
                    text="Change"
                    color={Colors.main}
                    ClickEvent={() => {
                      DocumentPicker.getDocumentAsync().then((file) => {
                        onImageChange(file.assets[0].uri);
                        // console.log(file.assets[0].uri);
                        // setSurvay({
                        //   ...survay,
                        //   image: file.assets[0].uri,
                        //   image_url: file.assets[0].uri,
                        // });
                      });
                    }}
                  /> */}
                </View>
              </View>
              <View style={HeaderStyle.sectionDivider} />
              {/* Image */}
              {/* Title */}
              <View style={{ marginVertical: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Survay Title:
                </Text>
                <TextInput
                  value={survay.title}
                  onChangeText={(text) => setSurvay({ ...survay, title: text })}
                  style={Styles.Input}
                  placeholder="Please Type The Survay Title"
                />
              </View>
              <View style={HeaderStyle.sectionDivider} />
              {/* Title */}
              {/* Description */}
              <View style={{ marginVertical: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Survay Description:
                </Text>
                <TextInput
                  multiline={true}
                  numberOfLines={6}
                  style={{ ...Styles.Input, textAlignVertical: "top" }}
                  placeholder="Please Type The Survay Description"
                  value={survay.description}
                  onChangeText={(text) => {
                    setSurvay({ ...survay, description: text });
                  }}
                />
              </View>
              <View style={HeaderStyle.sectionDivider} />
              {/* Description */}
              {/* Expire Date */}
              <View style={{ marginVertical: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Survay Expire Date:
                </Text>
                <TouchableOpacity
                  style={{ ...Styles.Input }}
                  onPress={() => {
                    setOpen(true);
                    DateTimePickerAndroid.open({
                      mode: "date",
                      value: new Date(),
                      display: "spinner",
                      onChange: (event, date) => {
                        let newDate =
                          date.getFullYear() +
                          "-" +
                          date.getMonth() +
                          "-" +
                          date.getDate();
                        console.log(newDate);
                        setSurvay({ ...survay, expire_date: newDate });
                        setTimeout(() => {
                          console.log(survay.expire_date);
                        }, 1000);
                      },
                    });
                  }}
                >
                  <Text style={{ fontSize: 20, color: Colors.darkGray }}>
                    {
                      (survay.expire_date = ""
                        ? "DD/MM/YYYY"
                        : survay.expire_date.toString())
                    }
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={HeaderStyle.sectionDivider} />
              {/* Expire Date */}
              {/* Active */}
              <View
                style={{
                  marginVertical: 20,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Checkbox
                  value={survay.status}
                  onValueChange={(active) => {
                    setSurvay({ ...survay, status: active });
                  }}
                  style={{
                    backgroundColor: Colors.white,
                    borderWidth: 3,
                    borderColor: Colors.main,
                    padding: 5,
                    marginRight: 20,
                  }}
                  color={Colors.main}
                />
                <View>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    Active
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Colors.lightGray,
                    }}
                  >
                    Whether To Make The Survay Publicly Available
                  </Text>
                </View>
              </View>
              {/* Active */}
            </View>
            <MainButton
              color={Colors.red}
              text="Send"
              ClickEvent={() => SendData()}
            />
          </>
        )}
        {id != 0 && (
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
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Update Survay [{id}]
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default EditSurvay;

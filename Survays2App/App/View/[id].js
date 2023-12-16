import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { HeaderStyle, MainPageStyle, Styles } from "../../Styles/MainStyles";
import { Image } from "react-native";
import { Logo3, Menu, Person1 } from "../../Styles/Images";
import { TouchableOpacity } from "react-native";
import axiosClient from "../../AxiosClient/Axios";
import { ActivityIndicator } from "react-native";
import { Colors } from "../../Styles/Themes";
import { ScrollView } from "react-native";
import { TextInput } from "react-native";
import Checkbox from "expo-checkbox";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { Picker } from "@react-native-picker/picker";
import MainButton from "../Components/Core/mainButton";
function ViewSurvay() {
  let answers = {};
  const [allAnswers, setAllAnswers] = useState({});
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState([]);
  const [data, setData] = useState();
  const [sidePanel, setSidePanel] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const { id } = useGlobalSearchParams();
  const [current, setCurrent] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const SendData = () => {
    console.log(answers);
  };
  const getData = () => {
    setLoading(true);
    axiosClient
      .get(`/survay/${id}`)
      .then(({ data }) => {
        setData(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
    axiosClient
      .get("/me")
      .then(({ data }) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        setError(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  let firstSelectedOptions = ["", "", "", "", ""];
  const [selectedOptions, setSelectedOptions] = useState(firstSelectedOptions);
  let firstValues = [false, false, false, false, false];
  const [values, setValues] = useState(firstValues);
  function onCheckboxChanged(option, value, index, question) {
    const second = values.map((v, i) => {
      if (i === index) {
        return (v = value);
      } else return v;
    });
    setValues(second);
    answers[question.id] = values;
    const secondOptions = selectedOptions.map((v, i) => {
      if (i == index) {
        return (v = option.text);
      } else {
        return v;
      }
    });
    setSelectedOptions(secondOptions);
    console.log(selectedOptions);
  }
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerStyle: HeaderStyle.mainStyle,
          title: "Survay Details",
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
        <ScrollView style={{ padding: 20 }}>
          {data && (
            <View style={MainPageStyle.card}>
              <Text
                style={{
                  textAlign: "center",
                  color: Colors.main,
                  fontSize: 30,
                  fontWeight: "bold",
                  marginBottom: 20,
                }}
              >
                {data.title}
              </Text>
              <Image
                source={{ uri: data.image_url }}
                style={{
                  width: "100%",
                  height: 200,
                  borderRadius: 6,
                  borderWidth: 3,
                  borderColor: Colors.main,
                  marginBottom: 20,
                }}
                resizeMode="cover"
              />
              <View
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: 5,
                  marginBottom: 20,
                }}
              >
                <Text style={{ color: Colors.lightGray, fontSize: 18 }}>
                  Expire Date:
                </Text>
                <Text style={{ color: Colors.darkGray, fontSize: 20 }}>
                  {data.expire_date}
                </Text>
              </View>
              <Text style={{ color: Colors.lightGray, fontSize: 18 }}>
                Description:
              </Text>
              <Text
                style={{
                  color: Colors.darkGray,
                  fontSize: 20,
                  lineHeight: 25,
                  textAlign: "left",
                  paddingLeft: 20,
                }}
              >
                {data.description}
              </Text>
              <Text style={{ color: Colors.lightGray, fontSize: 18 }}>
                Questions:
              </Text>
              {data.questions.map((question, index) => (
                <View key={index}>
                  <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 20 }}>
                      {index + 1}- {question.question}
                    </Text>
                    <View style={{ marginBottom: "10", paddingTop: 10 }}>
                      {question.type == "text" && (
                        <TextInput
                          style={Styles.Input}
                          placeholder="Type Your Answer"
                          onChangeText={(value) => {
                            console.log(value);
                            answers[question.id] = value;
                          }}
                        />
                      )}
                      {question.type == "textarea" && (
                        <TextInput
                          multiline={true}
                          numberOfLines={6}
                          style={{ ...Styles.Input, textAlignVertical: "top" }}
                          placeholder="Type Your Answer"
                          onChangeText={(value) => {
                            console.log(value);
                            answers[question.id] = value;
                          }}
                        />
                      )}
                      {question.type == "radio" && (
                        <>
                          <RadioButtonGroup
                            containerStyle={{ marginBottom: 10 }}
                            selected={current}
                            onSelected={(value) => {
                              console.log(value);
                              setCurrent(value);
                              answers[question.id] = current;
                              console.log(answers[question.id]);
                            }}
                            radioBackground={Colors.main}
                          >
                            {question.data.options.map((option, index) => (
                              <RadioButtonItem
                                key={index}
                                style={{
                                  marginLeft: 20,
                                  borderWidth: 2,
                                  borderColor: Colors.darkGray,
                                  padding: 2,
                                  marginRight: 20,
                                  color: Colors.green,
                                  marginBottom: 10,
                                  textAlignVertical: "middle",
                                }}
                                label={option.text}
                                value={option.text}
                              />
                            ))}
                          </RadioButtonGroup>
                        </>
                      )}
                      {question.type == "select" && (
                        <View
                          style={{
                            borderWidth: 1,
                            borderColor: Colors.lightGray,
                            borderRadius: 10,
                            overflow: "hidden",
                          }}
                        >
                          <Picker
                            selectedValue={selectedItem}
                            onValueChange={(value, index) => {
                              setSelectedItem(value);
                              answers[question.id] = value;
                            }}
                            style={{
                              color: Colors.darkGray,
                              backgroundColor: Colors.white,
                              borderWidth: 10,
                              borderColor: Colors.lightGray,
                            }}
                            mode="dropdown"
                            itemStyle={{ color: Colors.darkGray }}
                          >
                            {question.data.options.map((option, index) => (
                              <Picker.Item
                                key={index}
                                label={option.text}
                                value={option.text}
                                style={{
                                  color: Colors.darkGray,
                                  backgroundColor: Colors.white,
                                  fontSize: 18,
                                }}
                              />
                            ))}
                          </Picker>
                        </View>
                      )}
                      {question.type == "checkbox" && (
                        <>
                          {question.data.options.map((option, index) => (
                            <View
                              style={{
                                paddingLeft: 20,
                                paddingBottom: 10,
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                                flexDirection: "row",
                              }}
                            >
                              <Checkbox
                                value={values[index] ? values[index] : false}
                                onValueChange={(value) => {
                                  onCheckboxChanged(
                                    option,
                                    value,
                                    index,
                                    question
                                  );
                                }}
                                style={{
                                  backgroundColor: Colors.white,
                                  borderWidth: 2,
                                  borderColor: Colors.darkGray,
                                  padding: 5,
                                  marginRight: 20,
                                }}
                                color={
                                  values[index] == true
                                    ? Colors.main
                                    : Colors.darkGray
                                }
                              />
                              <Text>{option.text}</Text>
                            </View>
                          ))}
                        </>
                      )}
                    </View>
                  </View>
                </View>
              ))}
              <View style={{ marginBottom: 20 }}>
                <MainButton
                  color={Colors.main}
                  text="Send"
                  ClickEvent={SendData}
                />
              </View>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default ViewSurvay;

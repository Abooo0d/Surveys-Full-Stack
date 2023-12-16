import React from "react";
import { Text, View, FlatList } from "react-native";
import { Colors } from "../../Styles/Themes";
FlatList;
function LatestAnswers({ answers }) {
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "Center",
        backgroundColor: "#fff",
        width: "100%",
        gap: 10,
        padding: 20,
        borderRadius: 20,
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          color: Colors.darkGray,
        }}
      >
        Latest Answers
      </Text>
      {answers.length > 0 && (
        <View style={{ width: "100%" }}>
          {answers.map((answer, index) => (
            <View style={{ width: "100%", marginBottom: 10 }} key={index}>
              <Text
                style={{
                  color: Colors.main,
                  fontSize: 22,
                  fontWeight: "bold",
                  textAlign: "left",
                  width: "100%",
                }}
              >
                {answer.survay.title}
              </Text>
              <View
                style={{
                  paddingHorizontal: 20,
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  flexDirection: "row",
                  gap: 10,
                }}
              >
                <Text style={{ fontSize: 16, color: Colors.darkGray }}>
                  Answer Made At:
                </Text>
                <Text style={{ fontSize: 16 }}>{answer.end_date}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

export default LatestAnswers;

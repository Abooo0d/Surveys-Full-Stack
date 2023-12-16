import React from "react";
import { Text, Image, View } from "react-native";
import { Colors } from "../../Styles/Themes";
import MainButton from "./Core/mainButton";
import { useRouter } from "expo-router";
function LatestSurvay({ survay, children }) {
  const router = useRouter();
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
        Latest Survay
      </Text>
      <Image
        source={{ uri: survay.image_url }}
        style={{ width: 250, height: 250, borderRadius: 10 }}
      />
      <Text style={{ color: Colors.main, fontSize: 20, fontWeight: "bold" }}>
        {survay.title}
      </Text>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: 5,
        }}
      >
        <Text style={{ color: Colors.darkGray }}>Expire Date:</Text>
        <Text>{survay.expire_date}</Text>
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: 5,
        }}
      >
        <Text style={{ color: Colors.darkGray }}>Create Date:</Text>
        <Text>{survay.created_at}</Text>
      </View>
      <View style={{ gap: 10 }}>{children}</View>
    </View>
  );
}

export default LatestSurvay;

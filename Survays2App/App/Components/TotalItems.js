import React from "react";
import { View, Text } from "react-native";
import { Colors } from "../../Styles/Themes";
function TotalItems({ title, count }) {
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
        style={{ color: Colors.darkGray, fontSize: 25, fontWeight: "bold" }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: Colors.darkGray,
          fontSize: 100,
          fontWeight: "bold",
          paddingVertical: 20,
        }}
      >
        {count}
      </Text>
    </View>
  );
}

export default TotalItems;

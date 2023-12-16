import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";
export default function MainButton({ color, text, ClickEvent }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: color,
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={ClickEvent}
    >
      <Text style={{ color: "#fff", fontSize: 18 }}>{text}</Text>
    </TouchableOpacity>
  );
}

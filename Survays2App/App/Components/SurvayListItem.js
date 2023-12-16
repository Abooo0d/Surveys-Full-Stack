import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Colors } from "../../Styles/Themes";
import MainButton from "./Core/mainButton";
import { MainPageStyle } from "../../Styles/MainStyles";
import { useRouter } from "expo-router";

function SurvayListItem({ survay }) {
  const router = useRouter();
  return (
    <View style={MainPageStyle.card}>
      <Image
        source={{ uri: survay.image_url }}
        style={MainPageStyle.cardImage}
        resizeMode="cover"
      />
      <Text style={MainPageStyle.cardName}>{survay.title}</Text>
      <Text style={MainPageStyle.cardDesc}>{survay.description}</Text>
      <View style={MainPageStyle.buttonCon}>
        <View style={MainPageStyle.bigCon}>
          <MainButton color={Colors.main} text="Edit" />
          <MainButton
            color={Colors.green}
            text="View"
            ClickEvent={() => router.push(`/View/${survay.id}`)}
          />
        </View>
        <MainButton color={Colors.red} text=" Delete" />
      </View>
    </View>
  );
}

export default SurvayListItem;

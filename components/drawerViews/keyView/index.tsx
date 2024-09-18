import { Colors } from "@/constants/Colors";
import { Octicons } from "@expo/vector-icons";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Reasons from "./reasons";
import KeyViewButton from "./keyViewButton";
import { SymbolView } from "expo-symbols";
import Header from "../header";

export default function KeyView({
  title,
  heading,
  onPress,
  onClose,
}: {
  title: string;
  heading: string;
  onPress: () => void;
  onClose: () => void;
}) {
  return (
    <View style={{ gap: 24 }}>
      {/*Above Line*/}
      <View style={{ gap: 24 }}>
        {/*Header*/}
      <Header
          onPress={onClose}
          leftLabel={<Octicons name="eye" size={40} color={Colors.grey[300]} />}
        />

        <View style={{ gap: 16 }}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.headingText}>{heading}</Text>
        </View>

        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: Colors.grey[100],
          }}
        />
      </View>

      <Reasons />

      <View style={{ flexDirection: "row", gap: 16 }}>
        <KeyViewButton
          onPress={onPress}
          text="Cancel"
          backgroundColor={Colors.grey[200]}
        />
        <KeyViewButton
          onPress={onPress}
          text="Reveal"
          backgroundColor={"#00B2FF"}
          textColor="white"
          icon={<SymbolView name="faceid" tintColor={"white"} weight="bold" />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 24,
    fontFamily: "OpenRunde-Bold",
  },
  headingText: {
    fontSize: 16,
    fontFamily: "OpenRunde-semibold",
    color: Colors.grey[300],
  },
});

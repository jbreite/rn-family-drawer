import { Colors } from "@/constants/Colors";
import { Octicons } from "@expo/vector-icons";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Reasons from "./reasons";
import KeyViewButton from "./keyViewButton";
import { SymbolView } from "expo-symbols";

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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Octicons name="eye" size={40} color={Colors.grey[300]} />
          <Pressable
            style={{
              padding: 4,
              aspectRatio: 1,
              width: 32,
              backgroundColor: Colors.grey[100],
              borderRadius: 1000,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={onClose}
          >
            <Octicons name="x" size={24} color={Colors.grey[300]} />
          </Pressable>
        </View>

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
    fontWeight: "bold",
  },
  headingText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.grey[300],
  },
});

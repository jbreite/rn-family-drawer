import { Colors } from "@/constants/Colors";
import { Octicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, Pressable } from "react-native";
import KeyViewButton from "../keyView/keyViewButton";
import Header from "../header";

export default function RemoveView({
  onPress,
  onClose,
}: {
  onPress: () => void;
  onClose: () => void;
}) {
  return (
    <View style={{ gap: 24 }}>
      <Header
        onPress={onClose}
        leftLabel={<Octicons name="alert" size={40} color={Colors.red[300]} />}
      />

      <View style={{ gap: 16 }}>
        <Text style={styles.titleText}>Are you sure?</Text>
        <Text style={styles.headingText}>
          You haven't backed up your wallet yet. If you remove it, you could
          lose access forever. We suggest tapping and backing up your wallet
          first with a valid recovery method.
        </Text>
      </View>

      <View style={{ flexDirection: "row", gap: 16 }}>
        <KeyViewButton
          onPress={onPress}
          text="Cancel"
          backgroundColor={Colors.grey[200]}
        />
        <KeyViewButton
          onPress={onPress}
          text="Continue"
          backgroundColor={Colors.red[300]}
          textColor="white"
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
    fontFamily: "OpenRunde-Semibold",
    color: Colors.grey[300],
    lineHeight: 24,
  },
});

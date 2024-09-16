import { Pressable, Text, View } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

export default function DefaultHeader() {
  return (
    <View style={{ gap: 24 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Options</Text>
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
        >
          <Octicons name="x" size={24} color={Colors.grey[300]} />
        </Pressable>
      </View>
      <View
        style={{ height: 1, width: "100%", backgroundColor: Colors.grey[100] }}
      />
    </View>
  );
}

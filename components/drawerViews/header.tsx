import { Pressable, Text, View } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

export default function Header({
  onPress,
  leftLabel,
}: {
  onPress: () => void;
  leftLabel: React.ReactNode | string;
}) {
  return (
    <View style={{ gap: 24 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {typeof leftLabel === "string" ? (
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              fontFamily: "OpenRunde-Bold",
            }}
          >
            Options
          </Text>
        ) : (
          leftLabel
        )}
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
          onPress={onPress}
        >
          <Octicons name="x" size={24} color={Colors.grey[300]} />
        </Pressable>
      </View>
  
    </View>
  );
}

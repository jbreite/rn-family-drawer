import { Pressable, StyleSheet, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

export const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function DrawerButton({
  onPress,
  backgroundColor,
  icon,
  label,
  textColor = "#000",
}: {
  onPress: () => void;
  backgroundColor: string;
  icon: React.ReactNode;
  label: string;
  textColor?: string;
}) {
  const isButtonActive = useSharedValue(false);

  const handlePress = () => {
    onPress();
  };

  const onPressIn = () => {
    isButtonActive.value = true;
  };

  const onPressOut = () => {
    isButtonActive.value = false;
  };

  const rButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: isButtonActive.value ? 0.96 : 1 }],
  }));

  return (
    <AnimatedPressable
      style={[
        {
          backgroundColor: backgroundColor,
        },
        styles.buttonContainer,
        rButtonStyle,
      ]}
      onPress={handlePress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      {icon}
      <Text style={{ fontSize: 16, fontWeight: "bold", color: textColor }}>
        {label}
      </Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderCurve: "continuous",
    alignItems: "center",
  },
});

import { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SCREEEN_WIDTH = Dimensions.get("window").width;
const HORIZONTAL_MARGIN = 24;

export default function Index() {
  const [isOpen, setIsOpen] = useState(false);
  const { bottom } = useSafeAreaInsets();

  return (
    <Animated.View style={styles.mainContainer}>
      <TouchableOpacity onPress={() => setIsOpen((prev) => !prev)}>
        <Text>Open Modal</Text>
      </TouchableOpacity>

      {isOpen && (
        <Animated.View
          style={{
            backgroundColor: "red",
            position: "absolute",
            bottom: bottom,
            left: HORIZONTAL_MARGIN,
            right: HORIZONTAL_MARGIN,
            padding: 24,
            borderRadius: 24,
            borderCurve: "continuous",
          }}
          entering={SlideInDown}
          exiting={SlideOutDown}
        >
          <View style={{ flex: 1, gap: 12 }}>
            <Text>View Private Key</Text>
            <Text>View Recovery Phrase</Text>
            <Text>Remove Wallet</Text>
          </View>
        </Animated.View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

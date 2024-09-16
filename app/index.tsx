import DrawerView, { Views } from "@/components/view";
import { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  FadeOut,
  runOnJS,
  SlideInDown,
  SlideOutDown,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SCREEEN_WIDTH = Dimensions.get("window").width;
const HORIZONTAL_MARGIN = 24;
const INITIAL_CONTAINER_HEIGHT = -999;

export default function Index() {
  const [isOpen, setIsOpen] = useState(false);
  const { bottom } = useSafeAreaInsets();
  const height = useSharedValue(INITIAL_CONTAINER_HEIGHT);
  const [view, setView] = useState("default");

  const derivedHeight = useDerivedValue(() => {
    return withSpring(height.value, { overshootClamping: true });
  }, [view]);

  const updateView = (newView: string) => {
    setView(newView);
  };

  const handleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Animated.View style={styles.mainContainer}>
      <TouchableOpacity onPress={handleDrawer} style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 24 }}>Open Modal</Text>
      </TouchableOpacity>
      {isOpen && (
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          }}
          entering={FadeIn}
          exiting={FadeOut}
        >
          <TouchableWithoutFeedback onPress={handleDrawer}>
            <View style={StyleSheet.absoluteFill} />
          </TouchableWithoutFeedback>

          <Animated.View
            style={{
              height: derivedHeight,
              bottom: bottom,
              position: "absolute",
              borderRadius: 24,
              borderCurve: "continuous",
              backgroundColor: "red",
              left: HORIZONTAL_MARGIN,
              right: HORIZONTAL_MARGIN,
            }}
            entering={SlideInDown}
            exiting={SlideOutDown}
          >
            <View
              style={{
                position: "absolute",
                padding: 24,
              }}
              onLayout={(e) => {
                const layoutHeight = e.nativeEvent.layout.height;
                console.log("LAYOUT HEIGHT:", layoutHeight);
                height.value = layoutHeight;
              }}
            >
              <DrawerView view={view} setView={updateView} />
            </View>
          </Animated.View>
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

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
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HORIZONTAL_MARGIN = 16;
const INITIAL_CONTAINER_HEIGHT = 0;
const PADDING = 24;
const BORDER_RADIUS = 32;

export default function Index() {
  const [isOpen, setIsOpen] = useState(false);
  const { bottom, top } = useSafeAreaInsets();
  const height = useSharedValue(INITIAL_CONTAINER_HEIGHT);
  const [view, setView] = useState("default");

  const derivedHeight = useDerivedValue(() => {
    return withSpring(height.value, { overshootClamping: true });
  }, [view]);

  const rDrawerStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }));

  const updateView = (newView: string) => {
    setView(newView);
  };

  const handleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Animated.View style={styles.mainContainer}>
      <TouchableOpacity onPress={handleDrawer} style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 24 }}>Open Drawer</Text>
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
            style={[
              {
                bottom: bottom,
                position: "absolute",
                borderRadius: BORDER_RADIUS,
                borderCurve: "continuous",
                backgroundColor: "white",
                left: HORIZONTAL_MARGIN,
                right: HORIZONTAL_MARGIN,
              },
              rDrawerStyle,
            ]}
            entering={SlideInDown}
            exiting={SlideOutDown}
          >
            <Animated.View
              style={{
                position: "absolute",
                padding: PADDING,
                width: "100%",
              }}
              onLayout={(e) => {
                const layoutHeight = e.nativeEvent.layout.height;
                console.log("LAYOUT HEIGHT:", layoutHeight);
                height.value = layoutHeight;
              }}
            >
              <DrawerView view={view} setView={updateView} />
            </Animated.View>
          </Animated.View>
        </Animated.View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
});

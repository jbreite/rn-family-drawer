import DefaultDrawerView from "@/components/drawerViews/defaultDrawer";
import KeyView from "@/components/drawerViews/keyView";
import RemoveView from "@/components/drawerViews/removeView";
import { Octicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeIn,
  FadeOut,
  LinearTransition,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HORIZONTAL_MARGIN = 16;
const INITIAL_CONTAINER_HEIGHT = 0;
const PADDING = 24;
const BORDER_RADIUS = 32;

export default function FamilyDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState("default");
  const { bottom } = useSafeAreaInsets();
  const height = useSharedValue(INITIAL_CONTAINER_HEIGHT);

  const content = useMemo(() => {
    switch (view) {
      case "default":
        return <DefaultDrawerView setView={setView} />;
      case "remove":
        return <RemoveView onPress={() => setView("default")} />;
      case "phrase":
        return (
          <KeyView
            title="Secret Recovery Phrase"
            heading="Your Secret Recovery Phrase is the key used to back up all your wallet. Keep it secret and secure at all times."
            onPress={() => setView("default")}
          />
        );
      case "key":
        return (
          <KeyView
            title="Private Key"
            heading="Your Private Key is the key used to back up your wallet. Keep it secret and secure at all times."
            onPress={() => setView("default")}
          />
        );
    }
  }, [view]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleOpen}>
        <Text>Try it out</Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={StyleSheet.absoluteFill}>
          <TouchableOpacity style={styles.overlay} onPress={handleClose} />
          <Animated.View
            style={[styles.drawer, { bottom: bottom }]}
            entering={SlideInDown}
            exiting={SlideOutDown}
          >
            <Animated.View
              style={styles.content}
              onLayout={(event) => {
                const { height: contentHeight } = event.nativeEvent.layout;
                console.log("CONTENT HEIGHT:", contentHeight);
                height.value = withSpring(contentHeight, {
                  overshootClamping: false,
                });
              }}
            >
              <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                layout={LinearTransition.springify().overshootClamping(0)}
                key={view}
              >
                {content}
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  drawer: {
    position: "absolute",
    left: HORIZONTAL_MARGIN,
    right: HORIZONTAL_MARGIN,
    backgroundColor: "white",
    borderRadius: BORDER_RADIUS,
    overflow: "hidden",
  },
  content: {
    padding: PADDING,
  },
});

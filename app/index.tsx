import DefaultDrawerView from "@/components/drawerViews/defaultDrawer";
import KeyView from "@/components/drawerViews/keyView";
import RemoveView from "@/components/drawerViews/removeView";
import { Octicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  FadeIn,
  FadeOut,
  LinearTransition,
  SlideInDown,
  SlideOutDown,
  FadeInUp,
  FadeOutDown,
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

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const content = useMemo(() => {
    switch (view) {
      case "default":
        return <DefaultDrawerView setView={setView} onClose={handleClose} />;
      case "remove":
        return <RemoveView onPress={() => setView("default")} />;
      case "phrase":
        return (
          <KeyView
            title="Secret Recovery Phrase"
            heading="Your Secret Recovery Phrase is the key used to back up all your wallet. Keep it secret and secure at all times."
            onPress={() => setView("default")}
            onClose={handleClose}
          />
        );
      case "key":
        return (
          <KeyView
            title="Private Key"
            heading="Your Private Key is the key used to back up your wallet. Keep it secret and secure at all times."
            onPress={() => setView("default")}
            onClose={handleClose}
          />
        );
    }
  }, [view]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleOpen}>
        <Text>Try it out</Text>
      </TouchableOpacity>

      {isOpen && (
        <Animated.View
          style={StyleSheet.absoluteFill}
          entering={FadeIn}
          exiting={FadeOut}
        >
          <TouchableOpacity style={styles.overlay} onPress={handleClose} />
          <Animated.View
            style={[styles.drawer, { bottom: bottom }]}
            entering={SlideInDown}
            exiting={SlideOutDown}
            layout={LinearTransition.springify()
              .damping(5)
              .overshootClamping(-1)}
          >
            <Animated.View style={styles.content}>
              <Animated.View
                entering={FadeInUp.duration(200)}
                exiting={FadeOutDown.duration(200)}
                key={view}
              >
                {content}
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </Animated.View>
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

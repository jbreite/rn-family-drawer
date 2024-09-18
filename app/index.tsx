import DefaultDrawerView from "@/components/drawerViews/defaultDrawer";
import KeyView from "@/components/drawerViews/keyView";
import RemoveView from "@/components/drawerViews/removeView";
import React, { useMemo, useRef, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  SlideInDown,
  SlideOutDown,
  useSharedValue,
  runOnJS,
  useAnimatedStyle,
  clamp,
  withSpring,
  Easing,
  useDerivedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HORIZONTAL_MARGIN = 16;
const PADDING = 24;
const BORDER_RADIUS = 36;
const MIN_DURATION = 170; // in milliseconds
const MAX_DURATION = 290; // in milliseconds

export default function FamilyDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState("default");
  const { bottom } = useSafeAreaInsets();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    translateY.value = 0;
  };

  const translateY = useSharedValue(0);
  const contentHeight = useSharedValue(0);
  const previousHeightRef = useRef(0);

  const panGesture = Gesture.Pan()
    .onChange((event) => {
      translateY.value = clamp(
        translateY.value + event.changeY,
        0,
        contentHeight.value
      );
    })
    .onFinalize((event) => {
      const projectedEndpoint = translateY.value + event.velocityY / 60; // Adjust divisor as needed

      if (
        projectedEndpoint > contentHeight.value * 0.4 ||
        event.velocityY > 500
      ) {
        // Close the drawer
        runOnJS(handleClose)();
      } else {
        // Snap back to open position
        translateY.value = withSpring(0, { overshootClamping: true });
      }
    });

  const rDrawerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const opacityDuration = useDerivedValue(() => {
    if (previousHeightRef.current === 0) {
      previousHeightRef.current = contentHeight.value;
      return MIN_DURATION;
    }

    const heightDifference = Math.abs(
      contentHeight.value - previousHeightRef.current
    );
    previousHeightRef.current = contentHeight.value;

    return Math.min(
      Math.max((heightDifference / 500) * 1000, MIN_DURATION),
      MAX_DURATION
    );
  });

  console.log("OPACITYDURATION:", opacityDuration.value);

  const content = useMemo(() => {
    switch (view) {
      case "default":
        return <DefaultDrawerView setView={setView} onClose={handleClose} />;
      case "remove":
        return (
          <RemoveView
            onPress={() => setView("default")}
            onClose={handleClose}
          />
        );
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

  //LAYOUT ANIMATIOSN
  const heightEasing = Easing.bezier(0.26, 1, 0.5, 1).factory();
  const contentEasing = Easing.bezier(0.26, 0.8, 0.25, 1).factory();

  const layoutAnimationConfig = useMemo(
    () => LinearTransition.duration(MAX_DURATION).easing(heightEasing),
    []
  );

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
          <GestureDetector gesture={panGesture}>
            <Animated.View
              style={[styles.drawer, { bottom: bottom }, rDrawerStyle]}
              entering={SlideInDown}
              exiting={SlideOutDown}
              layout={layoutAnimationConfig}
              onLayout={(event) => {
                contentHeight.value = event.nativeEvent.layout.height;
              }}
            >
              <Animated.View style={styles.content}>
                <Animated.View
                  entering={FadeIn.duration(opacityDuration.value).easing(
                    contentEasing
                  )}
                  exiting={FadeOut.duration(opacityDuration.value).easing(
                    contentEasing
                  )}
                  key={view}
                >
                  {content}
                </Animated.View>
              </Animated.View>
            </Animated.View>
          </GestureDetector>
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

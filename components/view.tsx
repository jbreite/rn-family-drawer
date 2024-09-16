import { useMemo } from "react";
import { Text, View, TouchableOpacity, LayoutChangeEvent } from "react-native";
import Animated from "react-native-reanimated";
import DefaultDrawerView from "./drawerViews/defaultDrawer";
import KeyView from "./drawerViews/keyView";

export type Views = "default" | "remove" | "phrase" | "key";

export default function DrawerView({
  view,
  setView,
}: {
  view: string;
  setView: (view: Views) => void;
}) {
  const content = useMemo(() => {
    switch (view) {
      case "default":
        return <DefaultDrawerView setView={setView} />;

      case "remove":
        return (
          <View style={{ flex: 1 }}>
            <Text>
              You haven't backed up your wallet yet. If you remove it, you could
              lose access forever. We suggest tapping and backing up your wallet
              first with a valid recovery method.
            </Text>
            <Text>
              You haven't backed up your wallet yet. If you remove it, you could
              lose access forever. We suggest tapping and backing up your wallet
              first with a valid recovery method.
            </Text>
            <TouchableOpacity
              onPress={() => setView("default")}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Go back</Text>
            </TouchableOpacity>
          </View>
        );
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

  return <Animated.View>{content}</Animated.View>;
}

const styles = {
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
};

// <View>
//   <Text>
//     Keep your Secret Phrase safe. Don't share it with anyone else. If
//     you lose it, we can't recover it.
//   </Text>
//   <TouchableOpacity
//     onPress={() => setView("default")}
//     style={styles.button}
//   >
//     <Text style={styles.buttonText}>Go back</Text>
//   </TouchableOpacity>
// </View>

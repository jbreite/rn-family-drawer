import { useMemo } from "react";
import { Text, View, TouchableOpacity, LayoutChangeEvent } from "react-native";
import Animated from "react-native-reanimated";
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
        return (
          <View>
            <Text>This is the default case</Text>
            <View
              style={{
                marginTop: 24,
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <TouchableOpacity
                onPress={() => setView("key")}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Key</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setView("phrase")}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Phrase</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setView("remove")}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case "remove":
        return (
          <View>
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
          <View>
            <Text>
              Keep your Secret Phrase safe. Don't share it with anyone else. If
              you lose it, we can't recover it.
            </Text>
            <TouchableOpacity
              onPress={() => setView("default")}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Go back</Text>
            </TouchableOpacity>
          </View>
        );
      case "key":
        return (
          <View>
            <Text>
              Your Private Key is the key used to back up your wallet. Keep it
              secret and secure at all times.
            </Text>
            <TouchableOpacity
              onPress={() => setView("default")}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Go back</Text>
            </TouchableOpacity>
          </View>
        );
    }
  }, [view, setView]);

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

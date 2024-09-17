import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

export default function RemoveView({ onPress }: { onPress: () => void }) {
  return (
    <View style={{ flex: 1 }}>
      <Text>
        You haven't backed up your wallet yet. If you remove it, you could lose
        access forever. We suggest tapping and backing up your wallet first with
        a valid recovery method.
      </Text>
      <Text>
        You haven't backed up your wallet yet. If you remove it, you could lose
        access forever. We suggest tapping and backing up your wallet first with
        a valid recovery method.
      </Text>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>Go back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
});

import { Octicons } from "@expo/vector-icons";
import { View } from "react-native";
import DrawerButton from "./drawerButton";
import { Colors } from "@/constants/Colors";
import Header from "../header";

type Views = "default" | "key" | "phrase" | "remove";

export default function DefaultDrawerView({
  setView,
  onClose,
}: {
  setView: (view: Views) => void;
  onClose: () => void;
}) {
  return (
    <View style={{ gap: 16 }}>
      <View style={{ gap: 24 }}>
        <Header onPress={onClose} leftLabel="Options" />
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: Colors.grey[100],
          }}
        />
      </View>
      <View style={{ gap: 12 }}>
        <DrawerButton
          onPress={() => setView("key")}
          backgroundColor={Colors.grey[100]}
          icon={<Octicons name="key" size={24} color={Colors.grey[300]} />}
          label="View Private Key"
        />
        <DrawerButton
          onPress={() => setView("phrase")}
          backgroundColor={Colors.grey[100]}
          icon={<Octicons name="package" size={24} color={Colors.grey[300]} />}
          label="View Recovery Phrase"
        />
        <DrawerButton
          onPress={() => setView("remove")}
          backgroundColor={Colors.red[100]}
          icon={<Octicons name="alert" size={24} color={Colors.red[300]} />}
          label="Remove Wallet"
          textColor={Colors.red[300]}
        />
      </View>
    </View>
  );
}

import { Octicons } from "@expo/vector-icons";
import { View } from "react-native";
import { Views } from "../../view";
import DrawerButton from "./drawerButton";
import DefaultHeader from "./defaultHeader";
import { Colors } from "@/constants/Colors";

export default function DefaultDrawerView({
  setView,
}: {
  setView: (view: Views) => void;
}) {
  return (
    <View style={{ gap: 16 }}>
      <DefaultHeader />
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

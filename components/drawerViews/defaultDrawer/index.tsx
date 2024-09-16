import { Octicons } from "@expo/vector-icons";
import { View } from "react-native";
import { Views } from "../../view";
import DrawerButton from "./drawerButton";
import DefaultHeader from "./defaultHeader";
import { Colors } from "@/constants/Colors";

export const GREY_BG_COLOR = "#F7F7F7";
const RED_BG_COLOR = "#FEE6E4";
const RED_TEXT_COLOR = "#FD0C1C";
export const ICON_COLOR = "#94999F";

export default function DefaultDrawerView({
  setView,
}: {
  setView: (view: Views) => void;
}) {
  return (
    <View style={{ flex: 1, gap: 16 }}>
      <DefaultHeader />
      <View style={{ flex: 1, gap: 12 }}>
        <DrawerButton
          onPress={() => setView("key")}
          backgroundColor={Colors.grey[100]}
          icon={<Octicons name="key" size={24} color={Colors.grey[300]} />}
          label="View Private Key"
        />
        <DrawerButton
          onPress={() => setView("phrase")}
          backgroundColor={GREY_BG_COLOR}
          icon={<Octicons name="package" size={24} color={Colors.grey[300]} />}
          label="View Recovery Phrase"
        />
        <DrawerButton
          onPress={() => setView("remove")}
          backgroundColor={Colors.red[100]}
          icon={<Octicons name="alert" size={24} color={Colors.red[300]} />}
          label="Remove Wallet"
          textColor={RED_TEXT_COLOR}
        />
      </View>
    </View>
  );
}

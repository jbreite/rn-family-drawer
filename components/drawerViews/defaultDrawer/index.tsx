import { Octicons } from "@expo/vector-icons";
import { View } from "react-native";
import { Views } from "../../view";
import DrawerButton from "./drawerButton";

const GREY_COLOR = "#F7F7F7";
const RED_BG_COLOR = "#FEE6E4";
const RED_TEXT_COLOR = "#FD0C1C";
const ICON_COLOR = "#94999F";

export default function DefaultDrawerView({
  setView,
}: {
  setView: (view: Views) => void;
}) {
  return (
    <View style={{ flex: 1, gap: 12 }}>
      <DrawerButton
        onPress={() => setView("key")}
        backgroundColor={GREY_COLOR}
        icon={<Octicons name="key" size={24} color={ICON_COLOR} />}
        label="View Private Key"
      />
      <DrawerButton
        onPress={() => setView("phrase")}
        backgroundColor={GREY_COLOR}
        icon={<Octicons name="package" size={24} color={ICON_COLOR} />}
        label="View Recovery Phrase"
      />
      <DrawerButton
        onPress={() => setView("remove")}
        backgroundColor={RED_BG_COLOR}
        icon={<Octicons name="alert" size={24} color={RED_TEXT_COLOR} />}
        label="Remove Wallet"
        textColor={RED_TEXT_COLOR}
      />
    </View>
  );
}

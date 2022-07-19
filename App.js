import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  // TouchableHighlight,
  // TouchableWithoutFeedback,
  // Pressable,
} from "react-native";
import { theme } from "./colours";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  const [working, setWorking] = useState(true);
  const personal = () => setWorking(false);
  const work = () => setWorking(true);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{
              ...styles.btnText,
              color: working ? "palegreen" : theme.grey,
            }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={personal}>
          <Text
            style={{
              ...styles.btnText,
              color: !working ? "palegreen" : theme.grey,
            }}
          >
            Personal
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput placeholder="make a to do" style={styles.input} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.brue,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  btnText: {
    padding: 30,
    paddingHorizontal: 20,
    color: "palegreen",
    fontSize: 44,
    fontWeight: "500",
  },
  input: {
    height: 50,
    width: SCREEN_WIDTH - 30,
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 25,
    fontSize: 18,
  },
});

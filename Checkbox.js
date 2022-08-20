import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function CheckBoxParty() {
  const [isChecked, setChecked] = useState(false);

  return (
    <View style={styles.section}>
      <Checkbox
        name={"poop"}
        style={styles.checkbox}
        value={isChecked}
        onValueChange={setChecked}
        color={isChecked ? "#4630EB" : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
});

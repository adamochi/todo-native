import CheckBoxParty from "./Checkbox";

import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
// import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  Alert,
  // Image,
  // TouchableHighlight,
  // TouchableWithoutFeedback,
  // Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "./colours";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Alert } from "react-native-web";
// import Checkbox from "expo-checkbox";
// import { useFonts } from "expo-font";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const STORAGE_KEY = "@toDos";

export default function App() {
  // const [loaded] = useFonts({
  //   Roboto: require("./assets/fonts/RobotoFlex.ttf"),
  //   Whisper: require("./assets/fonts/Whisper.ttf"),
  //   Montserrat: require("./assets/fonts/Montserrat.ttf"),
  // });
  useEffect(() => {
    loadToDos();
  }, []);

  const [isChecked, setChecked] = useState(false);
  // const [completed, setCompleted] = useState(false);
  const [working, setWorking] = useState(true);
  const [todoInputText, setTodoInputText] = useState("");
  const [toDos, setToDos] = useState({});
  const completion = () => {
    setChecked((current) => !current);
    console.log(isChecked);
  };
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setTodoInputText(payload);
  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };

  const loadToDos = async () => {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    if (saved) setToDos(JSON.parse(saved));
  };

  const addTodo = () => {
    if (todoInputText === "") {
      return;
    }
    // save todo //  const newToDos = Object.assign({}, toDos, {
    const newToDos = {
      ...toDos,
      [Date.now()]: { todoInputText, working, isChecked },
    };
    setToDos(newToDos);
    saveToDos(newToDos);
    setTodoInputText("");
    console.log(newToDos);
  };

  // if (!loaded) {
  //   return null;
  // }

  const deleteToDo = (key) => {
    Alert.alert("delete?", "do you want to delete this?", [
      { text: "cancel" },
      {
        text: "delete",
        onPress: async () => {
          const newToDos = { ...toDos };
          delete newToDos[key]; // we should never mutate the state
          setToDos(newToDos);
          await saveToDos(newToDos);
        },
      },
    ]);
  };
  const completeMe = (key) => {
    const newToDos = { ...toDos };
    newToDos[key] = { isChecked: true };
    setToDos(newToDos);
    saveToDos(newToDos);
    setChecked((current) => !current);
    console.log(newToDos);
  };

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
        <TouchableOpacity onPress={travel}>
          <Text
            // ...styles allows me to use both the stylesheet below and write it here as well!
            style={{
              ...styles.btnText,
              color: !working ? "palegreen" : theme.grey,
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        keyboardType="default"
        returnKeyType="done"
        onSubmitEditing={addTodo}
        onChangeText={onChangeText}
        value={todoInputText}
        placeholder={working ? "make a to do" : "where would you like to go?"}
        style={styles.input}
      />

      <ScrollView>
        {Object.keys(toDos).map((key) =>
          toDos[key].working === working ? (
            <View style={styles.toDo} key={key}>
              <CheckBoxParty completeMe={completeMe} />

              {/* <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? "#4630EB" : undefined}
              /> */}

              <Text
                style={{
                  ...styles.toDoText,
                  textDecorationLine: isChecked ? "line-through" : undefined,
                  fontWeight: isChecked ? "bold" : undefined,
                }}
              >
                {toDos[key].todoInputText}
              </Text>
              <TouchableOpacity onPress={() => deleteToDo(key)}>
                <MaterialCommunityIcons
                  style={styles.deleteIcon}
                  name="delete"
                  size={24}
                />
              </TouchableOpacity>
            </View>
          ) : null
        )}
      </ScrollView>
      {/* <Image
        style={styles.imagetop}
        source={{
          uri: "https://images.unsplash.com/photo-1460794418188-1bb7dba2720d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        }}
      /> */}
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
  imagetop: {
    width: SCREEN_WIDTH,
    height: "40%",
  },
  btnText: {
    fontWeight: "700",
    padding: 30,
    paddingHorizontal: 20,
    color: "palegreen",
    fontSize: 44,
  },
  input: {
    fontWeight: "500",
    height: 50,
    width: SCREEN_WIDTH - 30,
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 25,
    fontSize: 20,
    marginBottom: 40,
  },
  toDo: {
    width: SCREEN_WIDTH - 20,
    backgroundColor: "hotpink",
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkbox: {
    margin: 8,
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  deleteIcon: {
    color: "white",
  },
});

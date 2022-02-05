import React from "react";

import { View, Text, ScrollView, StyleSheet } from "react-native";

interface Props {
  children: React.ReactNode;
  header?: string;
  isDisplayed?: boolean;
}

const ScrollContainer: React.FC<Props> = ({
  children,
  header,
  isDisplayed,
}) => (
  <>
    {isDisplayed && (
      <View style={styles.container}>
        {header && <Text style={styles.text}>{header}</Text>}
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          horizontal={true}
        >
          {children}
        </ScrollView>
      </View>
    )}
  </>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    minWidth: "100%",
  },
  scrollContainer: {
    minWidth: "100%",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    width: "80%",
    backgroundColor: "#560bad99",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 15,
    elevation: 8,
  },
});

export default ScrollContainer;

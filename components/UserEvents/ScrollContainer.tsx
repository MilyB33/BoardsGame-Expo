import React from "react";

import { View, Text, ScrollView, StyleSheet } from "react-native";

interface PropTypes {
  header?: string;
  isDisplayed?: boolean;
}

const ScrollContainer: React.FC<PropTypes> = ({
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
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 30,
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

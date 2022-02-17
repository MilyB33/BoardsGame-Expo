import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../storage/App/hooks";

import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";

import InfoBox from "./InfoBox";
import Banner from "../Generic/Banner";

import informations from "../../data/mockedData";
import { NavigationProps } from "../../types/types";

const HomeInfo = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const navigation = useNavigation<NavigationProps>();

  const LinkElement = (
    <Button
      color="white"
      style={styles.link}
      onPress={() => navigation.navigate("UserModal")}
    >
      Zaloguj się
    </Button>
  );
  const AdditionalInfoElement = (
    <Text style={styles.text}>Email: Przyklad@gmail.com</Text>
  );

  return (
    <>
      <Banner />
      <View style={styles.container}>
        <InfoBox text={informations[0].text} />
        {isAuthenticated || (
          <InfoBox text={informations[1].text} link={LinkElement} />
        )}

        <InfoBox
          text={informations[2].text}
          additional={AdditionalInfoElement}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    lineHeight: 24,
  },
  link: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    marginLeft: "auto",
    marginRight: "auto",
  },
});

export default HomeInfo;

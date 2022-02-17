import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../storage/App/hooks";
import { fetchInitialEvents } from "../../storage/Slices/appSlice";
import { login } from "../../storage/Slices/userSlice";

import { StatusBar, StyleSheet, Platform, SafeAreaView } from "react-native";
import Navigation from "../Navigation/Root";

const Layout = () => {
  const dispatch = useAppDispatch();
  const { loading: eventsLoading } = useAppSelector(
    (state) => state.app.events
  );
  const { isAuthenticated, loading: userLoading } = useAppSelector(
    (state) => state.user
  );

  useEffect(() => {
    (async () => {
      if (eventsLoading !== "succeeded" && eventsLoading !== "loading")
        await dispatch(fetchInitialEvents());
      if (!isAuthenticated && userLoading !== "loading")
        await dispatch(login({ password: null, username: null }));
    })();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar translucent backgroundColor="dodgerblue" />
        <Navigation />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default Layout;

import React from "react";

import { StyleSheet, FlatList } from "react-native";
import { Divider } from "react-native-paper";

interface PropTypes {
  items: any[];
  ItemComponent: React.FC<any>;
  ComponentIfEmpty?: React.FC<any>;
  itemProps?: {
    [key: string]: any;
  };
}

const Friends = ({
  items,
  ItemComponent,
  ComponentIfEmpty,
  itemProps,
}: PropTypes) => {
  console.log(items);
  return (
    <FlatList
      style={styles.flatList}
      data={items}
      renderItem={({ item }) => <ItemComponent user={item} {...itemProps} />}
      keyExtractor={(item) => item._id.toString()}
      ItemSeparatorComponent={() => <Divider style={styles.divider} />}
      extraData={items}
      ListEmptyComponent={ComponentIfEmpty}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    padding: 10,
    height: "100%",
    marginBottom: 20,
  },
  divider: {
    height: 5,
    backgroundColor: "white",
  },
});

export default Friends;

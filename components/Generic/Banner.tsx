import React, { useState } from "react";

import { Banner } from "react-native-paper";

const CustomBanner = () => {
  const [visible, setVisible] = useState(true);

  return (
    <>
      <Banner
        visible={visible}
        actions={[
          {
            label: "Dismiss",
            onPress: () => setVisible(false),
          },
        ]}
        icon="information"
        style={{ backgroundColor: "#00b894" }}
      >
        Hi there! This application is still in development. Please be patient
        and enjoy the experience.
      </Banner>
    </>
  );
};

export default CustomBanner;

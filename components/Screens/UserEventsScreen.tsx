import React from "react";

import ScreenLayout from "../Layout/ScreenLayout";
import Events from "../UserEvents/Events";
import AddEvent from "../Generic/AddEvent";

const UserEventsScreen = () => {
  return (
    <ScreenLayout>
      <AddEvent />
      <Events />
    </ScreenLayout>
  );
};

export default UserEventsScreen;

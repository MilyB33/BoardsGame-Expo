import React from 'react';

import ScreenLayout from '../Layout/ScreenLayout';
import Header from '../Generic/Header';
import AllEvents from '../Events/AllEvents';

const EventsScren = () => {
  return (
    <ScreenLayout>
      <Header title="Wydarzenia" />
      <AllEvents />
    </ScreenLayout>
  );
};

export default EventsScren;

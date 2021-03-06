import React, { useState } from "react";

import { View } from "react-native";
import ModalContainer from "../Modals/ModalContainer";
import LoginForm from "../Forms/LoginForm";
import RegisterForm from "../Forms/RegisterForm";

const ModalScreen = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <View style={{ flex: 1 }}>
      <ModalContainer isScrolled={true}>
        {isLogin ? (
          <LoginForm changeForm={setIsLogin} />
        ) : (
          <RegisterForm changeForm={setIsLogin} />
        )}
      </ModalContainer>
    </View>
  );
};

export default ModalScreen;

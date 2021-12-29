import React, { useContext } from 'react';
import { ModalsContext } from '../../context/modalsContext';

import ModalContainer from './ModalContainer';
import AddEventForm from '../Forms/AddEventForm';
import { Modal } from 'react-native';

const Modals = () => {
  const { modals } = useContext(ModalsContext);

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modals.showLoginModal}
      >
        <ModalContainer>{/* <LoginForm /> */}</ModalContainer>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modals.showRegisterModal}
      >
        <ModalContainer>{/* <RegisterForm /> */}</ModalContainer>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modals.showAddEventModal}
      >
        <ModalContainer>
          <AddEventForm />
        </ModalContainer>
      </Modal>
    </>
  );
};

export default Modals;

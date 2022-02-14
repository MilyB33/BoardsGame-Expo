import React from "react";

import { Button } from "react-native-paper";
import Dialog from "../Generic/Dialog";

interface PropTypes {
  visible: boolean;
  onDismiss: () => void;
  callbackAction?: () => void;
}

const DeleteDialog = ({ visible, onDismiss, callbackAction }: PropTypes) => {
  const Actions = (
    <>
      <Button onPress={onDismiss}>Nie</Button>
      <Button onPress={callbackAction}>Tak</Button>
    </>
  );

  return (
    <Dialog
      title="Usuwanie konta"
      content="Czy na pewno chcesz usunąć swoje konto?"
      visible={visible}
      onDismiss={onDismiss}
      actions={Actions}
    />
  );
};

export default DeleteDialog;

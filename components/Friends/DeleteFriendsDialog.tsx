import React from "react";

import { Button } from "react-native-paper";
import Dialog from "../Generic/Dialog";

interface Props {
  visible: boolean;
  onDismiss: () => void;
  callbackAction?: () => void;
}

const DeleteFriendDialog: React.FC<Props> = ({
  visible,
  onDismiss,
  callbackAction,
}) => {
  const Actions = (
    <>
      <Button onPress={onDismiss}>Nie</Button>
      <Button onPress={callbackAction}>Tak</Button>
    </>
  );

  return (
    <Dialog
      title="Usuwanie znajomego"
      content="Czy na pewno chcesz użytkownika z listy znajomych?"
      visible={visible}
      onDismiss={onDismiss}
      actions={Actions}
    />
  );
};

export default DeleteFriendDialog;

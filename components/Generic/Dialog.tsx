import React from 'react';

import { Dialog, Text } from 'react-native-paper';

interface Props {
  title: string;
  content: string;
  visible: boolean;
  onDismiss?: () => void;
  actions?: React.ReactElement | React.ReactElement[];
}

const CustomDialog: React.FC<Props> = ({
  title,
  content,
  visible,
  onDismiss,
  actions,
}) => {
  return (
    <Dialog visible={visible} onDismiss={onDismiss}>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Content>
        <Text>{content}</Text>
      </Dialog.Content>
      <Dialog.Actions>{actions}</Dialog.Actions>
    </Dialog>
  );
};

export default CustomDialog;

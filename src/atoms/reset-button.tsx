import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { Card, Button, Paragraph } from 'react-native-paper';
import Popover from 'react-native-popover-view';

const ResetButton: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  const width = useWindowDimensions().width;
  const [showPopconfirm, setShowPopconfirm] = useState(false);

  const handleConfirm = () => {
    onPress();
    setShowPopconfirm(false);
  };

  return (
    <Card>
      <Button onPress={() => setShowPopconfirm(true)}>
        Restore to defaults
      </Button>
      <Popover
        isVisible={showPopconfirm}
        onRequestClose={() => setShowPopconfirm(false)}
      >
        <Card style={{ width: Math.min(width - 50, 400) }}>
          <Card.Title title="Confirm Reset" />
          <Card.Content>
            <Paragraph>
              Are you sure you want to reset the inputs to their default values?
              This cannot be undone.
            </Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button onPress={handleConfirm}>Confirm Reset</Button>
            <Button onPress={() => setShowPopconfirm(false)}>Cancel</Button>
          </Card.Actions>
        </Card>
      </Popover>
    </Card>
  );
};

export default ResetButton;

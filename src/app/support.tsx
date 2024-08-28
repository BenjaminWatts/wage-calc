import { View } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { PageHeader } from '../nav';

const SupportScreen: React.FC = () => {
  return (
    <>
      <View
        style={{
          flex: 1,
          padding: 16,
          gap: 15,
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
        }}
      >
        <PageHeader title="Support" />
        <Card>
          <Card.Title title="Support" />
          <Card.Content>
            <Paragraph>
              For all support queries, please email costofwork@kilowatts.io.
            </Paragraph>
          </Card.Content>
        </Card>
      </View>
    </>
  );
};

export default SupportScreen;

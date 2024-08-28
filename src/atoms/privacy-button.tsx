import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';

const PrivacyButton: React.FC = () => {
  const nav = useRouter();
  return (
    <View
      style={{
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Button onPress={() => nav.push('/terms')}>
        <Text style={{ fontSize: 12, color: 'gray', marginTop: 20 }}>
          Privacy Policy / Terms and Conditions
        </Text>
      </Button>
      <Button onPress={() => nav.push('/support')}>
        <Text style={{ fontSize: 12, color: 'gray', marginTop: 20 }}>
          Support
        </Text>
      </Button>
    </View>
  );
};

export default PrivacyButton;

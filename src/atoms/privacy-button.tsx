import { useRouter } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';

const PrivacyButton: React.FC = () => {
  const nav = useRouter();
  return (
    <>
      <TouchableOpacity onPress={() => nav.push('/terms')}>
        <Text style={{ fontSize: 12, color: 'gray', marginTop: 20 }}>
          Privacy Policy / Terms and Conditions
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default PrivacyButton;

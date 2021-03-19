import { Linking, Alert, Platform } from 'react-native';


const Anchor = (type, value) => {
  console.log('anchor');
  console.log(type);
  console.log(value);
  if (type === 'tel') {
    console.log('tel');
    console.log('callNumber ----> ', value);
    let phoneNumber = value;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${value}`;
    }
    else {
      phoneNumber = `tel:${value}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.log(err));
  }
  else if (type === 'mailto') {
    console.log('mailto ----> ', value);
    let phoneNumber = `mailto:${value}`;
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert('Invalid email adress');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.log(err));
  }
}
export default Anchor;

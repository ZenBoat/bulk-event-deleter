import React, {useContext} from 'react';
import {SafeAreaView, StyleSheet, View, Linking} from 'react-native';
import {Text, ListItem} from 'react-native-elements';
import {UserContext} from '../store/Context';
import {GoogleSignin} from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-community/async-storage';

interface Props {}

const Settings: React.FC<Props> = ({navigation}) => {
  const {emptyState} = useContext(UserContext);

  const logoutHandler = () => {
    AsyncStorage.removeItem('userLoggedIn');
    emptyState();
    GoogleSignin.signOut();
    navigation.reset();
  };

  const openEmail = () => {
    Linking.openURL('mailto:ben@fresla.co?subject=Bed%20App%20Support').catch(
      // TODO display toast warning about no mail app available
      err => console.log(err),
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{'Settings'}</Text>
        <Text>let us know if you need help.</Text>
      </View>
      <View style={styles.listContainer}>
        <ListItem
          containerStyle={styles.buttonContainer}
          title="Email us"
          topDivider
          bottomDivider
          onPress={openEmail}
        />
        <ListItem
          containerStyle={styles.buttonContainer}
          title="Log out"
          bottomDivider
          onPress={logoutHandler}
        />
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  titleContainer: {
    margin: 8,
  },
  title: {
    fontSize: 24,
  },
  listContainer: {
    width: '100%',
  },
  buttonContainer: {
    marginTop: 0,
    width: '100%',
  },
  button: {
    height: 48,
  },
  revokeButton: {
    backgroundColor: '#bc0303',
  },
});

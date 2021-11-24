/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
// import type {Node} from 'react';
// import moment from 'moment';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Switch,
  TouchableOpacity,
} from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // notificationTime: new Date(1598051730000),
      // notificationTime: moment().format('HH:mm'),
      // notificationTime: moment({ hour: 17 }),
      enableNotification: true,
      isDateTimePickerVisible: false,
      // notificationTime: moment().format() ,
      notificationTime: new Date('2028-11-24T19:42:59.472Z'),
      changeTime: new Date(),

      show: false,
    }; // Must be outside of any component LifeCycle (such as `componentDidMount`).

    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Androi d)
      onRegister: function (token) {
        // console.log('TOKEN:', token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      // onNotification: function (notification) {
      //   console.log('NOTIFICATION:', notification);

      //   // process the notification

      //   // (required) Called when a remote is received or opened, or local notification is opened
      //   notification.finish(PushNotificationIOS.FetchResult.NoData);
      // },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        // console.log('ACTION:', notification.action);
        // console.log('NOTIFICATION:', notification);
        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      requestPermissions: true,
    });

    PushNotification.createChannel(
      {
        channelId: 'channel-id', // (required)
        channelName: 'My channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        // importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      // created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }
  componentDidMount() {
    this.setReminder();
  }

  componentDidUpdate(prevProps, prevState) {
    const {notificationTime, enableNotification} = this.state;

    if (
      enableNotification !== prevState.enableNotification ||
      notificationTime !== prevState.notificationTime
    ) {
      this.setReminder();
    }
  }
  setReminder = async () => {
    const {notificationTime, enableNotification} = this.state;
    let now = notificationTime;

    if (enableNotification) {
      PushNotification.localNotificationSchedule({
        //... You can use all the options from localNotifications
        channelId: 'channel-id',
        message: 'My Notification Message', // (required)
        // date: new Date(Date.now() + 60 * 1000), // in 60 secs
        // date: moment(notificationTime).format(),
        date: new Date(now),
        // date: notificationTime, // in 60 secs
        allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
        repeatType: 'day',
        /* Android Only Properties */
        repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
      });
    } else {
      return false;
    }
  };

  enableNotification = value => {
    this.setState({
      enableNotification: value,
    });
  };

  showDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: true});
  };

  hideDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: false});
  };

  handleDatePicked = date => {
    this.hideDateTimePicker();

    this.setState({
      notificationTime: moment(date),
      changeTime: moment(date),
    });
  };

  render() {
    const {show, isEnabled} = this.state;
    const {
      enableNotification,
      isDateTimePickerVisible,
      notificationTime,
      changeTime,
    } = this.state;

   
    // const isDarkMode = useColorScheme() === 'dark';

    // const backgroundStyle = {
    //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    // };

    return (
      // <SafeAreaView style={backgroundStyle}>
      <SafeAreaView>
        {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          // style={backgroundStyle}
        >
          <View
          // style={{
          //   backgroundColor: isDarkMode ? Colors.black : Colors.white,
          // }}
          >
            <Section title="Learn More">
              Read the docs to discover what to do next:
            </Section>
            <View
              style={{
                marginTop: 10,
                marginLeft: 10,
                marginRight: 10,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Text>Daily Task</Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={enableNotification ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={this.enableNotification}
                value={enableNotification}
              />
            </View>
            <View
              style={{
                marginTop: 10,
                marginLeft: 10,
                marginRight: 10,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Text>Time</Text>

              <TouchableOpacity
                style={styles.button}
                // onPress={() => this.setState({show: !this.state.show})}
                onPress={this.showDateTimePicker}>
                {/* <Text>{this.state.date}</Text> */}
                {/* <Text>{moment(notificationTime).format('LT')}</Text> */}
                <Text>{moment(changeTime).format('LT')}</Text>
              </TouchableOpacity>
            </View>

            <View style={{margin: 10}}>
              <Button
                title="push Notification"
                // onPress={() => alert('hello adnan')}>
                onPress={() => this.setReminder()}>
                Push Notification
              </Button>
            </View>
            <DateTimePicker
              isVisible={isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
              mode="time"
              is24Hour={false}
              // date={new Date(notificationTime)}
              date={new Date()}
              titleIOS="Pick your Notification time"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from 'react';
import TwilioVoice from 'react-native-twilio-programmable-voice'

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Platform,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const apiUrl = 'https://f8cb8689.eu.ngrok.io/accessToken';

declare var global: {HermesInternal: null | {}};

const App = () => {

  const getAccessTokenFromServer = async () => {
    const request = await fetch(apiUrl);
    const resp = await request.json();
    console.log(resp);
    return resp.token;
  }

  const initTelephony = async () => {
    try {
        const accessToken = await getAccessTokenFromServer()
        console.log('token', accessToken);
        const success = await TwilioVoice.initWithToken(accessToken, )
        console.log('success', success);
        if (Platform.OS === 'ios') { //required for ios
          TwilioVoice.configureCallKit({
            appName: 'mcvoice',
          });
        }
    } catch (err) {
        console.error(err)
    }

}

const CallSomeone = () => {
  console.log('Calling!!!');
  // set speaker
  TwilioVoice.setSpeakerPhone(true);
  // start a call
TwilioVoice.connect({To: 'Alice'})
}

const CallAccept = () => {
  console.log('INCOMMING');
  TwilioVoice.accept();
}


 // iOS Only
 const initTelephonyWithUrl = (url) => {
  TwilioVoice.initWithTokenUrl(url)
  try {
      TwilioVoice.configureCallKit({
          appName:       'TwilioVoiceExample',                  // Required param
          imageName:     'my_image_name_in_bundle',             // OPTIONAL
          ringtoneSound: 'my_ringtone_sound_filename_in_bundle' // OPTIONAL
      })
  } catch (err) {
      console.err(err)
  }
}


// a few list of events 
const Listeners = () => {
  console.log('Listening!!');
  // add listeners (flowtype notation)
TwilioVoice.addEventListener('deviceReady', function() {
  // no data
  console.warn('WE READYYY!!!')
})
TwilioVoice.addEventListener('deviceNotReady', function(data) {
  console.error('SOMETHING BAD', data);
})
}

useEffect(() => {
  console.log({ TwilioVoice });
  console.log('Running');
  initTelephony();
  Listeners();
}, [])


  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic" >

          {global.HermesInternal == null ? null : (
            <View >
              <Text>Engine: Hermes</Text>
            </View>
          )}
          <View>
            <Text>HI testing</Text>
            <TouchableOpacity 
            style={{
              backgroundColor: 'red',
              marginTop: 20,
              padding: 20,
              alignItems: 'center'
            }}
            onPress={CallSomeone}
            >
              <Text
              style={{
                color: '#FFFFFF',
                fontSize: 26
              }}
              >Call Someone</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            style={{
              backgroundColor: 'green',
              marginTop: 20,
              padding: 20,
              alignItems: 'center'
            }}
            onPress={CallSomeone}
            >
              <Text
              style={{
                color: '#FFFFFF',
                fontSize: 26
              }}
              >Incoming Call!!</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;

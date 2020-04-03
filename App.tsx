/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
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
  TextInput,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const apiUrl = 'https://f8cb8689.eu.ngrok.io/accessToken?identity=';

declare var global: {HermesInternal: null | {}};

const App = () => {

  const [identity, setIdentity] = useState(Math.floor(Math.random()*90000) + 10000);
  const [phone, setPhone] = useState('Alice');

  const getAccessTokenFromServer = async () => {
    const request = await fetch(`${apiUrl}${identity}`);
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
  console.log('Calling!!!', phone);
  // set speaker
  TwilioVoice.setSpeakerPhone(true);
  // start a call
TwilioVoice.connect({To: phone})
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
          <Text style={{ color:'red', fontSize: 16 }}>Identity: {identity}</Text>
           <TextInput
           onChangeText={text => setPhone(text)}
           keyboardType="numeric"
            style={{
              borderWidth: 1,
              marginTop: 20,
              padding: 8,
              textAlign: "center",
              fontSize: 22
            }}
           />   
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
              >Call!!</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;

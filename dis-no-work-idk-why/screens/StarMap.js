import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  Alert,
} from 'react-native';
import { WebView } from 'react-native-webview';

export default class StarMapScreen extends Component {
  constructor() {
    super();
    this.state = {
      longitude: '',
      latitude: '',
    };
  }

  // Function to handle WebView load
  handleWebViewLoad = () => {
    const { longitude, latitude } = this.state;

    // Check if both longitude and latitude are valid numbers within the specified range
    if (
      this.isValidNumber(longitude) &&
      this.isValidNumber(latitude) &&
      this.isWithinRange(longitude, -180, 180) && // Adjust the valid range as needed
      this.isWithinRange(latitude, -90, 90) // Adjust the valid range as needed
    ) {
      // Construct the URL with the provided longitude and latitude
      const path = `https://virtualsky.lco.global/embed/index.html?longitude=${longitude}&latitude=${latitude}&constellations=true&constellationlabels=true&showstarlabels=true&gridlines_az=true&live=true&projection=stereo&showdate=false&showposition=false`;

      // Reload the WebView with the new URL
      this.webviewRef.reload();
    } else {
      // Display an error alert if either value is not a valid number or is out of range
      Alert.alert(
        'Error',
        'Longitude and latitude should be valid numbers within the specified range.'
      );
    }
  };

  // Function to check if a value is a valid number
  isValidNumber = (value) => {
    return !isNaN(parseFloat(value));
  };

  // Function to check if a value is within a specified range
  isWithinRange = (value, min, max) => {
    return value >= min && value <= max;
  };

  // Function to check if the input length is greater than 4
  isInputTooLong = (value) => {
    return value.length > 3;
  };

  render() {
    const { longitude, latitude } = this.state;
    const path = `https://virtualsky.lco.global/embed/index.html?longitude=${longitude}&latitude=${latitude}&constellations=true&constellationlabels=true&showstarlabels=true&gridlines_az=true&live=true&projection=stereo&showdate=false&showposition=false`;

    return (
      <View style={{ flex: 1, backgroundColor: '#1a0023' }}>
        <SafeAreaView style={styles.droidSafeArea} />
        <View style={{ flex: 0.3, marginTop: 20, alignItems: 'center' }}>
          <Text style={styles.titleText}>Star Map</Text>
          <Text style={styles.lesserText}>No need for degrees!</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter your longitude"
            placeholderTextColor="white"
            onChangeText={(text) => {
              if (!this.isInputTooLong(text)) {
                this.setState({
                  longitude: text,
                });
              }
            }}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter your latitude"
            placeholderTextColor="white"
            onChangeText={(text) => {
              if (!this.isInputTooLong(text)) {
                this.setState({
                  latitude: text,
                });
              }
            }}
            keyboardType="numeric"
          />
          <View style={{ marginTop: 10 }}>
            <Text style={{ color: 'red' }}>
              {this.isValidNumber(longitude) && this.isValidNumber(latitude)
                ? this.isWithinRange(longitude, -180, 180) &&
                  this.isWithinRange(latitude, -90, 90)
                  ? ''
                  : 'longitude must bewithin -180 &180, latitude must be withing -90, 90'
                : 'Longitude and latitude should be valid numbers.'}
              {this.isInputTooLong(longitude) || this.isInputTooLong(latitude)
                ? 'Input should be 4 characters or less.'
                : ''}
            </Text>
          </View>
        </View>
        <WebView
          scalesPageToFit={true}
          source={{ uri: path }}
          style={{ marginTop: 20, marginBottom: 20 }}
          ref={(ref) => (this.webviewRef = ref)}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  titleText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    justifyContent: 'center',
    alignContent: 'center',
  },
  lesserText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 10,
  },
  inputStyle: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
    textAlign: 'center',
    color: 'white',
    width: 200,
  },
});

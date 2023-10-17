import React, { Component } from 'react';
import {
  Text,
  View,
  Alert,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import axios from 'axios';

export default class SpaceCraftsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aircrafts: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios
      .get("https://ll.thespacedevs.com/2.0.0/config/spacecraft/")
      .then((response) => {
        if (response.data && Array.isArray(response.data.results)) {
          this.setState({ aircrafts: response.data.results, loading: false });
        } else {
          this.setState({ loading: false });
          Alert.alert('Error', 'Failed to fetch spacecraft data.');
        }
      })
      .catch((error) => {
        console.log(error.message);
        this.setState({ loading: false });
        Alert.alert('Error', 'Failed to fetch spacecraft data.');
      });
  };

  // ... (rest of your component remains the same)

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Loading</Text>
        </View>
      );
    } else if (this.state.aircrafts.length === 0) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>No spacecraft data available.</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <ImageBackground source={require('../assets/stars.gif')} style={styles.backgroundImage}>
            <View style={{ flex: 0.15, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.titleText}>Spacecrafts</Text>
            </View>
            <View style={{ flex: 0.85 }}>
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.aircrafts}
                renderItem={this.renderItem}
                initialNumToRender={10}
              />
            </View>
          </ImageBackground>
        </View>
      );
    }
  }
  
  // ... (rest of your component remains the same)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a0023',
  },
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flex: 0.3,
    marginTop: 20,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  lesserText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
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
  webview: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
  },
});

import * as React from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Switch, Image } from 'react-native';

import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

const {width, height} = Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export default class App extends React.Component {

    state = {
      region: {
        latitude: 41.27617,
        longitude: 69.22327,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [
        {
        latlng: { 
          latitude: 41.27617,
          longitude: 69.22327 
        },
        title: 'test',
        image: require('../../assets/unknown.jpg'),
        flat: true,
        isPreselected: true
      },
      {
        latlng: { 
          latitude: 41.33227,
          longitude: 69.22327 
        },
        title: 'test',
        image: require('../../assets/unknown.jpg'),
        flat: true,
        isPreselected: true
      }
    ],
      shareMyLocation: false
    }

    async getLocationAsync() {
        // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
        const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
          let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
          return location
        } else {
          throw new Error('Location permission not granted');
        }
      }

      location_set = async () => {
        if (this.state.shareMyLocation){

          let location = await this.getLocationAsync()
          let region = {}
  
          region.latitude = parseFloat(location.coords.latitude)
          region.longitude = parseFloat(location.coords.longitude)
          region.latitudeDelta = LATITUDE_DELTA
          region.longitudeDelta = LONGITUDE_DELTA
  
          this.setState({ region: region})
  
          // #TODO send location
        }
      }
      
      async componentDidMount(){

        setTimeout(this.location_set, 5000);

    }

    toggleSwitch = () => {
      this.setState({shareMyLocation: !this.state.shareMyLocation})
    }

    render(){
        return (
          <View style={styles.container}>
            <MapView 
            style={styles.map}
            initialRegion={this.state.region}
            region={this.state.region}
            mapType={Platform.OS == "android" ? "none" : "standard"}
            >
              {this.state.markers.map((marker, index) => (
                <Marker
                  key={index}
                  coordinate={marker.latlng}
                  title={marker.title}
                  description={marker.description}
                >
                  <Image
                    style={styles.MarkerImage}
                    source={marker.image}
                    // ref={(image)=>{this.image = image}}
                  />
                </Marker>
              ))}
            </MapView>
            <View style={styles.ShareMyLocation}>
                <Switch
                  trackColor={{ false: '#767577', true: 'green' }}
                  thumbColor={this.state.shareMyLocation ? '#f4f3f4' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={this.toggleSwitch}
                  value={this.state.shareMyLocation}
                />
                <Text style={{marginTop: 10}}>Share Location</Text>
            </View>
          </View>
        );

    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  ShareMyLocation: {
    position: 'absolute',
    bottom: 25,
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingRight: 25
  },
  MarkerImage: {
    height: 25,
    width: 25,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#000000'
  }
});
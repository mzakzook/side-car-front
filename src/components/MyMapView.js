import React from 'react';
import MapView from 'react-native-maps'



class MyMapView extends React.Component {
  // static navigationOptions = {
  //   title: 'SideCar',
  // };

  componentDidMount = () => {
    console.log(this.props)
  }

  render() {
    return (

      <MapView style={{ flex: 1 }} region={{ latitude: 42.882004, longitude: 74.582748, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }} showsUserLocation={true} />


    );
  }


}







export default MyMapView;


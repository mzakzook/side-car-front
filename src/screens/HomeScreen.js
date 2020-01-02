import React from 'react';
import { View, Text, AsyncStorage, ScrollView } from 'react-native'
import { connect } from 'react-redux';
import Button from 'react-native-button';
import { findUser } from '../actions/findUser';
import { Constants, Svg } from 'expo';
import { getProviders } from '../actions/provider';
import ProviderCard from '../components/ProviderCard'


class HomeScreen extends React.Component {
  // static navigationOptions = {
  //   title: 'SideCar',
  // };


  state = {
    ranFood: { biz_name: '' },
    ranBar: { biz_name: '' }
  }
  componentDidMount() {
    this._bootstrapAsync()
    this.getRanFood()
    this.getRanBar()
  }

  // // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    if (!this.props.id) {
      console.log(userToken)
      this.props.findUser(userToken)
    }
  };

  getRanFood = () => {
    fetch('http://localhost:3000/random_provider?type=foodtruck')
    .then(res => res.json())
    .then(data => {
      this.setState({ ranFood: data.data.attributes })
    })
  }

  getRanBar = () => {
    fetch('http://localhost:3000/random_provider?type=bartending')
    .then(res => res.json())
    .then(data => {
      this.setState({ ranBar: data.data.attributes })
    })
  }



  render() {
   
    
    return (
      <ScrollView>
        
        <Text style={{
          textAlign: 'center',
          paddingTop: 50,
          fontSize: 30,
          // color: '#A569BD',
          fontWeight: 'bold'
        }}
        >Restaurant Quality Food & Drinks at Your Next Event</Text>

<Text style={{
          textAlign: 'center',
          padding: 50,
          fontSize: 30,
          // color: '#A569BD',
          fontWeight: 'bold'
        }}
        >Featured Food Truck</Text>
  <View style={{alignItems: 'center'}}>{this.state.ranFood.biz_name.length > 0 ? <ProviderCard provider={this.state.ranFood}/> : <Text>Loading...</Text>}</View>
<Text style={{
          textAlign: 'center',
          padding: 50,
          fontSize: 30,
          // color: '#A569BD',
          fontWeight: 'bold'
        }}
        >Featured Bartender</Text>
  <View style={{alignItems: 'center'}}>{this.state.ranBar.biz_name.length > 0 ? <ProviderCard provider={this.state.ranBar}/> : <Text>Loading...</Text>}</View>

      </ScrollView>
    );
  }



}
const mapStateToProps = (state) => {
  return {
    first_name: state.auth.first_name,
    id: state.auth.id,
    providers: state.provider.providers
  };
};

// render() {
//   const { Circle, Text, TextPath, TSpan, G, Path } = Svg
//    return (
// <View style={{ flex: 1, justifyContent: 'center',
//     paddingTop: Constants.statusBarHeight, padding: 0 }}>
//     <Svg height="100%" width="100%" viewBox="0 0 300 300" {...props}>
//       <G id="circle">
//         <Circle
//           r={100}
//           x={150}
//           y={150}
//           fill="none"
//           stroke="none"
//           strokeWidth={0}
//           transform="rotate(-135)"
//         />
//       </G>
//       <Image
//         style={{ width: 220, height: 220, borderRadius: 110,
//           marginLeft: 68, marginTop: 175 }}
//         source={'https://images.absolutdrinks.com/drink-images/Raw/Absolut/939c2560-08d9-4df7-a28c-f80d9780e08d.jpg?imwidth=500'}
//       />
//       <Text fill="#000" fontSize="14">
//         <Text fill="#000" fontSize="14">
//           <TextPath href="#circle">
//             <TSpan dy={0}>
//               Text along a curved path...
//             </TSpan>
//           </TextPath>
//         </Text>
//       </Text>
//     </Svg>
//   </View>)}
// }

export default connect(mapStateToProps, { findUser, getProviders })(HomeScreen);
// export default HomeScreen

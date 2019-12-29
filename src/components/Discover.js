import React from 'react';
import { View, Button, Text, AsyncStorage, FlatList } from 'react-native'
import { connect }  from 'react-redux';
// import { bizNameChanged, taxIdChanged, photoIdChanged, websiteChanged, yelpChanged, bizPhoneChanged, categoryChanged, userIdChanged } from '../actions/provider';
import { bizChanged, getProviders } from '../actions/provider';
import ProviderCard from './ProviderCard'
import { withNavigation } from 'react-navigation'





class Discover extends React.Component {
  // static navigationOptions = {
  //   title: 'SideCar',
  // };

  // state = {
  //   providers: []
  // }


  
   
  

  handleProvClick = (data) => {
    // this.props.bizNameChanged(provider.bizName)
    // this.props.taxIdChanged(provider.taxId)
    // this.props.photoIdChanged(provider.photoId)
    // this.props.websiteChanged(provider.website)
    // this.props.yelpChanged(provider.yelp)
    // this.props.bizPhoneChanged(provider.bizPhone)
    // this.props.categoryChanged(provider.category)
    // this.props.userIdChanged(provider.userId)
    
    this.props.bizChanged(data)
    
    this.props.navigation.navigate('ProviderShow')
  }

  componentDidMount = () => {
    // fetch('http://localhost:3000/providers')
    //  .then(res => res.json())
    //  .then(data => {
    //    this.setState({
    //      providers: data
    //    })
    //  })
     this.props.getProviders()
  }
      
  render() {
    return (
      <View>
        <Text style={{
          textAlign: 'center',
          padding: 50,
          fontSize: 30,
          // color: '#A569BD',
          fontWeight: 'bold'
        }}
        >Discover Bartenders and Food Trucks</Text>
        {this.props.providers.length > 0 ? 
          <FlatList 
            style={{marginBottom: 180}}
            data={this.props.providers}
        // renderItem={({item}) => <Text onPress={() => this.handleProvClick(item.attributes)}>{item.attributes.biz_name}</Text>}

        renderItem={({item}) => <ProviderCard provider={item.attributes} />}
         /> 
        // this.state.providers.data.map(provider => {
        //   return <ProviderCard provider={provider.attributes} />
        // })
         : <Text>Loading...</Text>}
      </View>
      
    );
  }
}


const mapStateToProps = (state) => {
  return {
    // biz_name: state.provider.bizName,
    // tax_id: state.provider.taxId,
    // photo_id: state.provider.photoId,
    // website: state.provider.website,
    // yelp: state.provider.yelp,
    // biz_phone: state.provider.biz_phone,
    // category: state.provider.category,
    // user_id: state.provider.userId
    providers: state.provider.providers
  };
};

// export default connect(mapStateToProps, { bizNameChanged, taxIdChanged, photoIdChanged, websiteChanged, yelpChanged, bizPhoneChanged, categoryChanged, userIdChanged })(Discover);

// export default Discover
const mapDispatchToProps = {
  bizChanged,
  getProviders
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Discover));





import React from 'react';
import { View, Text, AsyncStorage, FlatList, ScrollView } from 'react-native'
import { connect }  from 'react-redux';
// import { bizNameChanged, taxIdChanged, photoIdChanged, websiteChanged, yelpChanged, bizPhoneChanged, categoryChanged, userIdChanged } from '../actions/provider';
import { getMyProviders, bizChanged } from '../actions/provider';
import ProviderCard from './ProviderCard'
import { withNavigation } from 'react-navigation'
import Button from 'react-native-button';
import { TouchableOpacity } from 'react-native-gesture-handler';




class MyProviders extends React.Component {
  // static navigationOptions = {
  //   title: 'SideCar',
  // };



  
   
  

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
    
    this.props.getMyProviders(this.props.id)
    
  }
      
  render() {
    return (
      <View style={{paddingBottom: 150}}>
        <Text style={{
          textAlign: 'center',
          padding: 50,
          fontSize: 30,
          // color: '#A569BD',
          fontWeight: 'bold'
        }}
        >My Businesses</Text>
        {this.props.my_providers.length > 0 ? 
          <ScrollView>
            {/* <FlatList 
            style={{marginBottom: 180}}
            data={this.props.my_providers}
        // renderItem={({item}) => <Text onPress={() => this.handleProvClick(item.attributes)}>{item.attributes.biz_name}</Text>}

        renderItem={({item}) => <ProviderCard provider={item.attributes} />}
        
         />  */}
         {this.props.my_providers.map(provider => {
           return <ProviderCard key={provider.attributes.id} provider={provider.attributes} />
         })}
         {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}> */}
           <Button style={{paddingTop: 35}} onPress={() => this.props.navigation.navigate('Profile')}>Back</Button>
           {/* </TouchableOpacity> */}
           </ScrollView>
        // this.state.providers.data.map(provider => {
        //   return <ProviderCard provider={provider.attributes} />
        // })
         : <View><Text>Loading...</Text><TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}><Button >Back</Button></TouchableOpacity></View>}
         
      </View>
      
    );
  }
}


const mapStateToProps = (state) => {
  return {
   id: state.auth.id,
   my_providers: state.provider.my_providers
  };
};

// export default connect(mapStateToProps, { bizNameChanged, taxIdChanged, photoIdChanged, websiteChanged, yelpChanged, bizPhoneChanged, categoryChanged, userIdChanged })(Discover);

// export default Discover


export default withNavigation(connect(mapStateToProps, { bizChanged, getMyProviders })(MyProviders));





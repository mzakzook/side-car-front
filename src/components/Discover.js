import React from 'react';
import { View, Button, Text, TextInput, AsyncStorage, FlatList, ScrollView } from 'react-native'
import { connect }  from 'react-redux';
// import { bizNameChanged, taxIdChanged, photoIdChanged, websiteChanged, yelpChanged, bizPhoneChanged, categoryChanged, userIdChanged } from '../actions/provider';
import { bizChanged, getProviders } from '../actions/provider';
import ProviderCard from './ProviderCard'
import { withNavigation } from 'react-navigation'





class Discover extends React.Component {
  // static navigationOptions = {
  //   title: 'SideCar',
  // };

  state = {
    providers: []
  }

  handleSearch = (text) => {
    
    const alteredProviders = this.props.providers.filter(provider => provider.attributes.biz_name.toLowerCase().includes(text.toLowerCase()))
    this.setState({
      providers: alteredProviders
    })
  }


  
   
  

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

  // providerList = () => {
  //   if (this.state.providers.length > 0) {
  //     return this.state.providers
  //   } else {
  //     return this.props.providers
  //   }
  // }

 
  
      
  render() {

    
    
    return (
      <View>
        <Text style={{
          textAlign: 'center',
          paddingHorizontal: 50,
          paddingVertical: 20,
          fontSize: 30,
          // color: '#A569BD',
          fontWeight: 'bold'
        }}
        >Discover Bartenders and Food Trucks</Text>
        <TextInput 
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginHorizontal: 30, textAlign:'center', borderRadius: 20 }}
        onChangeText={text => this.handleSearch(text)}
      // value={value}
      placeholder="Search"
      
      />
        {this.props.providers.length > 0 ? 
          
        //   <FlatList 
        //     style={{marginBottom: 180}}
        //     data={this.props.providers}
        // // renderItem={({item}) => <Text onPress={() => this.handleProvClick(item.attributes)}>{item.attributes.biz_name}</Text>}

        // renderItem={({item}) => <ProviderCard provider={item.attributes} />}
        //  /> 
        <ScrollView>
        {this.state.providers.length > 0 ? 
        this.state.providers.map(provider => {
          return <ProviderCard key={provider.attributes.id} provider={provider.attributes} />
        }) :
        this.props.providers.map(provider => {
          return <ProviderCard key={provider.attributes.id} provider={provider.attributes} />
        })
      }
         {/* {this.providerList().map(provider => {
           return <ProviderCard key={provider.attributes.id} provider={provider.attributes} />
         })} */}
         </ScrollView>
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





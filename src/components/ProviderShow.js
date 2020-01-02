import React from 'react';
import { View, Button, Text, AsyncStorage, FlatList, ScrollView, Image } from 'react-native';
import { withNavigation } from 'react-navigation'
import { connect }  from 'react-redux';
import EventCard from './EventCard'
import { PATH } from '../environment'






class ProviderShow extends React.Component {
  // static navigationOptions = {
  //   title: 'SideCar',
  // };
  state = {
    events: [],
    menuItems: []
  }

  componentDidMount = () => {
    this.fetchEvents()
  }

  fetchEvents = () => {
    fetch(`http://${PATH}:3000/events?provider_id=${this.props.biz_id}`)
     .then(res => res.json())
     .then(data => {
       this.setState({
         events: data.data
       })
     })
    }
  


  render() {
    console.log(this.props)
    console.log(this.props.images[0])
    return (
      <View>
        {this.props.user_id === this.props.id ? <Text onPress={() => this.props.navigation.navigate('Discover')}>Back</Text> : <Text onPress={() => this.props.navigation.navigate('Discover')}>Back</Text>}
        <Text>{this.props.biz_name}</Text>
        <Image
              source={{ uri: (this.props.images.length > 0 ? `http://${PATH}:3000${this.props.images[0]}` : this.props.placeholder_image)}}
              style={{ height: 300, width: 300, alignSelf: 'center' }}
            />
        
        <Text>{this.props.biz_phone}</Text>
        {this.props.user_id === this.props.id ? <Button onPress={() => this.props.navigation.navigate("EditBiz")} title='Edit' /> : null }
        <Text>Events</Text>
        {this.state.events.length > 0 ? 
        <ScrollView>
        {this.state.events.map(event => {
          return <EventCard key={event.attributes.id} event={event.attributes} />
        })}
         </ScrollView> : <Text>No Events Scheduled</Text>}
      
      </View>
    )
  }
}
      

const mapStateToProps = (state) => {
  return {
    
    biz_name: state.provider.biz_name,
    tax_id: state.provider.tax_id,
    placeholder_image: state.provider.placeholder_image,
    website: state.provider.website,
    yelp: state.provider.yelp,
    biz_phone: state.provider.biz_phone,
    category: state.provider.category,
    user_id: state.provider.user_id,
    id: state.auth.id,
    biz_id: state.provider.id,
    images: state.provider.images
  };
};

// export default withNavigation(connect(mapStateToProps)(ProviderShow));

// export default ProviderShow

export default withNavigation(connect(mapStateToProps)(ProviderShow));




import React from 'react';
import { View, Button, Text, AsyncStorage, FlatList, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation'
import { connect }  from 'react-redux';
import EventCard from './EventCard'





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
    fetch(`http://localhost:3000/events?provider_id=${this.props.biz_id}`)
     .then(res => res.json())
     .then(data => {
       this.setState({
         events: data.data
       })
     })
    }
  


  render() {
    console.log(this.props)
    
    return (
      <View>
        {this.props.user_id === this.props.id ? <Text onPress={() => this.props.navigation.navigate('Discover')}>Back</Text> : <Text onPress={() => this.props.navigation.navigate('Discover')}>Back</Text>}
        <Text>{this.props.biz_name}</Text>
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
    photo_id: state.provider.photo_id,
    website: state.provider.website,
    yelp: state.provider.yelp,
    biz_phone: state.provider.biz_phone,
    category: state.provider.category,
    user_id: state.provider.user_id,
    id: state.auth.id,
    biz_id: state.provider.id
  };
};

// export default withNavigation(connect(mapStateToProps)(ProviderShow));

// export default ProviderShow

export default withNavigation(connect(mapStateToProps)(ProviderShow));




import CardView from 'react-native-cardview'
import React from 'react';
import { View, Button, Text, AsyncStorage, FlatList, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux';





class EventCard extends React.Component {
  // static navigationOptions = {
  //   title: 'SideCar',
  // };

  // handlePress = (data) => {

  //   this.props.bizChanged(data)
  //   const provider = { provider: data }
  //   this.props.navigation.navigate('ProviderShow', provider)
  // }
  editEvent = (event) => {
    
    this.props.navigation.navigate("EditEvent", event)
  }


  render() {


    return (
      <View>
        <CardView
          cardElevation={2}
          cardMaxElevation={2}
          cornerRadius={5}
          style={styles.cardViewStyle}>
          <TouchableOpacity><Text style={styles.cardView_InsideText} >
            {this.props.event.title}
            {/* hi {"\n"}
              hello
               */}
          </Text></TouchableOpacity>

          {/* <TouchableHighlight onPress={() => this.handlePress(this.props.provider)}><Image

            style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}
            source={{ uri: 'https://rfsdelivers.com/media/zoo/images/07-02-barbacoa-beef-street-tacos_63120b9e05f99470e104562c019a9455.jpg' }}
          /></TouchableHighlight> */}

          {/* <Text onPress={() => this.handlePress(this.props.provider)}
            style={{padding: 0, 
              fontSize: 20, 
    color: '#000', 
    textAlign: 'center'}}>{this.props.provider.biz_name}</Text> */}
          {this.props.user_id === this.props.id ? 
          <TouchableOpacity onPress={() => this.editEvent(this.props.event)}><View pointerEvents='none'><Button title="Edit Event" /></View></TouchableOpacity> : null }
        </CardView>
 
      </View>
    )
  }
}


const styles = {

  MainContainer: {

    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    alignItems: 'center'

  },

  cardViewStyle: {


    height: 150

  },

  cardView_InsideText: {

    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    marginTop: 50

  }

}



// export default withNavigation(ProviderCard);

// const mapDispatchToProps = {
//   bizChanged
// }

// export default EventCard;

// export default connect(null, mapDispatchToProps)(ProviderCard);



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

export default withNavigation(connect(mapStateToProps)(EventCard));
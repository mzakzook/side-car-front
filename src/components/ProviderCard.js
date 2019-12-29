import CardView from 'react-native-cardview'
import React from 'react';
import { View, Button, Text, AsyncStorage, FlatList, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux';
import { bizChanged } from '../actions/provider';




class ProviderCard extends React.Component {
  // static navigationOptions = {
  //   title: 'SideCar',
  // };

  handlePress = (data) => {

    this.props.bizChanged(data)
    const provider = { provider: data }
    this.props.navigation.navigate('ProviderShow', provider)
  }


  render() {


    return (
      <View>
        <CardView
          cardElevation={2}
          cardMaxElevation={2}
          cornerRadius={5}
          style={styles.cardViewStyle}>
          <TouchableOpacity><Text style={styles.cardView_InsideText} onPress={() => this.handlePress(this.props.provider)}>
            {this.props.provider.biz_name}
            {/* hi {"\n"}
              hello
               */}
          </Text></TouchableOpacity>

          <TouchableHighlight onPress={() => this.handlePress(this.props.provider)}><Image

            style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}
            source={{ uri: 'https://rfsdelivers.com/media/zoo/images/07-02-barbacoa-beef-street-tacos_63120b9e05f99470e104562c019a9455.jpg' }}
          /></TouchableHighlight>

          {/* <Text onPress={() => this.handlePress(this.props.provider)}
            style={{padding: 0, 
              fontSize: 20, 
    color: '#000', 
    textAlign: 'center'}}>{this.props.provider.biz_name}</Text> */}

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

const mapDispatchToProps = {
  bizChanged
}

export default withNavigation(connect(null, mapDispatchToProps)(ProviderCard));

// export default connect(null, mapDispatchToProps)(ProviderCard);




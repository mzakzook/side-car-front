import CardView from 'react-native-cardview'
import React from 'react';
import { View, Button, Text, AsyncStorage, FlatList, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux';
import { bizChanged } from '../actions/provider';
import { PATH } from '../environment'



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
      <View >
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

          <TouchableHighlight style={{justifyContent: 'center', alignItems: 'center'}}onPress={() => this.handlePress(this.props.provider)}><Image

            style={{ height: 200, justifyContent: 'center', alignItems: 'center', borderRadius: 25, width: 325 }}
            source={{ uri: (this.props.provider.images.length > 0 ? `http://${PATH}:3000${this.props.provider.images[0]}` : this.props.provider.placeholder_image) }}
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
    justifyContent: 'center',
    height: 300, 
    width: 375,
    borderWidth: 1,
    borderColor: 'lightgrey',
    marginBottom: 25,
    borderRadius: 25

  },

  cardView_InsideText: {

    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    marginTop: 5

  }

}



// export default withNavigation(ProviderCard);

const mapDispatchToProps = {
  bizChanged
}

export default withNavigation(connect(null, mapDispatchToProps)(ProviderCard));

// export default connect(null, mapDispatchToProps)(ProviderCard);




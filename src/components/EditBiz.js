import React from 'react';
import { View, Text, AsyncStorage } from 'react-native'
import { connect } from 'react-redux';
import { withNavigation, StackActions, NavigationActions } from 'react-navigation'
import { Hoshi } from 'react-native-textinput-effects';
import RNPickerSelect from 'react-native-picker-select';
import Button from 'react-native-button'
import { bizChanged, getMyProviders, getProviders } from '../actions/provider';


class EditBiz extends React.Component {
  // static navigationOptions = {
  //   title: 'SideCar',
  // };

  state = {
    biz_name: '',

    website: '',
    yelp: '',
    biz_phone: ''
  }
  componentDidMount = () => {
    console.log(this.props)
  }

  // t.string "biz_name"
  //   t.string "tax_id"
  //   t.string "photo_id"
  //   t.string "website"
  //   t.string "yelp"
  //   t.string "biz_phone"
  //   t.string "category"
  //   t.bigint "user_id", null:

  bizNameChanged = (value) => {
    this.setState({
      biz_name: value
    })
  }


  websiteChanged = (value) => {
    this.setState({
      website: value
    })
  }

  yelpChanged = (value) => {
    this.setState({
      yelp: value
    })
  }

  bizPhoneChanged = (value) => {
    this.setState({
      biz_phone: value
    })
  }

  deleteBiz = () => {
    fetch(`http://localhost:3000/providers/${this.props.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json'
      }
    })
      .then(res => {
        console.log("here is the res" + res)
        this.props.getProviders()
        this.props.getMyProviders(this.props.user_id)
        alert('Business Deleted')
        this.props.navigation.dispatch(resetAction)
      })
  }

  

  



  submitForm = () => {
    // fetch(`http://localhost:3001/api/v1/plants/${this.state.plant.attributes.id}`, {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Accepts: 'application/json'
    //   },
    //   body: JSON.stringify(
    //     saveBody
    //   )
    // })
    //   .then(res => res.json())
    //   .then(plants => {
    //     this.setState({
    //       show: false
    //     })
    //     this.props.fetchPlants()
    //   })
    let saveData = {}
    if (this.state.biz_name.length > 0) {
      saveData["biz_name"] = this.state.biz_name
    }
    if (this.state.biz_phone.length > 0) {
      saveData["biz_phone"] = this.state.biz_phone
    }
    if (this.state.website.length > 0) {
      saveData["website"] = this.state.website
    }
    if (this.state.yelp.length > 0) {
      saveData["yelp"] = this.state.yelp
    }
    

    if (Object.entries(saveData).length !== 0 && saveData.constructor === Object) {
      fetch(`http://localhost:3000/providers/${this.props.id}`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          provider: 
            saveData
          
        })
      })
        .then(res => res.json())
        .then(data => {

          const stuff = data.data.attributes
          
          this.props.bizChanged(stuff)
          this.props.getProviders()
          this.props.getMyProviders(this.props.user_id)
          this.props.navigation.dispatch(popAction)
          this.props.navigation.navigate('ProviderShow')
        })
    } else {
      this.props.navigation.dispatch(popAction)
    }
  }

  render() {
    return (
      <View style={styles.viewStyle}>

        <Hoshi inputPadding={16} placeholder={this.props.biz_name}
          inputStyle={{ color: 'black' }} borderColor={"black"} onChangeText={this.bizNameChanged.bind(this)} />
        <Hoshi autoCapitalize='none' inputPadding={16} placeholder={this.props.website}
          inputStyle={{ color: 'black' }} borderColor={"black"} onChangeText={this.websiteChanged.bind(this)} />
        <Hoshi autoCapitalize='none' inputPadding={16} placeholder={this.props.yelp}
          inputStyle={{ color: 'black' }} borderColor={"black"} onChangeText={this.yelpChanged.bind(this)} />
        <Hoshi inputPadding={16} placeholder={this.props.biz_phone}
          inputStyle={{ color: 'black' }} borderColor={"black"} onChangeText={this.bizPhoneChanged.bind(this)} />

        <Button style={{ color: "black", marginTop: 38 }} onPress={() => this.submitForm()}>Save</Button>
        <Button style={{ color: "red" }} onPress={() => this.deleteBiz()}>Delete Business</Button>
        <Button style={{ color: "black" }} onPress={() => this.props.navigation.navigate('Profile')}>Back to Profile</Button>
      </View>

    );
  }




}
const mapStateToProps = (state) => {
  return {

    id: state.provider.id,
    biz_name: state.provider.biz_name,

    website: state.provider.website,
    yelp: state.provider.yelp,
    biz_phone: state.provider.biz_phone,
    user_id: state.auth.id

  };
};


const styles = {
  viewStyle: {
    marginTop: 50,
    padding: 10
  },
  bottomText: {
    marginTop: 20,
    padding: 5,
    textAlign: 'center'
  }
};

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'App' })],
});

const popAction = StackActions.pop({
  n: 1,
});




export default withNavigation(connect(mapStateToProps, { bizChanged, getMyProviders, getProviders })(EditBiz));


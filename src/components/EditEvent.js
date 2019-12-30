import React from 'react';
import { View, Text, AsyncStorage, DatePickerIOS } from 'react-native'
import { connect } from 'react-redux';
import { withNavigation, StackActions, NavigationActions } from 'react-navigation'
import { Hoshi } from 'react-native-textinput-effects';
import RNPickerSelect from 'react-native-picker-select';
import Button from 'react-native-button'
import { bizChanged, getMyProviders, getProviders } from '../actions/provider';

class EditEvent extends React.Component {
  // static navigationOptions = {
  //   title: 'SideCar',
  // };

  
  state = {
    edate: this.props.navigation.state.params.edate,

    title: '',
    description: ''
   
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

  edateChanged = (value) => {
    this.setState({
      edate: value
    })
  }


  titleChanged = (value) => {
    this.setState({
      title: value
    })
  }

  descriptonChanged = (value) => {
    this.setState({
      description: value
    })
  }

 

  // deleteEvent = () => {
  //   fetch(`http://localhost:3000/providers/${this.props.id}`, {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accepts: 'application/json'
  //     }
  //   })
  //     .then(res => {
  //       console.log("here is the res" + res)
  //       this.props.getProviders()
  //       this.props.getMyProviders(this.props.user_id)
  //       alert('Business Deleted')
  //       this.props.navigation.dispatch(resetAction)
  //     })
  // }

  

  



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
    if (this.state.title.length > 0) {
      saveData["title"] = this.state.title
    }
    if (this.state.description.length > 0) {
      saveData["description"] = this.state.description
    }
    if (this.state.edate.length > 0) {
      saveData["edate"] = this.state.edate
    }
    
    

    if (Object.entries(saveData).length !== 0 && saveData.constructor === Object) {
      fetch(`http://localhost:3000/events/${this.props.id}`, {
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

        <Hoshi inputPadding={16} placeholder={this.props.navigation.state.params.title}
          inputStyle={{ color: 'black' }} borderColor={"black"} onChangeText={e => this.titleChanged(e)} />
        <Hoshi inputPadding={16} placeholder={this.props.navigation.state.params.description}
          inputStyle={{ color: 'black' }} borderColor={"black"} onChangeText={e => this.descriptionChanged(e)} />
        <DatePickerIOS
          date={new Date(this.state.edate)}
          onDateChange={this.edateChanged.bind(this)}
        />
        <Button style={{ color: "black", marginTop: 38 }} onPress={() => this.props.navigation.dispatch(popAction)}>Cancel</Button>

        <Button style={{ color: "black" }} onPress={() => this.submitForm()}>Save</Button>
        <Button style={{ color: "red" }} onPress={() => this.deleteEvent()}>Delete Event</Button>
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




export default withNavigation(connect(mapStateToProps)(EditEvent));


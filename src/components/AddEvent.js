import React from 'react';
import { View, Text, AsyncStorage } from 'react-native'
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import { withNavigation, StackActions, NavigationActions } from 'react-navigation'
import { Hoshi } from 'react-native-textinput-effects';
import RNPickerSelect from 'react-native-picker-select';
import Button from 'react-native-button'
import { bizChanged, getMyProviders, getProviders } from '../actions/provider';
import { PATH } from '../environment'


class AddEvent extends React.Component {
  // static navigationOptions = {
  //   title: 'SideCar',
  // };

  
  state = {
    edate: new Date(),

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
    }, () => console.log(this.state.edate))
  }


  titleChanged = (value) => {
    this.setState({
      title: value
    })
  }

  descriptionChanged = (value) => {
    this.setState({
      description: value
    })
  }

 



  

  



  submitForm = () => {
    
    let saveData = {}
    if (this.state.title.length > 0) {
      saveData["title"] = this.state.title
    }
    if (this.state.description.length > 0) {
      saveData["description"] = this.state.description
    }
    
    
    
    

    if (Object.entries(saveData).length !== 0 && saveData.constructor === Object) {
      saveData["provider_id"] = this.props.id
      saveData["edate"] = new Date(this.state.edate)
      fetch(`http://${PATH}:3000/events`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          event: 
            saveData
          
        })
      })
        .then(res => res.json())
        .then(data => {
          
          
          
          
          
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

        <Hoshi inputPadding={16} placeholder="Event Title"
          inputStyle={{ color: 'black' }} borderColor={"black"} onChangeText={e => this.titleChanged(e)} />
        <Hoshi inputPadding={16} placeholder="Event Description"
          inputStyle={{ color: 'black' }} borderColor={"black"} onChangeText={e => this.descriptionChanged(e)} />
        {/* <DatePickerIOS
          date={new Date(this.state.edate)}
          onDateChange={this.edateChanged.bind(this)}
        /> */}

<DatePicker
          style={{width: 200}}
          date={new Date(this.state.edate)} //initial date from state
          mode="date" //The enum of date, datetime and time
          placeholder="select date"
          format="MM-DD-YYYY"
          minDate={new Date()}
          maxDate="01-01-2025"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={this.edateChanged.bind(this)}
        />
        <Button style={{ color: "black", marginTop: 38 }} onPress={() => this.props.navigation.navigate("ProviderShow")}>Cancel</Button>

        <Button style={{ color: "black" }} onPress={() => this.submitForm()}>Save</Button>
        <Button style={{ color: "red" }} onPress={() => this.deleteEvent()}>Delete Event</Button>
  
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




export default withNavigation(connect(mapStateToProps)(AddEvent));


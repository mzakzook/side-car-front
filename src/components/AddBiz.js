import React from 'react';
import { View, Text, AsyncStorage } from 'react-native'
import { connect } from 'react-redux';
import { withNavigation, StackActions } from 'react-navigation'
import { Hoshi } from 'react-native-textinput-effects';
import RNPickerSelect from 'react-native-picker-select';
import Button from 'react-native-button'
import { bizChanged, getProviders, getMyProviders } from '../actions/provider';


class AddBiz extends React.Component {
  // static navigationOptions = {
  //   title: 'SideCar',
  // };

  state = {
    biz_name: '',
    tax_id: '',
    photo_id: '',
    website: '',
    yelp: '',
    biz_phone: '',
    category: ''
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

  taxIdChanged = (value) => {
    this.setState({
      tax_id: value
    })
  }

  photoIdChanged = (value) => {
    this.setState({
      photo_id: value
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

  categoryChanged = (value) => {
    this.setState({
      category: value
    })
  }

  submitForm = () => {
    
    fetch('http://localhost:3000/providers', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        provider: {
          biz_name: this.state.biz_name,
          tax_id: this.state.tax_id,
          photo_id: this.state.photo_id,
          website: this.state.website,
          yelp: this.state.yelp,
          biz_phone: this.state.biz_phone,
          category: this.state.category,
          user_id: this.props.id
        }
      })
    })
    .then(res => res.json())
    .then(data => {
      
      const stuff = data.data.attributes
      this.props.bizChanged(stuff)
      this.props.getProviders()
      this.props.getMyProviders(this.props.id)
      this.props.navigation.dispatch(popAction)
      this.props.navigation.navigate('ProviderShow')
    })
  }

  render() {
    return (
      <View style={styles.viewStyle}>
      
        <Hoshi label={'Business Name'} inputPadding={16}
          inputStyle={{ color: 'black' }} borderColor={"black"} onChangeText={this.bizNameChanged.bind(this)} />
        <Hoshi label={"Tax ID"} inputPadding={16}
          inputStyle={{ color: 'black' }} borderColor={"black"} onChangeText={this.taxIdChanged.bind(this)} />
        <Hoshi label={"Upload Photo ID"} inputPadding={16}
          inputStyle={{ color: 'black' }} borderColor={"black"} onChangeText={this.photoIdChanged.bind(this)} />
        <Hoshi label={"Website"} inputPadding={16}
          inputStyle={{ color: 'black' }} borderColor={"black"} onChangeText={this.websiteChanged.bind(this)} />
        <Hoshi autoCapitalize='none' label={"Yelp"} inputPadding={16}
          inputStyle={{ color: 'black' }} borderColor={"black"} onChangeText={this.yelpChanged.bind(this)} />
        <Hoshi autoCapitalize='none' label={"Business Phone"} inputPadding={16} 
          inputStyle={{ color: 'black' }} borderColor={"black"} onChangeText={this.bizPhoneChanged.bind(this)} />
        
        <RNPickerSelect
          // placeholder={ "Category" }
          style={pickerStyle}
          onValueChange={(value) => this.categoryChanged(value)}
          items={[
            { label: 'Food Truck', value: 'Food Truck' },
            { label: 'Bartending', value: 'Bartending' }
          ]}
        />
        <Button style={{ color: "black", marginTop: 38 }} onPress={() => this.submitForm()}>Submit</Button>
        <Button style={{ color: "black" }} onPress={() => this.props.navigation.navigate('Profile')}>Back to Profile</Button>
      </View>

    );
  }




}
const mapStateToProps = (state) => {
  return {
    first_name: state.auth.first_name,
    last_name: state.auth.last_name,
    email: state.auth.email,
    avatar: state.auth.avatar,
    cell_number: state.auth.cell_number,
    id: state.auth.id
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

const pickerStyle = {
	inputIOS: {
		color: 'black',
		paddingTop: 19,
		paddingHorizontal: 16,
    paddingBottom: 12,
    fontSize: 18,
    fontWeight: '700'
	},
	underline: { borderTopWidth: 0 },
	icon: {
		position: 'absolute',
		backgroundColor: 'transparent',
		borderTopWidth: 5,
		borderTopColor: '#00000099',
		borderRightWidth: 5,
		borderRightColor: 'transparent',
		borderLeftWidth: 5,
		borderLeftColor: 'transparent',
		width: 0,
		height: 0,
		top: 20,
		right: 15,
	},
};

const popAction = StackActions.pop({
  n: 1,
});


export default withNavigation(connect(mapStateToProps, { bizChanged, getMyProviders, getProviders })(AddBiz));


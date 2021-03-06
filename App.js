/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text
} from 'react-native';

import {
  Colors,
  
} from 'react-native/Libraries/NewAppScreen';
import RazorpayCheckout from 'react-native-razorpay';
import base64 from 'react-native-base64';
import Config from 'react-native-config';


export default class App extends React.Component {
  
  componentDidMount(){
    alert(`${Config.PAY_KEY_ID} - ${Config.PAY_KEY_SECRET}`);
  }

  onPayNow = async() => {
    
    fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + base64.encode(`${Config.PAY_KEY_ID}:${Config.PAY_KEY_SECRET}`),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          amount: 100,
          currency: "INR",
          receipt: Config.PAY_KEY_ID
      })
    }) .then((response) => response.json())
    .then((res) => {
        const {id, receipt, amount} = res;
        var options = {
          "key": receipt,
          "order_id": id,
          "theme": {color: '#53a20e'}
        }
        RazorpayCheckout.open(options).then((data) => {
          alert(JSON.stringify(data));
          console.log(JSON.stringify(data));
            // props.navigation.replace(Routes.PAYMENT_SUCCESS)
          }).catch((error) => {
              alert("You have cancel the transactions");
              console.log(error);

        });
    })
    
    
    
  }
  
  render(){
    return (
      <>
        <View style={{flex:1,
             justifyContent:'center',
             alignItems:'center'
            
            }}>
              <Text style={{
                color: 'black',
                fontSize: 24,
                marginBottom: 40,
              }}>Rs 1</Text>
            <TouchableOpacity
              style={{
                width: '80%',
                height: 40,
                backgroundColor: 'green',
                justifyContent:'center',
                alignItems:'center'
              }}
              onPress={() => this.onPayNow()}
              >
                <Text style={{
                  color: 'white '
                }}>Pay Now</Text>
            </TouchableOpacity>
        </View>
      </>
    );
  }
 
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});


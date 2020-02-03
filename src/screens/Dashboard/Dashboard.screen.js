import React, {Component} from 'react';
import {View, Text, StatusBar, TouchableOpacity, TextInput} from 'react-native';
import styles from './Dashboard.style';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MainComponent from '../../Components/CommandScreen.component';
import Modal from 'react-native-modal';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      text: '',
    };
  }
  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    console.disableYellowBox = true;
    const {text} = this.state;
    return (
      <>
        <Modal
          isVisible={this.state.isModalVisible}
          onBackdropPress={() => this.setState({isModalVisible: false})}
          style={{justifyContent: 'center', alignItems: 'center'}}
          onSwipeComplete = {() => this.setState({isModalVisible: false})}
          swipeDirection={["left", 'right']}
          >
          <View style={styles.modal}>
            <View style={styles.closeModal}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#E5E0E7',
                  borderRadius: 8,
                }}>
                <Icon name="close" size={25} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>DURATION</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => this.setState({text})}
                value={text}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>SAMPLE RATE</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => this.setState({text})}
                value={text}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>RANGE</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => this.setState({text})}
                value={text}
              />
            </View>
          </View>
        </Modal>
        <View style={styles.container}>
          <StatusBar
            barStyle="light-content"
            hidden={false}
            backgroundColor="black"
            translucent={true}
          />
          <View style={styles.actionBar}>
            <TouchableOpacity style={styles.arrowBack}>
              <Icon name="arrow-back" size={25} color="#ffff" />
            </TouchableOpacity>
            <Text style={styles.screenTitle}>COMMAND SCREEN</Text>
            <TouchableOpacity style={styles.settingsIcon}>
              <Icon name="settings" size={25} color="#ffff" />
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>
            <MainComponent elementNo={1} />
            <MainComponent elementNo={2} />
            <MainComponent elementNo={3} />
            <MainComponent elementNo={4} />
            <MainComponent elementNo={5} />
            <MainComponent elementNo={6} />
          </View>
        </View>
      </>
    );
  }
}
export default Dashboard;

import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Picker,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import styles from './Dashboard.style';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MainComponent from '../../Components/CommandScreen.component';
import Modal from 'react-native-modal';
import Devices from '../../Devices/Devices.list';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      text: '',
      commands: [],
      selectedCommand: '',
      inputs: [],
      pickers: [],
      selectedDropDownValue: null
    };
  }
  itemClicked = label => {
    this.setState({isModalVisible: true, selectedCommand: label});
  };
  renderPicker(options) {
    return options.map(obj => {
      return <Picker.Item label={obj.label} value={obj.value} />;
    });
  }
  onClickDropdown(data, index, item) {
    // save each items selected data with their id
      this.setState((prevState) => {
        const { selectedDropDownValue } = Object.assign({}, prevState.selectedDropDownValue, { [item.id]: data});
        return { selectedDropDownValue };
      });
      console.log(item.id)
    }
  getCommand = () => {
    console.log(this.state.selectedDropDownValue)
    let rows = [];
    let {selectedCommand} = this.state;
    Devices[0].commands.map(obj => {
      if (obj.label == selectedCommand) {
        if (obj.cmdParams) {
          for (var key in obj.cmdParams) {
            if (obj.cmdParams.hasOwnProperty(key)) {
              if (obj.cmdParams[key].type == 'select') {
                rows.push(
                  <View style={styles.inputContainer}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                      {obj.cmdParams[key].title}
                    </Text>
                    <Picker
                      key = {obj.cmdParams[key].id}
                      selectedValue={this.state.selectedDropDownValue?
                      this.state.selectedDropDownValue[obj.cmdParams[key].id]?  
                      this.state.selectedDropDownValue[obj.cmdParams[key].id]:'':''
                      }
                      onValueChange={(itemValue, itemIndex) =>
                        this.onClickDropdown(itemValue, itemIndex, obj.cmdParams[key])
                      }>
                      {this.renderPicker(obj.cmdParams[key].options.default)}
                    </Picker>
                  </View>,
                );
              } else if (obj.cmdParams[key].type == 'number') {
                rows.push(
                  <View style={styles.inputContainer}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                      {obj.cmdParams[key].title}
                    </Text>
                    <TextInput
                      keyboardType="numeric"
                      style={styles.input}
                      onChangeText={text => this.setState({text})}
                    />
                  </View>,
                );
              }
            }
          }
          rows.push(
            <View style={styles.buttonContainer}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                Go
              </Text>
            </View>,
          );
        } else {
          rows.push(<ActivityIndicator size={50} color="#4551E7" />);
        }
      }
    });
    return rows;
  };
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
          onSwipeComplete={() => this.setState({isModalVisible: false})}
          swipeDirection={['left', 'right']}>
          <View style={styles.modal}>
            <View style={styles.closeModal}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#E5E0E7',
                  borderRadius: 8,
                }}
                onPress={() => this.setState({isModalVisible: false})}>
                <Icon name="close" size={25} color="black" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalScroll}>
              {this.getCommand()}
            </ScrollView>
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
            {Devices[0].commands.map(item => {
              return (
                <MainComponent
                  elementNo={1}
                  title={item.title}
                  deviceNo={1}
                  onPressOpen={() => this.itemClicked(item.label)}
                />
              );
            })}
          </View>
        </View>
      </>
    );
  }
}
export default Dashboard;

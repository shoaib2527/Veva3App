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
  Alert,
} from 'react-native';
import styles from './Dashboard.style';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MainComponent from '../../Components/CommandScreen.component';
import Modal from 'react-native-modal';
import Devices from '../../Devices/Devices.list';
import {enableScreens} from 'react-native-screens';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      selectedCommand: '',
      noParams: false,

      // Commands States
      isSR: false,
      SRoptions: [],
      selectedSrValue: '',
      selectedSrLabel: '',

      isSec: false,
      seconds: '',
      secondsMin: 0,
      secondsMax: 0,
      isSecondsValid: true,

      isRange: false,
      RangeOptions: [],
      selectedRangeValue: '',
      selectedRangeLabel: '',

      isFilter: false,
      FilterOptions: [],
      selectedFilterValue: '',
      selectedFilterLabel: '',

      isRawData: false,
      RawDataOptions: [],
      selectedRawValue: '',
      selectedRawLabel: '',
    };
  }
  itemClicked = label => {
    this.setState({isModalVisible: true, selectedCommand: label});
    this.commandSetup(label);
  };
  renderPicker(options) {
    return options.map(obj => {
      return <Picker.Item label={obj.label} value={obj.value} />;
    });
  }
  onClickDropdown(data, index, item) {
    this.setState(prevState => {
      const {selectedDropDownValue} = Object.assign(
        {},
        prevState.selectedDropDownValue,
        {[item.id]: data},
      );
      return {selectedDropDownValue};
    });
    console.log(item.id);
  }

  commandSetup = selectedCommand => {
    Devices[0].commands.map(command => {
      if (command.label == selectedCommand) {
        if (command.cmdParams) {
          this.setState({noParams: false});
          if (command.cmdParams.sr) {
            var SRoptions = command.cmdParams.sr.options.default;
            var selectedSrValue = SRoptions[0].value;
            var selectedSrLabel = SRoptions[0].label;
            this.setState({
              isSR: true,
              SRoptions,
              selectedSrLabel,
              selectedSrValue,
            });
          } else {
            this.setState({isSR: false});
          }
          if (command.cmdParams.range) {
            var RangeOptions = command.cmdParams.range.options.default;
            var selectedRangeValue = RangeOptions[0].value;
            var selectedRawLabel = RangeOptions[0].label;
            this.setState({
              isRange: true,
              RangeOptions,
              selectedRawLabel,
              selectedRangeValue,
            });
          } else {
            this.setState({isRange: false});
          }
          if (command.cmdParams.filter) {
            var FilterOptions = command.cmdParams.filter.options.default;
            var selectedFilterValue = FilterOptions[0].value;
            var selectedFilterLabel = FilterOptions[0].label;
            this.setState({
              isFilter: true,
              FilterOptions,
              selectedFilterLabel,
              selectedFilterValue,
            });
          } else {
            this.setState({isFilter: false});
          }
          if (command.cmdParams.raw) {
            var RawDataOptions = command.cmdParams.raw.options.default;
            var selectedRawValue = RawDataOptions[0].value;
            var selectedRawLabel = RawDataOptions[0].label;
            this.setState({
              isRawData: true,
              RawDataOptions,
              selectedRawLabel,
              selectedRawValue,
            });
          } else {
            this.setState({isRawData: false});
          }
          if (command.cmdParams.sec) {
            var secondsMin = command.cmdParams.sec.validation.thousand.min;
            var secondsMax = command.cmdParams.sec.validation.thousand.max;
            this.setState({
              isSec: true,
              secondsMax,
              secondsMin,
            });
          } else {
            this.setState({isSec: false});
          }
        } else {
          this.setState({noParams: true});
        }
      }
    });
  };
  onsecondsValueChange = seconds => {
    const {secondsMax, secondsMin} = this.state;
    if (parseInt(seconds) <= secondsMax && parseInt(seconds) >= secondsMin)
      this.setState({isSecondsValid: true, seconds: parseInt(seconds)});
    else this.setState({isSecondsValid: false, seconds: parseInt(seconds)});
  };
  updateSecondsRange = itemValue => {
    const {selectedCommand} = this.state;
    Devices[0].commands.map(command => {
      if (selectedCommand == command.label) {
        if (itemValue == '1000') {
          var secondsMax = command.cmdParams.sec.validation.thousand.max;
          var secondsMin = command.cmdParams.sec.validation.thousand.min;
          this.setState({
            secondsMax,
            secondsMin,
            selectedSrValue: itemValue,
          });
        } else if (itemValue == '2000') {
          var secondsMax = command.cmdParams.sec.validation.twoThousand.max;
          var secondsMin = command.cmdParams.sec.validation.twoThousand.min;
          this.setState({
            secondsMax,
            secondsMin,
            selectedSrValue: itemValue,
          });
        } else {
          var secondsMax = command.cmdParams.sec.validation.default.max;
          var secondsMin = command.cmdParams.sec.validation.default.min;
          this.setState({
            secondsMax,
            secondsMin,
            selectedSrValue: itemValue,
          });
        }
      }
    });
  };

  validateSeconds = () => {
    const {seconds, isSecondsValid} = this.state;
    if(seconds == '')
    {
      Alert.alert(null, "No field can be empty!");
    }
    else {
      if(isSecondsValid)
      {
        Alert.alert(null, "Success");
      }
      else
      {
        Alert.alert(null, "Enter Seconds within mentioned range!"); 
      }
    }
  }

  renderModalData = () => {
    const {
      noParams,
      isSR,
      SRoptions,
      selectedSrValue,
      isRange,
      RangeOptions,
      selectedRangeValue,
      isFilter,
      FilterOptions,
      selectedFilterValue,
      isRawData,
      RawDataOptions,
      selectedRawValue,
      isSecondsValid,
      isSec,
      secondsMax,
      secondsMin,
      seconds,
    } = this.state;
    return (
      <>
        {noParams ? (
          <ActivityIndicator size={50} color="#4551E7" />
        ) : isSR ? (
          <View style={styles.inputContainer}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Sample Rate</Text>
            <Picker
              key="sr"
              selectedValue={selectedSrValue}
              onValueChange={(itemValue, itemIndex) => {
                this.updateSecondsRange(itemValue);
              }}>
              {this.renderPicker(SRoptions)}
            </Picker>
          </View>
        ) : null}
        {!noParams ? (
          isSec ? (
            <View style={styles.inputContainer}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>Seconds</Text>
              <TextInput
                keyboardType="numeric"
                style={styles.input}
                value={seconds}
                keyboardType="numeric"
                onChangeText={seconds => this.onsecondsValueChange(seconds)}
              />
              {isSecondsValid ? null : (
                <Text style={styles.invalidText}>
                  value must be in between {secondsMin} and {secondsMax}
                </Text>
              )}
            </View>
          ) : null
        ) : null}
        {!noParams ? (
          isRange ? (
            <View style={styles.inputContainer}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>Range</Text>
              <Picker
                key="rng"
                selectedValue={selectedRangeValue}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({selectedRangeValue: itemValue})
                }>
                {this.renderPicker(RangeOptions)}
              </Picker>
            </View>
          ) : null
        ) : null}
        {!noParams ? (
          isFilter ? (
            <View style={styles.inputContainer}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>Filter</Text>
              <Picker
                key="filter"
                selectedValue={selectedFilterValue}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({selectedFilterValue: itemValue})
                }>
                {this.renderPicker(FilterOptions)}
              </Picker>
            </View>
          ) : null
        ) : null}
        {!noParams ? (
          isRawData ? (
            <View style={styles.inputContainer}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>Raw Data</Text>
              <Picker
                key="raw"
                selectedValue={selectedRawValue}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({selectedRawValue: itemValue})
                }>
                {this.renderPicker(RawDataOptions)}
              </Picker>
            </View>
          ) : null
        ) : null}
        {!noParams ? (
          <TouchableOpacity style={styles.buttonContainer}
          onPress= {this.validateSeconds}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
              Go
            </Text>
          </TouchableOpacity>
        ) : null}
      </>
    );
  };
  

  // getCommand = () => {
  //   console.log(this.state.selectedDropDownValue)
  //   let rows = [];
  //   let {selectedCommand} = this.state;
  //   Devices[0].commands.map(obj => {
  //     if (obj.label == selectedCommand) {
  //       if (obj.cmdParams) {
  //         for (var key in obj.cmdParams) {
  //           if (obj.cmdParams.hasOwnProperty(key)) {
  //             if (obj.cmdParams[key].type == 'select') {
  //               rows.push(
  //                 <View style={styles.inputContainer}>
  //                   <Text style={{fontSize: 16, fontWeight: 'bold'}}>
  //                     {obj.cmdParams[key].title}
  //                   </Text>
  //                   <Picker
  //                     key = {obj.cmdParams[key].id}
  //                     selectedValue={this.state.selectedDropDownValue?
  //                     this.state.selectedDropDownValue[obj.cmdParams[key].id]?
  //                     this.state.selectedDropDownValue[obj.cmdParams[key].id]:'':''
  //                     }
  //                     onValueChange={(itemValue, itemIndex) =>
  //                       this.onClickDropdown(itemValue, itemIndex, obj.cmdParams[key])
  //                     }>
  //                     {this.renderPicker(obj.cmdParams[key].options.default)}
  //                   </Picker>
  //                 </View>,
  //               );
  //             } else if (obj.cmdParams[key].type == 'number') {
  //               rows.push(
  //                 <View style={styles.inputContainer}>
  //                   <Text style={{fontSize: 16, fontWeight: 'bold'}}>
  //                     {obj.cmdParams[key].title}
  //                   </Text>
  //                   <TextInput
  //                     keyboardType="numeric"
  //                     style={styles.input}
  //                     onChangeText={text => this.setState({text})}
  //                   />
  //                 </View>,
  //               );
  //             }
  //           }
  //         }
  //         rows.push(
  //           <View style={styles.buttonContainer}>
  //             <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
  //               Go
  //             </Text>
  //           </View>,
  //         );
  //       } else {
  //         rows.push(<ActivityIndicator size={50} color="#4551E7" />);
  //       }
  //     }
  //   });
  //   return rows;
  // };
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
              {this.renderModalData()}
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

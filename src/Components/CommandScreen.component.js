import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Feather';

const MainComponent = ({elementNo, title, onPressOpen, deviceNo}) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.optionsIcon}>
        <Icon name="dots-three-horizontal" size={25} color="#D3CED5" />
      </TouchableOpacity>

      {elementNo == 1 ? (
        <>
          <View style={styles.mainIconContainer}>
            <TouchableOpacity onPress={onPressOpen}>
              <Icon2 name="thumbs-up" size={35} color="#5A99E8" />
            </TouchableOpacity>
          </View>
          <Text style={styles.componentTitle}>{title}</Text>
          <Text style={styles.deviceno}>Device number {deviceNo}</Text>
        </>
      ) : null}
      {elementNo == 2 ? (
        <>
          <View style={styles.mainIconContainer}>
            <Icon2 name="thumbs-up" size={35} color="#5A99E8" />
          </View>
          <Text style={styles.componentTitle}>{title}</Text>
          <Text style={styles.deviceno}>Device number {deviceNo}</Text>
        </>
      ) : null}
      {elementNo == 3 ? (
        <>
          <View style={styles.mainIconContainer}>
            <Icon2 name="thumbs-up" size={35} color="#5A99E8" />
          </View>
          <Text style={styles.componentTitle}>{title}</Text>
          <Text style={styles.deviceno}>Device number {deviceNo}</Text>
        </>
      ) : null}
      {elementNo == 4 ? (
        <>
          <View style={styles.mainIconContainer}>
            <Icon2 name="thumbs-up" size={35} color="#5A99E8" />
          </View>
          <Text style={styles.componentTitle}>{title}</Text>
          <Text style={styles.deviceno}>Device number {deviceNo}</Text>
        </>
      ) : null}
      {elementNo == 5 ? (
        <>
          <View style={styles.mainIconContainer}>
            <Icon2 name="thumbs-up" size={35} color="#5A99E8" />
          </View>
          <Text style={styles.componentTitle}>{title}</Text>
          <Text style={styles.deviceno}>Device number {deviceNo}</Text>
        </>
      ) : null}
      {elementNo == 6 ? (
        <>
          <View style={styles.mainIconContainer}>
            <Icon2 name="thumbs-up" size={35} color="#5A99E8" />
          </View>
          <Text style={styles.componentTitle}>{title}</Text>
          <Text style={styles.deviceno}>Device number {deviceNo}</Text>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '30%',
    width: '45%',
    borderRadius: 10,
    marginBottom: '5%',
  },
  optionsIcon: {
    width: '100%',
    marginRight: '10%',
    alignItems: 'flex-end',
  },
  mainIconContainer: {
    height: '60%',
    width: '60%',
    borderRadius: 70,
    backgroundColor: '#E5E0E7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  componentTitle: {
    fontSize: 13,
    color: '#5A99E8',
  },
  deviceno: {
    fontSize: 9,
    color: 'grey',
  },
});

export default MainComponent;

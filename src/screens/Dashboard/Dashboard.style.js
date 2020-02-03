import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '7%',
    alignItems: 'center',
  },
  actionBar: {
    backgroundColor: 'black',
    height: '8%',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  screenTitle: {
    width: '75%',
    textAlign: 'center',
    color: 'white',
    fontSize: 19
  },
  arrowBack: {
    width: '10%',
    marginLeft: '2%',
    alignContent: 'flex-start',
  },
  settingsIcon: {
    width: '10%',
    alignContent: 'flex-end',
  },
  contentContainer: {
    backgroundColor: '#E4E1E5',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: '95%',
    width: '100%',
    paddingTop: '5%',
  },
  modal:{
      borderRadius: 4,
      backgroundColor: 'white',
      width: '80%',
      height: '40%',
      paddingVertical: '1%',
      alignItems: "center"
  },
  closeModal:{
      width: "99%",
      marginRight: '1%',
      alignItems: 'flex-end'
  },
  inputContainer: {
    width: "80%",
    height: '30%'
  },
  input: {
      borderWidth: 0.5,
      borderRadius: 10,
      borderColor: 'grey',
      height: '50%',
      width: '95%'
  }
});
export default styles;

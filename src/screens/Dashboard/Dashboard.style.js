import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '5%',
    alignItems: 'center',
  },
  actionBar: {
    backgroundColor: 'black',
    height: '10%',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  screenTitle: {
    width: '75%',
    textAlign: 'center',
    color: 'white',
    fontSize: 19,
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
  modal: {
    borderRadius: 4,
    backgroundColor: 'white',
    width: '85%',
    height: '50%',
    paddingVertical: '1%',
    alignItems: 'center',
  },
  modalScroll: {
    width: '90%',
    paddingBottom: 100,
  },
  closeModal: {
    width: '99%',
    marginRight: '1%',
    alignItems: 'flex-end',
  },
  inputContainer: {
    width: '80%',
    height: 70,
  },
  input: {
    borderWidth: 0.5,
    borderColor: 'grey',
    height: '50%',
    width: '95%',
  },
  buttonContainer: {
    alignSelf: 'center',
    borderRadius: 20,
    width: '60%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4551E7',
  },
});
export default styles;

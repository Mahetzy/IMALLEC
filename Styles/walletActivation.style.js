import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 50,
    backgroundColor: '#00162F',
  },
  logo: {
    width: 150,
        height: 85,
        alignSelf: "center",
        resizeMode: "contain",
        marginBottom: 50,
        marginLeft: 235,
  },
  title: {
    fontSize: 46,
    color: '#ffffff',
    fontWeight: '300',
    marginBottom: 40,
    lineHeight: 54,
  },
  buttonTextSelection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#004695',
    borderRadius: 16,
    paddingVertical: 25,
    paddingHorizontal: 25,
    marginBottom: 30,
    borderColor: '#004695',
    borderWidth: 1,
  },
  selected: {
    borderColor: '#ffffff',
    backgroundColor: '#000000',
  },
  icon: {
    marginRight: 15,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
});

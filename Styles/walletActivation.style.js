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
    paddingHorizontal: 20,
    paddingVertical: 25,
    justifyContent: 'center',
    paddingTop: 25,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 40,
    letterSpacing: 1,
    lineHeight: 30,
  },
  boldText: {
    fontWeight: 'bold',
  },
  optionsContainer: {
    width: '100%',
    marginBottom: 30,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1b4b8a',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
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


import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'center',
    backgroundColor: '#013a7a',
    paddingTop: 70,
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
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  cardSubtitle: {
    color: '#d0d0d0',
    fontSize: 12,
  },
  radioOuter: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
  button: {
    backgroundColor: '#e6e6e6',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },
  buttonText: {
    color: '#013a7a',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
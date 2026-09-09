import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020E1C',
  },

  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 120,
    marginBottom: 14,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    paddingTop: 0,
    flexGrow: 1,
    justifyContent: 'flex-start',
  },

  infoCard: {
    backgroundColor: '#0a182c',
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
  },

  infoCardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 18,
  },

  infoCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  infoIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: '#0a182c',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
  },

  bulletList: {
    flex: 1,
  },

  bulletItem: {
    color: '#D6DEE6',
    fontSize: 13,
    lineHeight: 22,
  },

  actionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  actionIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },

  actionTextContainer: {
    flex: 1,
  },

  actionTitle: {
    color: '#0A1F33',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },

  actionSubtitle: {
    color: '#8A94A0',
    fontSize: 13,
  },

  noteCard: {
    backgroundColor: '#0a182c',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    marginTop: 10,
  },

  noteIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },

  noteTextContainer: {
    flex: 1,
  },

  noteTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  noteText: {
    color: '#B8C4D0',
    fontSize: 12,
    lineHeight: 18,
  },
});
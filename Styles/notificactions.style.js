import { StyleSheet } from 'react-native'; 

export const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#020E1C', 
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: "center",
  },
  card: {
    width: "100%",
    backgroundColor: '#ffffff',
    borderRadius: 24, 
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  headerRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 15,
    paddingRight: 5,
  },
  logoText: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: '#ffffff',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000000',
    marginTop: 10,
    marginBottom: 15,
  },
  mainCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: "6%",
    paddingHorizontal: 18,
    borderRadius: 14,
    marginBottom: 20,
    backgroundColor: '#0a192f',
  }, 
  mainCardText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
    maxWidth: '70%'
  },
  optionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: "5%",
    paddingHorizontal: 18,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#0f4c81',
    
  },
  optionText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '500',
    maxWidth: '70%'
  },
  logo: {
    width: 120, 
    height: 120,
    resizeMode: "contain",
    marginBottom: 150,
    marginTop: 50, 
    marginLeft: "70%", 
  },
});
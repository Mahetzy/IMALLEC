import { StyleSheet } from "react-native";
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D7D7",
  },
 
  menu: {
    width: "78%",
    height: "100%",
    backgroundColor: "#FFFFFF",
    paddingTop: 40,
    paddingHorizontal: 25,
  },
 
  cerrar: {
    fontSize: 45,
    color: "#06264A",
    marginBottom: 45,
  },
 
  boton: {
    height: 78,
    backgroundColor: "#06264A",
    borderRadius: 18,
    marginBottom: 28,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
 
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
 
  icono: {
    width: 45,
    fontSize: 30,
    color: "#FFFFFF",
    textAlign: "center",
    marginRight: 15,
  },
 
  texto: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "500",
  },
});
 
export default styles;
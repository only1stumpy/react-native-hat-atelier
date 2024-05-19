import {StyleSheet} from'react-native';

const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#363636',
        alignItems:'center',
        justifyContent:'center'
    },
    containerr:{
      flex:1,
      backgroundColor:'#363636',
    },
    mainText:{
        fontSize:30,
        color:'#fff',
        marginBottom:30,
        textAlign:'center'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: 'white',
        marginBottom: 10,
        width:"75%"
      },
      textButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
      },
      tableContainer:{
        backgroundColor:'#363636',
      },
      table:{
        flexDirection: "row",
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: "silver",
        color:"white",
        width:"100%",
        alignItems:'center'
        
      },
      containerInputs:{
        alignItems: 'center',
        marginTop:10,
        backgroundColor:'white',
        padding:10
      },
      textInputs:{
        width:"100%",
        height:40,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
      },
      textArrayEmpty:{
        fontSize:30,
        color:'#fff',
        marginBottom:30,
        textAlign:'center',
        
        alignItems:'center',
        justifyContent:'center'
      }

})

export default style;
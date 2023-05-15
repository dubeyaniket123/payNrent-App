
import { Text,Dimensions,View,TouchableOpacity} from "react-native"
import LinearGradient from "react-native-linear-gradient"
const {width,height}=Dimensions.get('window')
export default function AppButton({btnWidth,buttonText,bgColor,...props}){
  return(
  
         <TouchableOpacity {...props} >
        <View >
          <LinearGradient style={{ width:width*(btnWidth?btnWidth:0.8),
    backgroundColor:bgColor?bgColor:'#3498db',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#f2f2f2',
    padding: 10, 
    display: 'flex', 
    alignItems: 'center',
     elevation:10    
          }} colors={['#00ff7f', '#32cd32', '#008000']} >
          <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
            {buttonText}
          </Text>
          </LinearGradient>
        </View>
      </TouchableOpacity>
  )

}
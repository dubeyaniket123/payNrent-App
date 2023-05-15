import { useEffect,useState } from "react"
import {Image,Text,Dimensions,StatusBar,View,FlatList,StyleSheet,SafeAreaView,TouchableOpacity} from "react-native"
import AppButton from "../uicomponent/appButton";
import { getData,ServerURL } from "../../services/FetchNodeServices"
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const {width,height}=Dimensions.get('window')

export default function ListCars({navigation,props}){
 
  const [cars,setListCars]=useState([])
  var dispatch=useDispatch()
  var bookingDetails=useSelector(state=>state.Booking)
  const fetchCarList=async()=>{
   var result=await getData('user/display_all_vehicle')
   setListCars(result.data)
  
  }
 useEffect(function(){
  fetchCarList()
 },[])

 const RenderItem=({item})=>{
  
  const handleVehicle=(selectedItem)=>{
    dispatch({type:"ADD_VEHICLE",payload:[selectedItem.vehicleid,selectedItem]})
    navigation.navigate('BookingSummary')
  }
  return(
    
    <View style={{display:'flex',flexDirection:'column',backgroundColor:'#d3d3d3'}}>
<View style={{flexDirection:"row",width:'95%',backgroundColor:"white",borderRadius:20,padding:10,margin:10,marginTop:10,elevation: 10, backgroundColor: 'white',  }}>

      <View style={{width:'50%',flexDirection:"column",marginLeft:5,marginTop:0}}>
  
       <Text style={{fontFamily:"poppins",fontSize:15,fontWeight:"bold",marginLeft:1,}}>{item.companyname}</Text>
          <Text style={{fontFamily:"poppins",fontSize:20,fontWeight:"bold",color:'#000000'}}>{item.modelname}</Text>
      <View style={{width:'100%',flexDirection:'row',marginTop:5,gap:2}}>
    
      <Image source={require('../assets/petrol.png')} style={{
            resizeMode: 'contain',
           height:13,
           width:13,
           alignItems:"baseline"
            
          }}/>
      <Text style={{fontFamily:"poppins",fontSize:13,fontWeight:"bold",marginRight:10}}>{item.fueltype}</Text>
      <Image source={require('../assets/manual.png')} style={{
            resizeMode: 'contain',
           height:13,
           width:13
            
          }}/>
      <Text style={{fontFamily:"poppins",fontSize:13,fontWeight:'bold',marginRight:10}}>Manual</Text>
      <Image source={require('../assets/seat.png')} style={{
            resizeMode: 'contain',
           height:13,
           width:13
            
          }}/>
      <Text style={{fontFamily:"poppins",fontSize:13,fontWeight:'bold',marginRight:15,}}>{item.capacity}</Text>
      </View>
      <View style={{flexDirection:'column',marginTop:10}}>
    
      <Text style={{fontFamily:"poppins",fontSize:30,fontWeight:'bold',color:'#000000'}}>&#8377; {item.rentperhour*(bookingDetails.days*(24+parseInt(bookingDetails.hours))) }</Text>
      <Text style={{fontFamily:"poppins",fontSize:13,fontWeight:'700',}}>Prices excludes fuel cost</Text>
      
      </View>
      
      </View>
      <View style={{flexDirection:'column',width:'50%',height:140}}>  
      <View style={{width:"100%",}}>
      <Image source={{uri:`${ServerURL}/images/${item.icon}`}} style={{
            resizeMode: 'contain',
            height:86 ,
            width: '100%',
             
          }}/>
      </View>
       
       <View>
       <TouchableOpacity onPress={()=>handleVehicle(item)} >
        <View >
  <LinearGradient style={{ width:100,
    
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#f2f2f2',
    padding: 10,
    marginTop: 5,
    display: 'flex', 
    alignItems: "center",
    marginLeft: 50,
  }} colors={['#00ff7f', '#32cd32', '#008000']} >
          <Text style={{color: '#fff', fontSize: 17, fontWeight: 'bold'}}>
            Book  &gt;
          </Text>
          </LinearGradient>
        </View>
      </TouchableOpacity>
       </View>
          
      </View>
    
</View>
 
</View>
  )
 }
    return (
      
        <SafeAreaView style={styles.container}>
        <FlatList
          data={cars}
          renderItem={({item}) => <RenderItem item={item} />}
          keyExtractor={item => item.vehicleid}
        />
      </SafeAreaView>
    

    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor:'#f2f2f2'
  },
  itemStyle:{
      padding:8,
      margin:5,
      width:width*0.9,
      backgroundColor:'#fff'

  }
   });
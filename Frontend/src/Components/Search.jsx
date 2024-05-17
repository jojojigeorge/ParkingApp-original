
import { useEffect, useState } from 'react'
import axios from 'axios'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import moment from 'moment' 

var allvehicle=[
  {
      "_id": "65fbe974d75de280f1620a40",
      "vehicle_no": "swift",
      "paid_for": 1,
      "user": "65f8861163560656e9b7a6dd",
      "phone": "",
      "address": "",
      "owner": "",
      "expirydate": "2024-03-21T08:01:56.042Z",
      "id": "4927ba30-e759-11ee-a6a9-cbaa6238e67b",
      "createdAt": "2024-03-21T08:01:56.061Z",
      "updatedAt": "2024-03-21T08:01:56.061Z",
      "__v": 0
  },
  {
      "_id": "65fbe988d75de280f1620a44",
      "vehicle_no": "swift 4",
      "paid_for": 1,
      "user": "65f8861163560656e9b7a6dd",
      "phone": "",
      "address": "8",
      "owner": "",
      "expirydate": "2024-03-21T08:02:16.912Z",
      "id": "55970410-e759-11ee-a6a9-cbaa6238e67b",
      "createdAt": "2024-03-21T08:02:16.914Z",
      "updatedAt": "2024-03-21T08:02:16.914Z",
      "__v": 0
  },
  {
      "_id": "65fbe99ed75de280f1620a48",
      "vehicle_no": "xuv700 ls",
      "paid_for": 1,
      "user": "65f8861163560656e9b7a6dd",
      "phone": "",
      "address": "",
      "owner": "",
      "expirydate": "2024-03-21T08:02:38.399Z",
      "id": "6265ac00-e759-11ee-a6a9-cbaa6238e67b",
      "createdAt": "2024-03-21T08:02:38.401Z",
      "updatedAt": "2024-03-21T08:02:38.401Z",
      "__v": 0
  }
]  
function Search() {
  
// const [data,setData]=useState([{id:'',owner:'',phone:'',address:'',vehicle_no:''}]) 
  const getData=async()=>{  
    try {   
      const {data}=await axios.get('/api/v1/vehicle/view-all')
      // setData(data.allvehicle)
       allvehicle=[...data.allvehicle]
      console.log('allvehicle',allvehicle)
    } catch (error) {
      console.log('error in get all vehicle details in datatable')

    }   
  }
  useEffect(()=>{
    getData() 
    // console.log("data",data)
    console.log('first')
  },[])


  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  } 

  const handleOnSelect = (item) => {  
    // the item selected
    // console.log('handleonselect',item)
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const formatResult = (item) => {
    return ( 
      <div >
        <span style={{ display: 'block', textAlign: 'left' }}>vehicle: {item.vehicle_no}</span>
        <span style={{ display: 'block', textAlign: 'left' }}>vaid upto: {moment(item.expirydate).fromNow()}</span>
      </div>
    )       
  } 

  return (  
    <div className="App">   
      <header className="App-header">   
        <div style={{ width: 300}}>
          {console.log('adk',allvehicle)}
          <ReactSearchAutocomplete
            placeholder='Search Vehicle'  
            items={allvehicle}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            // onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
            fuseOptions={{ keys: ["vehicle_no"] }}
          />
        </div>  
      </header>
    </div>  
  )
}

export default Search
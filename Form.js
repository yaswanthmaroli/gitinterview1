import React, { useState } from 'react'
import {Table} from 'reactstrap'

function Form() {


  const [error,seterror]= useState({})

  const[input,setinput]= useState({
    id:"",
    name:"",
    salary:"",
    date:"",
    gender:"",
    email:""

  })

  const[editclick,seteditclick]= useState(false)

  const [table,settable]= useState([])
  const [editindex,seteditindex]= useState("")

  const handlechange=(e)=>{

    setinput({
      ...input,[e.target.name]:e.target.value
    })

  }

  const handledelete = (index)=>{

    const filtereddata = table.filter((item,i)=>i!== index )
    settable(filtereddata)

  }

  


  const validateform = ()=>{
    
    let err ={}

    if(input.name == ""){
      err.name = "name required"
    }
 
     if(input.id == ""){
      err.id = "id required"
    }

    if(input.email ==''){
      err.email = "email required"
    }else{
      let regex =  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
      if(!regex.test(input.email)){
        err.email = "invalid email"
      }
    }

     if(input.gender == ""){
      err.gender = "gender required"
    }

     if(input.date ==""){
      err.date = "date is required"
    }

     if(input.salary ==""){
      err.salary ="salary is required"
    }





    seterror({...err})

    return  Object.keys(err).length <1
  }
  
  const handleedit = (index)=>{
    const tempdata = table[index]

    setinput(tempdata)
    seteditclick(true)
    seteditindex(index)
      
  }   


  const handlesubmit = (e)=>{
    e.preventDefault()

   if(editclick){
     
    const temptabledata = table
    Object.assign(temptabledata[editindex],input)
    settable([...temptabledata])
    seteditclick(false)
   }else{
    
    settable([...table,input])
   }

   let isvalid= validateform()
   
    
  }

  
  

  return (
    <div>
       <form onSubmit={handlesubmit} >
        <div className='form'>
          <label for="id">ID</label>
         <input name="id" value={input.id} type="text"  id="id" onChange={handlechange} />
         <div>{error.id}</div>
        </div>
        <div className='form'>
          <label for="name">NAME</label>
         <input name="name" value={input.name} type="text"  id="name" onChange={handlechange} />
         <div>{error.name}</div>
        </div>
        <div className='form'>
          <label for="salary">SALARY</label>
         <input name="salary" value={input.salary} type="text"  id="salary" onChange={handlechange} />
         <div>{error.salary}</div>
        </div>
        <div className='form'>
          <label for="date">DATE</label>
         <input name="date" value={input.date} type="date"  id="date" onChange={handlechange} />
         <div>{error.date}</div>
        </div>
        <div className='form'>
          <label for="email">Email</label>
         <input name="email" value={input.email} type="text"  id="email" onChange={handlechange} />
         <div>{error.email}</div>
        </div>

        <div className='form'>
          <label for="male">Male</label>
          <input name="gender" value="male" type="radio"   id="male" onChange={handlechange} />
          <label for="female">female</label>
          <input name="gender" value="female" type="radio"   id="female" onChange={handlechange} />
          <div>{error.gender}</div>
        </div>
        <button type="submit">{editclick?"update":"add"}</button>
       </form>

           <div className="form-display">
           <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
         {
          table.map((item,i)=>(
            <tr>
            <th scope="row">{item.id}</th>
            <td>{item.name}</td>
            <td>{item.salary}</td>
            <td>{item.date}</td>
            <td>{item.gender}</td>
            <button onClick={()=>handleedit(i)}>edit</button>
            <button onClick={()=>handledelete(i)}>delete</button>
          </tr>
          ))
         }
           
        </tbody>
      </Table>
           </div>
    </div>
  )
}

export default Form
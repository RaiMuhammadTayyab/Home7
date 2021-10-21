import React  from "react"
import {useQuery,useMutation} from '@apollo/client';
import gql from 'graphql-tag'
console.log('Enter')
const Person_name= gql`
{
allPerson{
  id
  name
  title
  Link
}

}`
const Add_person=gql`
mutation addperson ($title:String!, $name:String!){
addperson(title:$title, name:$name){
name
title
id
Link
}

}
`
const Home= ()=>{
let inputtitle
let inputname
const[addperson]=useMutation(Add_person)
const submithandle= async()=>{
  addperson({
    variables:{
     title:inputtitle.value,
     name:inputname.value
    },
   refetchQueries:[{query:Person_name}],

    })    
inputtitle.value= ""
inputname.value= ""
  }
const {loading,error,data}=useQuery(Person_name)
if (loading)
return <h1> Loading...</h1> 
if (error) 
return <h1>error..</h1>
console.log(data)

  return (
    <div>
  <h1> Wellcome to my Home page</h1>
  
  
<h1>Personal Data base</h1>

<h2>Enter the title</h2>
<input type='text' placeholder="title" ref={node=>{inputtitle=node}}/>
<br/>
<h2> Enter the name</h2>
<input type="text" placeholder="name" ref={node=>{inputname=node}}/>
<br/>
<br/>
<button onClick={submithandle}> Enter please</button>
<br/>
<br/>

      <table border="2">
  <thead>
    <tr>
<th>Name</th>
<th>TITLE</th>
<th>LINKS</th>
</tr>
  </thead>
  
  <tbody>
    
  {data.allPerson.map(d=>{
   return <tr key={d.id}>
  <td>{d.name} </td>
  <td>{d.title}</td>
  <td>{d.Link} </td>
</tr>
  })}

  </tbody>  
    
    </table>                                                                                                                                                                                                                                                                                                                                                       

</div>
  
  )
} 
export default Home 


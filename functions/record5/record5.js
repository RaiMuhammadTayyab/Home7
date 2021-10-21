const { ApolloServer, gql } = require('apollo-server-lambda')
const shortid = require('shortid')
const faunadb=require('faunadb')
    q=faunadb.query
     var adminClient=new faunadb.Client({secret:'fnAERNN6VmACQrN3xcoHwWuQfBeG2cTe5RBLWpOu'})   
const typeDefs = gql`
  type Query {
    allPerson: [record!]
   
  }
  type Mutation {
    addperson(
      name:String
      title:String
    ):record
  }


  type record {
    id: ID!
    name: String!
    title: String!
    Link:String!
  }




`
const resolvers = {
  Query: {
    allPerson: async () =>{ 
      try {
     const result= await adminClient.query(q.Map(
      q.Paginate(
        q.Match(
          q.Index('links'))),
      q.Lambda(x =>q.Get(x))
      )
      )
       return result.data.map(d=>{
         return {
          title:d.data.title,
          name:d.data.name,
          id:d.ts,
          Link:d.data.Link
    
          }})
          }
          catch(err) {
            console.log(err)
          }
  }
},
Mutation: {
  addperson: async (_,{name,title})=>{
    
    try{
const result= await adminClient.query(
  q.Create(
    q.Collection('link'),
    {
     data:{
       name,
       title,
      Link: shortid.generate()
     }  
    },
  )
)
return result.data.data 
    }
    catch(error){
      console.log(error)
    }
  }
  }
  }

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }

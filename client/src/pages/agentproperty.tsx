// import { useGetIdentity , useOne } from "@pankod/refine-core"
import { useOne , useGetIdentity } from "@pankod/refine-core"
import {useParams} from '@pankod/refine-react-router-v6'
import  {Profile}  from "components"
const AgentProfile = () => {
  const { id} = useParams()
  const {data ,isLoading , isError} = useOne({resource :'api/v1/users',id : id as string,
  })

  
  const MyProfile = data?.data ?? []

  console.log(data)
  if(isLoading) return <div>Loading..</div>
  if(isError ) return <div>Something was wrong</div>

  return (
 
    <Profile type = "Agents"
    name = {MyProfile.name}
    email = {MyProfile.email}
    avatar = {MyProfile.avatar}
    properties = {MyProfile.allProperties}
     />
    

    
  )
} 

export default AgentProfile







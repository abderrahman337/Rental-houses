
// import { Typography , Box , Stack  } from "@pankod/refine-mui"
// import { useDelete , useGetIdentity  , useShow} from "@pankod/refine-core"
// import { useParams , useNavigate } from "@pankod/refine-react-router-v6"
// import { ChatBubble , Delete,Edit , Phone ,Place , Star  } from "@mui/icons-material"
// import { CusttomButton } from "components"
// import { useOne } from "@pankod/refine-core"

// function checkImage (url : any){
//   const img = new Image()
//   img.src = url 
//   return img.width !==0 && img.height !==0
// }

// const Properties = () => {

//   const navigate = useNavigate()
//   const {data : users} = useGetIdentity()
//   const {queryResult} = useShow();
//   const {id} = useParams()
//   const {mutate} = useDelete()
//   // useOne({resource : '/properties',id : id as string})
//   const {data , isLoading , isError} = queryResult
//   const PropertyD = data?.data ?? []
//    console.log(data)
//   if(isLoading) return <div>isLoading...</div>
//   if(isError) return <div>Something went wrong</div>

//  const isCurrentUser = users.email === PropertyD.creator.email;

//  const handleDeleteProperty  = () =>{
//   const response = window.confirm('Are you sure you want to delete this property?')
//   if(response){
//     mutate ({
//       resource : 'properties',
//       id: id as string
//     }, {
//       onSuccess : () =>{
//         navigate('/properties')
//       }
//     }
//     )
//   }
//  }
//   return (
//     <Box borderRadius="15px"
//     padding = "20px"
//     bgcolor="#fcfcfc"
//     width = "fit-content"
//     >
//          <Typography fontSize={25} fontWeight = {700}
//          color = "#11142d">Details

//          </Typography>
//          <Box flex={1} maxWidth = {764}>
//           <img src={PropertyD.photo}
//                alt = {PropertyD.title}
//                height = {546}
//                style = {{objectFit: "cover" ,borderRadius: "10px"}}
//                className = "property-details-image"/>
//          </Box>

//          <Box mt = '15px' >
//           <Stack direction="row" justifyContent="space-between" flexWrap="wrap" alignItems="center">
//             <Typography fontSize={18} fontWeight = {500} color = "#11142d" textTransform="capitalize">
//               {PropertyD.propertyType}
//             </Typography>
//             <Box>
//               {[1,2,3,4,,5].map((star)=> <Star key = {`star-${star}`} sx ={{color : '#f2c94c'}} />)}

//             </Box>

//           </Stack>
//           <Stack direction="row" justifyContent="space-between" flexWrap="wrap" alignItems="center">
//             <Typography fontSize={18} fontWeight = {500} color = "#11142d" textTransform="capitalize">
//               {PropertyD.title}
//             </Typography>
//             <Stack mt ={0.5} direction = "row" alignItems="center" gap = {1}>
//               <Place sx = {{color :'#808191'}}/>
//               <Typography >{PropertyD.location}</Typography>
//            </Stack>

//           </Stack>

//          </Box>
//          <Box>
//             <Typography fontSize={16} fontWeight ={600} mt ="10px" color ="#111420">
//                  Price
//             </Typography>
//             <Stack direction="row" alignItems="flex-end" gap = {1}>
//               <Typography fontSize={25} fontWeight = {700} color = "#475BE8">
//                     ${PropertyD.price}
//               </Typography>
//               <Typography fontSize={14} color = "#808191" mb = {0.5}>
//                   for one day
//               </Typography>
//             </Stack>

//          </Box>
           
//            <Stack mt = "25px" direction="column" gap = "10px">
//             <Typography fontSize={18} color = "#11142D">
//               Description
//             </Typography>
//             <Typography fontSize={14} color = "#808191">
//               {PropertyD.description}
//             </Typography>
//            </Stack>

//           <Box width = "100px" flex = {1} maxWidth = {326} display = "flex"flexDirection="column"
//              gap = "20px">
//               <Stack mt={2} justifyContent = "centre" alignItems="centre" >
//                      <img src={checkImage(PropertyD.creator.email)? PropertyD.creator.email
//                        : ""} alt = "avatar" width = {90} height = {90}
//                        style = {{borderRadius : "100%" , objectFit : "cover"}}/>

//                       <Box mt = "15px" >
//                         <Typography fontSize={ 18} fontWeight = {600} color = "#111420">
//                             {PropertyD.creator.name}
//                         </Typography>
//                         <Typography mt = "5px"
//                         fontSize={14} fontWeight = {400} color = "#8-8191">
//                           Agent
//                         </Typography>
//                       </Box> 
//                       <Stack mt = "15px" direction="row" alignItems="centre"
//                       gap = {1}>
//                           <Place sx = {{color:"#808191"}}/>
//                           <Typography fontSize={14}
//                           fontWeight = {400}
//                           color = "#808191">
//                               North Carolina
//                           </Typography>
//                       </Stack>
//                       <Typography mt ={1} fontSize={16} fontWeight = {600}
//                       color = "#11142D">
//                         {PropertyD.creator.allProperties.length}{""}
//                         Properties

//                        </Typography>
//               </Stack>

//               <Stack width="100%"
//               mt = "25px" direction="row" flexWrap="wrap" gap = {2}>
//                 <CusttomButton title={!isCurrentUser ? "Message" : "Edit"}
//                 backgroundColor = "#475BE8" color = "#FCFCFC" fullWidth 
//                 icon = {
//                   !isCurrentUser ? <ChatBubble/> : <Edit/>
//                 }
//                 handleClick = {()=>{
//                   if(isCurrentUser){
//                     navigate(
//                       `/properties/edit/${PropertyD._id}`
//                     )
//                   }
//                 }}
//                 />
//                 <CusttomButton title= {!isCurrentUser ? "Call " : "Delete"}
//                 backgroundColor = {
//                   !isCurrentUser ? "#2ED480" : "#d42e2e"
//                 }
//                 color = "#fcfcfc" fullWidth icon = {!isCurrentUser ? <Phone/> : <Delete/>}
//                 handleClick = {()=>{
//                   if(isCurrentUser) handleDeleteProperty()
//                 }}
//                 />
//               </Stack>

//               <Stack >
//                 <img src="" width="100%" height={306} style = {{borderRadius : 10 , objectFit : "cover"}}/>
//               </Stack>
//               <Box>
//                  <CusttomButton title="Book Now"
//                    backgroundColor="#475BE8" color="fcfcfc" fullWidth/>
//               </Box>
              
//           </Box>
//     </Box>
//   )
// }

// export default Properties


import React from 'react'

const properties = () => {
  return (
    <div>
      
    </div>
  )
}

export default properties





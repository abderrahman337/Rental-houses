import React from 'react'
import { EmailOutlined , LocationCity ,Phone , Place } from '@mui/icons-material'
import { useGetIdentity } from '@pankod/refine-core'
import {Box ,  Stack , Typography } from '@pankod/refine-mui';
import { Link } from '@pankod/refine-react-router-v6';
import { AgentCardProp , InfoBarProps } from 'interfaces/agent'
const InfoBars = ({icon , name}:InfoBarProps) =>(
  <Stack flex={1} minWidth = {{xs:'100%' , sm : 300}}gap = {1.5} direction = "row">
  {icon}
  <Typography fontSize={14} color = "#808191" >{name}</Typography>
</Stack>
)
  

const AgentCart = ({id , name ,email, avatar , noOfProperties }: AgentCardProp) => {
 const {data : currentUser} = useGetIdentity({
 
 })
 const generateLink = () =>{
  if(currentUser.email === email) return '/MyProfile'
  return `/Agents/show/${id}`
 }

  return (
    <Box component={Link} 
         to = {generateLink()}
         width = "100%"
         sx = {{display :'flex',
                flexDirection : {xs : 'column', sm:'row'},
                gap:'20px',
                padding:'20px',
                '&:hover':{
                  boxShadow:'0 22px 45px 2px rgb(176 , 176 , 176 ,0.1)'
                },
                textDecoration : 'none'
                
                
         }}>
          <img src = {avatar}
               alt = "users"
               width ={90}
               height = {90}
               style = {{borderRadius:8 , objectFit:'cover'}}/>
          <Stack direction="column" justifyContent="space-between"
          flex={1} gap = {{xs :4 ,sm :2}}
          >
            <Stack gap = {2} direction = "row" flexWrap="wrap" alignItems="center">
              <Typography fontSize={22} fontWeight= {500} color = "#11142d">{name}</Typography>
              <Typography fontSize={14} color = "#808191">Real-Estate Agent</Typography> 
            </Stack>
            <Stack direction="row" flexWrap="wrap" justifyContent="space-between"
            alignItems="center" gap = {2}>
                <InfoBars icon = {<EmailOutlined sx = {{color : '#808191'}}/>}
                name = {email } 
                />
                <InfoBars icon = {<Place sx = {{color : '#808191'}}/>}
                name = 'Beni Mellal City' 
                />
                <InfoBars icon = {<LocationCity sx = {{color : '#808191'}}/>}
                  name = {`${noOfProperties} Properties`}
                  />
                  <InfoBars icon = {<Phone sx = {{color : '#808191'}}/>}
                  name = '+212616184570' 
                  />
                 
            
            </Stack>
          </Stack>     
  
        AgentCard
    </Box>
  )
}

export default AgentCart
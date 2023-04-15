import { Place } from '@mui/icons-material'
import {Link } from '@pankod/refine-react-router-v6'
import { Typography, Box , Card , CardMedia, Stack,  CardContent } from '@pankod/refine-mui'

import { PropertyCardProps } from 'interfaces/property'

const PropertyCard = ({id , title , location , price , photo}: PropertyCardProps) => {
  return (
  <Card component={Link}

        to ={`/properties/show/${id}`}
        sx = {{
        maxWidth:'340px',
        padding :'15px',    
        '&:hover ':{
        boxShadow: ' 0 22px 45px 2px rgba(176 , 0,0,0)'
       },
        cursor : 'pointer', 
        textDecoration : 'none'

  }}
     
       elevation ={0}>
      <CardMedia component="img"
                 width ="100%"
                 height={210}
                 image = {photo}
                 alt ="card-image"
                 sx = {{borderRadius : '10px'}}/>

          <CardContent sx = {{display : 'flex' , flexDirection : 'row' , justifyContent : 'space-between',
                       gap : '10px' , paddingX : '5px'}}>
                <Stack direction="column" gap={1}>
                  <Typography fontSize={18} fontWeight= {500} >{title}</Typography>
                  <Stack direction="row" gap = {0.5}
                         alignItems ="flex-start" >
                    <Place sx = {{fontSize : 18 , 
                                  marginTop : 4}}
                       />
                       <Typography fontSize={14} color = "#808191" mt={4}>{location}</Typography>

                  </Stack>
                </Stack>
                <Box>
                     <Typography fontSize={18} fontWeight ={500} color="#475be8">${price}</Typography>
                </Box>
           </CardContent>

     </Card>
     
  )
}

export default PropertyCard











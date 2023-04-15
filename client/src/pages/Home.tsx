
// import { useList } from '@pankod/refine-core/dist/hooks'
import { useList } from '@pankod/refine-core'
import { Typography , Box, Stack } from '@pankod/refine-mui'
import{
      PieCart, 
      PropertyCard, 
      PROPERTYReferrals, 
      TotalRevenue, 
} from 'components'

const HomePage = () => {
    const {data , isLoading , isError} = useList({
      resource : 'properties',
      config :{
        pagination : {
          pageSize : 3
        }
      }
    })

    const LatestProperties = data?.data ?? []

    console.log(data)
    if(isLoading){
      return <h1>is loading ...</h1>
    }
    if(isError){
      return <h1>Error</h1>
    }
  return (
    <Box>
      <Typography fontSize={25} fontWeight = {700} >
        Dashboard Page
      </Typography>
      <Box mt="20px" display = "flex" flexWrap="wrap" gap ={4} >
        <PieCart title = "Properties for sale" value ={684} series = {[90, 25]}  colors ={['#475be8' , '#8efe4e']} />
        <PieCart title = "Properties for Rent" value ={550} series = {[85 , 25]} colors ={['#475be8' , '#8efe4e']} />
        <PieCart title = "Total custmors" value ={450} series = {[75 , 25]} colors ={['#475be8' , '#8efe4e']}  />
        <PieCart title = "Properties of cities" value ={100} series = {[50 , 25]} colors ={['#475be8' , '#8efe4e']} />  
      </Box>
      <Stack mt ='25px' width="100%" gap={4} direction={{xs : 'column' , lg : 'row'}} >
        <TotalRevenue/>
        <PROPERTYReferrals/>
      </Stack>
      <Box flex={1} borderRadius = "15px" padding ="20px" 
          bgcolor="#fcfcfc" flexDirection='column'
          minWidth='100%' mt = '25px' > 
            <Typography fontSize="18px" fontWeight ={600}
            color = '#11142d'>Latest properties</Typography>
            <Box mt = {2.5} sx = {{display : 'flex' , flexWrap : 'wrap',
                 gap  : "5px"}}>
                  {LatestProperties.map((property)=> (
                     <PropertyCard key = {property._id}
                                   id = {property._id}
                                   title = {property.title}
                                   location = {property.location}
                                   price = {property.price}
                                   photo = {property.photo}/>
                  ))}

            </Box>

      </Box>
    </Box>
  )
}

export default HomePage
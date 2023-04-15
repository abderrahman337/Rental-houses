import {Box,  Typography , Stack} from '@pankod/refine-mui'
import { propertyReferralsInfo } from 'constant'

interface ProgressBarProps {
  title: string, 
  percentage : number,
  color : string,
}

const ProgressBar=({ title , percentage , color}: ProgressBarProps)=>(
          <Box width ="90%" >
            <Stack direction="row" alignItems="center" justifyContent="space-between" >
              <Typography fontSize={16} fontWeight = {500} color  = "#1e132d" >
                 {title}
              </Typography>
              <Typography fontSize={16} fontWeight = {500} color = "#1e132d" >
                 {percentage}%
              </Typography>
            </Stack>
            <Box mt = {2} position ="relative" width = "100%" height="9px" borderRadius={1} bgcolor = {color} >
              <Box  bgcolor = {color}
                    width = {`$ {percentage}%`}
                    position = "absolute"
                    height="100%"
                    borderRadius={1}/>
            

           </Box>
          </Box>
)


const PROPERTYReferrals = () => {
  return (
    <Box p = {4}
    flex={1}
    bgcolor="#fcfcfc"
    minWidth={490}
    id = "chart"
    display="flex"
    flexDirection="column"
    borderRadius="15px">
        <Typography fontSize={19} fontWeight = {600} color ="#11124d">
          Property Referrals
        </Typography>
        <Stack my = "20px" direction="column" gap ={4}>
                {propertyReferralsInfo.map((bar) =><ProgressBar key ={bar.title}{...bar}/>)}
        </Stack>
       
    </Box>

  )
}

export default PROPERTYReferrals
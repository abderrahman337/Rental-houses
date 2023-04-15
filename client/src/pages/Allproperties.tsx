import React, { useMemo } from 'react'
import { Add, } from '@mui/icons-material'
import { useTable } from '@pankod/refine-core'
import {Box , Stack , Typography , TextField , Select , MenuItem} from '@pankod/refine-mui'
import { useNavigate} from '@pankod/refine-react-router-v6'
import CusttomButton  from 'components/common/CusttomButton'
import PropertyCard from 'components/common/PropertyCard'

const Allproperties = () => {
     const navigate = useNavigate();

      const {
        tableQueryResult: {data,  isLoading , isError} , 
        current , 
        setCurrent ,
        setPageSize, 
        pageCount , 
        sorter , setSorter, 
        filters , setFilters, 

      } = useTable();

      const AllProperties = data?.data ?? [];
      const currentPrice = sorter.find((item) => item.field === 'price')?.order;
      const Togglesort = (field : string) =>{
        setSorter([{field , order: currentPrice === 'asc'? 'desc' : 'asc'}])
                  }
  
   const currentFilterValue = useMemo(()=>{
    const LogicalFilter = filters.flatMap((item)=>
    ('field' in item ? item : []))
    return {
            title : LogicalFilter.find((item)=> item.field ==='title')?.value || '',
            propertyType : LogicalFilter.find((item )=>item.field === 'propertyType')?.value || ''
    }
   } , [filters])

   if(isLoading) return <Typography >Loading...</Typography>
   if(isError) return <Typography>Error..</Typography>

  return (
    <Box>
       <Typography fontSize={25} fontWeight={700}>All Properties</Typography>

      <Box gap ={3} display = 'flex' flexWrap="wrap"
      mb = {{xs:'10px', sm : 0}} alignItems = "center" mt={5}>
        {/* */}
        <CusttomButton title={`Sort by Price  ${currentPrice === 'asc'? '↑':'↓' }` }
        color='#fcfcfc'
        handleClick={()=>Togglesort('price')}
        backgroundColor='#475be8'/>
        <TextField 
        placeholder='search on here'
        variant='outlined'
         value= {currentFilterValue.title}
        onChange= {(e)=>{
          setFilters([
            {
              field : 'title',
              operator : 'contains' , 
              value : e.currentTarget.value ? e.currentTarget.value : undefined
            }
          ])
        }}/>

        <Select variant="outlined"
        required
        value='All'
        color='info'
        inputProps={{'aria-label' :' label'}}
        displayEmpty
        defaultValue=''
        onChange={(e)=>{
          setFilters([
            {
              field : 'propertyType', 
              operator : 'eq',
              value : e.target.value 


            }
          ] , 'replace')
         }}
        >
           <MenuItem value = "">All</MenuItem>
          {['Apartement' , 'Villa', 'Farmhouse', 'Condos', 'Townhouse', 'Duplex',
             'Studio' , 'Chalet'].map((type)=>(
              <MenuItem key={type} value = {type.toLowerCase()}>{type}</MenuItem>
             ))}
        </Select>
         
        <Stack direction="row" justifyContent="space-between" alignItems="center">
            <CusttomButton title = "Add Property" handleClick={() =>navigate('/properties/create')}
                    backgroundColor = "#475be8" color = "#fcfcfc"
                    icon = {<Add/>}/>
        </Stack> 
      </Box> 
      {/* mt = "20px" sx = {{display : 'flex',flexWrap :'wrap', gap:3 }} */}
      <Box  mt = "15px" sx = {{display : 'flex',flexWrap :'wrap', gap:3 }} >
          {AllProperties.map((Property) => (
               <PropertyCard
               key ={Property._id}
               id = {Property._id}
               title = {Property.title}
               price = {Property.price}
               location = {Property.location}
               photo = {Property.photo}
               />     
               )         
          )}
        <Box>
        {AllProperties.length> 0  && (
        <Box display="flex" flexWrap = "wrap" gap = {2} mt = {5}>
          <CusttomButton title = 'Previous'
              backgroundColor='#475be8'
              color = '#fcfcfc'
              handleClick={() => setCurrent((prev) => prev -1 ) }
              disabled = {!(current > 1)}
               />
            <Box display={{xs : 'hidden' , sm : 'flex'}}
            alignItems = "center" gap = {5} >
              Page {''} <strong>{current} of {pageCount}</strong>
          </Box>
            <CusttomButton title = 'Next'
              backgroundColor='#475be8'
              color = '#fcfcfc'
              handleClick={() => setCurrent((prev) => prev + 1 ) }
              disabled = {(current=== pageCount)}
            
               />  
               <Select variant='outlined'
               displayEmpty
               required
               onChange={(e) =>setPageSize(e.target.value ? Number(e.target.value) : 10)}
                
               defaultValue = ''
               color='info'
               value='10'
               inputProps={{'aria-label' : 'with-label' }}>
                  {[10 , 20 , 30 , 40 , 50 ].map((size) =>(
                       <MenuItem key={size}  value ={size}> show {size}</MenuItem>
                  ))}
                 
                </Select>
        </Box>
       )} 

        </Box>
         
                        
       </Box>
    </Box> 
  )
}

export default Allproperties


















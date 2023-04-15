import { useState } from 'react'
import { useGetIdentity } from '@pankod/refine-core'
import { FieldValues } from '@pankod/refine-react-hook-form'
import { useForm } from '@pankod/refine-react-hook-form'
import  Format  from '../components/common/Format'

const EditProperty = () => {

  const {data : user} = useGetIdentity({
  })
  const [propertyIMAGE, SETpropertyImage] = useState({name : "" , url:""})
  const {
    refineCore :{onFinish , formLoading},
    register ,
    handleSubmit
  } = useForm()

  const handleImageChange = (file:File) => {
    const reader = (readFile: File) =>
    new Promise<string>((resolve , reject) =>{
      const fileReader = new FileReader()
      fileReader.onload = () =>resolve(fileReader.result as string)
      fileReader.readAsDataURL(readFile)
    })
    reader(file).then((result: string) => SETpropertyImage({name : file?.name , url : result}),
    )
  } 
  const onFinishHandler = async(data : FieldValues) =>{
    if(!propertyIMAGE.name) return alert ("please upload a property image")

    await onFinish({
      ...data , 
      photo : propertyIMAGE.url,
      email : user.email
    })
  }
  return (
    <Format type='Edit'
    register = {register}
    onFinish = {onFinish}
    formLoading ={formLoading}
    handleSubmit = {handleSubmit}
    handleImageChange = {handleImageChange}
    onFinishHandler = {onFinishHandler}
    propertyImage ={propertyIMAGE}/>
   
  )
}

export default EditProperty



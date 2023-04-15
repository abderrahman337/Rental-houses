import mongoose from 'mongoose'
import Property from '../mongodb/models/property.js'
import User from '../mongodb/models/user.js'

import * as dotenv from 'dotenv'

import {v2 as cloudinary } from 'cloudinary'
dotenv.config()

cloudinary.config({
      cloud_name : process.env.CLOUDINARY_CLOUD_KEY,
      api_key: process.env.CLOUD_API_KEY,
      api_secret : process.env.SECRET_KEY
}
)

const getAllProperties = async (req , res) =>{
      const { _end , _order , _start , _sort , title_like = "", propertyType  = ""} = req.query

      const query  = {}
      if(propertyType !== ''){
            query.propertyType = propertyType
      }
      if(title_like){
            query.title = {$regex : title_like , $options : 'i'}
            
      }
      try{
            const count =  await Property.countDocuments({query})
            const properties = await Property.find(query)
            .limit(_end)
            .skip(_start)
            .sort({[_sort]: _order})
            res.header('x-total-count' , count)
            res.header('Access-Control-Expose-Headers' , 'x-total-count')

            res.status(200).json(properties)

      }catch(error){
            res.status(500).json({message  : error.message})
      }
      
}
const getPropertyDetails = async (req , res) =>{
      const {id} = req.params
      const propertiesExits = await Property.findOne({_id: id}).populate('creator')

      if(propertiesExits)
      {res.status(200).json(propertiesExits)}else{
            res.status(404).json({message : 'Property not Found'})
      }
}

const createProperty = async (req , res) =>{

      try{
            const {title , description ,propertyType , location ,locationMap, price , photo , email } = req.body
            
            //start a session
            const session = await mongoose.startSession();
            session.startTransaction();

            const user = await User.findOne({email})
            if(!user) throw new Error('user not found')

            const PHOTOURL = await cloudinary.uploader.upload(photo)
            
           
            // const proExists = await Property.findOne({title})

           // if(proExists) return res.status(200).json(proExists)
      const newProp = await Property.create({
            title, 
            description,
            propertyType,
            location,
            locationMap,
            price,
            photo : PHOTOURL.url,
            email: user._id
      })
      user.allProperties.push(newProp._id)
      await user.save({session})
      await session.commitTransaction();

      res.status(200).json({message : 'Property created successfully'})

      }catch(error){
                res.status(500).json({message: error.message})
      }
}


const updateProperty = async (req , res) =>{
      try{
            const {id} = req.params
            const {title , description , propertyType , location ,locationMap, price, photo} =req.body

            const PHOTOURL = await cloudinary.uploader.upload(photo)

            await Property.findByIdAndUpdate({_id : id}, {
                  title,
                  description,
                  propertyType,
                  location,
                  locationMap,
                  price,
                  photo: PHOTOURL.url || photo
            })
            res.status(200).json({message : 'property updated successfully'})
      }catch(error){
            res.status(500).json({message: error.message})
      }
}

const deleteProperty = async (req , res) =>{
      try{
            const {id} = req.params

            const propertyToDelete = await Property.findById({
            _id : id }).populate('creator',)

            if(!propertyToDelete) throw new Error('property not found')

            const session = await mongoose.startSession()
            session.startTransaction()

            propertyToDelete.remove({session})
            propertyToDelete.creator.allProperties.pull(propertyToDelete)

            await propertyToDelete.creator.save({session})
            await session.commitTransaction()

            res.status(200).json({message : 'Property deleted successfully '})
            

      }catch(error){
             res.status(500).json({message : error.message})
      }
}

export{
      getAllProperties, 
      getPropertyDetails,
      createProperty,
      updateProperty,
      deleteProperty,
}
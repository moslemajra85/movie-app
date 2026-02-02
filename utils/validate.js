import Joi from "joi"
 

const movieSchema = Joi.object({

   title: Joi.string().min(3).max(30).required(),
   price: Joi.number().min(10).max(100).required(),
   description: Joi.string().min(10).max(512).required(),
   genre: Joi.string().required(),


})


 
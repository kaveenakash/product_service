const Product = require('../models/Product')
const Admin = require('../models/Admin')

const getProducts = (req,res) =>{
    Product.find({},(err,data) =>{
        if(err){
            return res.status(400).json({
                error:`Error Occured ${err}`
            })
        }
        return res.status(200).json({
            data
        })
    });
    
}
const getProductsBySeller = (req,res) =>{
    const {sellerEmail} = req.body
    Product.find({sellerEmail},(err,data) =>{

        if(err){
            return res.status(400).json({
                error:`Error Occured ${err}`
            })
        }

        return res.status(200).json({
            data:data
        })
    })

}
const addProducts = (req,res)=>{
    const{id,sellerEmail,product,price} = req.body;
    let newProduct = new Product({id,sellerEmail,product,price})
    newProduct.save((err,data) =>{
        if(err){
            return res.status(400).json({
                error:`Error occured ${err}`
            })
        }
        return res.status(200).json({
            data:data
        })
    })
}

const deleteProducts = (req,res) =>{

    const {id,sellerEmail} = req.body
   
    Product.deleteOne({id:id,sellerEmail:sellerEmail},(err,data) =>{
        if(err){
            return res.status(402).json({
                err:err
            })
        }

        return res.status(200).json({
            data:data
        })
    })

   
}
const updateProducts = (req,res) =>{

    const{id,sellerEmail,product,price} = req.body;
     console.log(id)

     Product.findOne({id:id}).then(item =>{
         item.product = product;
         item.price = price
        return item.save();
     })
     .then(result =>{
         return res.status(200).json({
             message:"Success"
         })
     })
     .catch(err =>{
         return res.status(405).json({
             message:'Fail'
         })
     })
   


}

const adminLogin = (req,res) =>{
    const {adminEmail,adminPassword} = req.body
   
    const data={
        adminEmail,
        adminPassword
    }
    Admin.findOne(data,(err,user) =>{
        if(err){
          return  res.status(400).json({
                login_status:false,
                message:err
            })
        }
        if(!user){
           return res.status(400).json({
                login_status:false,
                message:`User not found`
            })
        }
       return res.json({
            login_status:true,
            message:`Success`
        }) 
    })
}

const registerAdmin = (req,res) =>{
    const{email,name,password} = req.body
    let newAdmin = new Admin({
        adminEmail:email,
        adminName:name,
        adminPassword:password
    })
    newAdmin.save((err,data) =>{
        if(err){
           return res.status(400).json({
                error:`Error Occured ${err}`
            })
        }
     return  res.status(200).json({
            data:data
        })
    })
}
module.exports = {
    getProducts,
    addProducts,
    adminLogin,
    registerAdmin,
    deleteProducts,
    getProductsBySeller,
    updateProducts
}
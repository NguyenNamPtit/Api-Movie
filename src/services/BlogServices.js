const Blog = require('../models/BlogModel')

const createBlog = (newBlog) =>{
    return new Promise (async(resolve, reject) =>{
        const {title, image,date, description} = newBlog
        const cleanedTitle = title.trim();
        try{
            const checkBlog = await Blog.findOne({
                title: title
            })
            if(checkBlog !== null){
                resolve({
                    status: 'OK',
                    message: 'The title of blog is already'
                })               
            }else{
                const createBlog = await Blog.create({
                    title : cleanedTitle,
                    image,
                    date,
                    description 
                })
                if(createBlog){
                    resolve({
                        status:'OK',
                        message:'SUCCESS',
                        data: createBlog
                    })
                } 
            }
             
            
        }
        catch(e){
            reject(e)
        }
    })
}

const updateBlog = (id, data) =>{
    return new Promise (async(resolve, reject) =>{
        
        try{
            const checkBlog = await Blog.findOne({
                _id: id
            })
            
            if(checkBlog === null){
                resolve({
                    status: 'OK',
                    message: 'The blog is not defined'
                })
            }
            
            const updateBlog = await Blog.findByIdAndUpdate(id, data, { new: true})
            resolve({
                status:'OK',
                message:'SUCCESS',
                data: updateBlog
            }) 
            
        }
        catch(e){
            reject(e)
        }
    })
}

const deleteBlog = (id) =>{
    return new Promise (async(resolve, reject) =>{
        
        try{
            const checkBlog = await Blog.findOne({
                _id: id
            })
            
            if(checkBlog === null){
                resolve({
                    status: 'OK',
                    message: 'The blog is not defined'
                })
            }
            
            await Blog.findByIdAndDelete(id)
            resolve({
                status:'OK',
                message:'Delete blog success'
                
            }) 
            
        }
        catch(e){
            reject(e)
        }
    })
}

const getDetailsBlog = (id) =>{
    return new Promise (async(resolve, reject) =>{
        
        try{
            const blog = await Blog.findOne({
                _id: id
            })
            
            if(blog === null){
                resolve({
                    status: 'OK',
                    message: 'The blog is not defined'
                })
            }
            
            resolve({
                status:'OK',
                message:'success',
                data: blog
            }) 
            
        }
        catch(e){
            reject(e)
        }
    })
}

const getAllBlog = () =>{
    return new Promise (async(resolve, reject) =>{
        
        try{
            const allBlog =  await Blog.find()
            resolve({
                status:'OK',
                message:'SUCCESS',
                data: allBlog
            }) 
            
        }
        catch(e){
            reject(e)
        }
    })
}

module.exports = {
    createBlog,
    updateBlog,
    deleteBlog,
    getDetailsBlog,
    getAllBlog
}
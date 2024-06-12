const Film = require('../models/FilmModel')

const createFilm = (newFilm) =>{
    return new Promise (async(resolve, reject) =>{
        const {title, image, date, rating, author, video, description} = newFilm
        const cleanedTitle = title.trim();
        try{
            const checkFilm = await Film.findOne({
                title: title
            })
            if(checkFilm !== null){
                resolve({
                    status: 'OK',
                    message: 'The title of film is already'
                })               
            }else{
                const createFilm = await Film.create({
                    title : cleanedTitle,
                    image,
                    date,
                    rating,
                    author,
                    video,
                    description 
                })
                if(createFilm){
                    resolve({
                        status:'OK',
                        message:'SUCCESS',
                        data: createFilm
                    })
                } 
            }
             
            
        }
        catch(e){
            reject(e)
        }
    })
}

const updateFilm = (id, data) =>{
    return new Promise (async(resolve, reject) =>{
        
        try{
            const checkFilm = await Film.findOne({
                _id: id
            })
            
            if(checkFilm === null){
                resolve({
                    status: 'OK',
                    message: 'The film is not defined'
                })
            }
            
            const updateFilm = await Film.findByIdAndUpdate(id, data, { new: true})
            resolve({
                status:'OK',
                message:'SUCCESS',
                data: updateFilm
            }) 
            
        }
        catch(e){
            reject(e)
        }
    })
}

const getDetailsFilm = (id) =>{
    return new Promise (async(resolve, reject) =>{
        
        try{
            const film = await Film.findOne({
                _id: id
            })
            
            if(film === null){
                resolve({
                    status: 'OK',
                    message: 'The film is not defined'
                })
            }
            
            resolve({
                status:'OK',
                message:'success',
                data: film
            }) 
            
        }
        catch(e){
            reject(e)
        }
    })
}

const deleteFilm = (id) =>{
    return new Promise (async(resolve, reject) =>{
        
        try{
            const checkFilm = await Film.findOne({
                _id: id
            })
            
            if(checkFilm === null){
                resolve({
                    status: 'OK',
                    message: 'The film is not defined'
                })
            }
            
            await Film.findByIdAndDelete(id)
            resolve({
                status:'OK',
                message:'Delete film success'
                
            }) 
            
        }
        catch(e){
            reject(e)
        }
    })
}

const getAllFilm = (limit, page, sort, filter) =>{
    
    return new Promise (async(resolve, reject) =>{
        
        try{
            const totalfilm = await Film.count()
            console.log("filter",filter)
            if(filter){
                const label = filter[0]
                const allFilmFilter =  await Film.find({
                    [label]:{ '$regex': filter[1]}
                })
                resolve({
                    status:'OK',
                    message:'SUCCESS',
                    data: allFilmFilter,
                    total: totalfilm,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalfilm / limit)
                }) 
            }
            if(sort){
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allFilmSort =  await Film.find().limit(limit).skip(page * limit).sort(objectSort)
                resolve({
                    status:'OK',
                    message:'SUCCESS',
                    data: allFilmSort,
                    total: totalfilm,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalfilm / limit)
                }) 
            }
            const allFilm =  await Film.find().limit(limit).skip(page * limit)
            resolve({
                status:'OK',
                message:'SUCCESS',
                data: allFilm,
                total: totalfilm,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalfilm / limit)
            }) 
            
        }
        catch(e){
            reject(e)
        }
    })
}

module.exports = {
    createFilm,
    updateFilm,
    getDetailsFilm,
    deleteFilm,
    getAllFilm
}
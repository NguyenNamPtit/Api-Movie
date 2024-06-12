const FilmService = require ('../services/FilmServices')


const createFilm = async (req,res) => {
    try{
        const {title, image, date, rating, author, video, description} = req.body
        if (!title || !image || !date || !rating || !author || !video || !description){
            return res.status(200).json({
                status: 'ERR',
                message:'The input is required'

            })
        }
        const response = await FilmService.createFilm(req.body)
        
        return res.status(200).json(response)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const updateFilm = async (req,res) => {
    try{
        const filmId = req.params.id 
        const data = req.body 
        if (!filmId){
            return res.status(200).json({
                status: 'ERR',
                message:'The filmId is required'

            })
        }
        
        const response = await FilmService.updateFilm(filmId, data)
        
        return res.status(200).json(response)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const detailFilm = async (req,res) => {
    try{
        const filmId = req.params.id 
        
        
        if (!filmId){
            return res.status(200).json({
                status: 'ERR',
                message:'The filmId is required'

            })
        }
        
        const response = await FilmService.getDetailsFilm(filmId)
        
        return res.status(200).json(response)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const deleteFilm = async (req,res) => {
    try{
        const filmId = req.params.id 
        
        
        if (!filmId){
            return res.status(200).json({
                status: 'ERR',
                message:'The filmId is required'

            })
        }
        
        const response = await FilmService.deleteFilm(filmId)
        
        return res.status(200).json(response)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const getAllFilm = async (req,res) => {
    try{
        const {limit, page, sort, filter} = req.query
        const response = await FilmService.getAllFilm(Number(limit) || 8, Number(page) || 0, sort, filter )
        
        return res.status(200).json(response)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createFilm,
    updateFilm,
    detailFilm,
    deleteFilm,
    getAllFilm
}
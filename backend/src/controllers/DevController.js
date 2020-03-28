// 5 funções comuns em um controler index, show, store, update, destroy
const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response){
        const devs = await Dev.find();
        response.json(devs);
    },
    async store(request, response){
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });
        
        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);    
            const { name = login, avatar_url, bio } = apiResponse.data;
            const techsArray = parseStringAsArray(techs);
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });
        }

        return response.json(dev);
    },
    async show(request, response){
        const { id } = request.params;
        let dev = await Dev.findById(id);
    
        return response.json(dev);
    },
    async destroy(request, response){
        const { id } = request.params;
        await Dev.deleteOne({_id: id});
        return response.json();
    },
    async update(request, response){
        const { id } = request.params;
        const { techs, latitude, longitude } = request.body;
        let dev = await Dev.findById(id);
        delete dev._id;
        dev.techs = parseStringAsArray(techs);
        dev.location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        };

        await Dev.update({_id: id}, dev);
        return response.json();
    }
}
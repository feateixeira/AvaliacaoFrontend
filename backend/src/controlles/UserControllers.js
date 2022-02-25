const connection = require('../database/connection'); 

module.exports = {
    async index(request, response) {
        const users = await connection('users').select('*');
    
        return response.json(users);
    },

    async create(request, response) {
        const {id, user, senha} = request.body;

    await connection('users').insert({
        id,
        user,
        senha,
    })

    return response.json({ id }) ;
    },
    
}
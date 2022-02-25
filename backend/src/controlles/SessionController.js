const connection = require('../database/connection'); 

module.exports = {
    async create(request, response) {
        const {nome} = request.body;

        const users = await connection('users')
            .where('id', id)
            .select('id')
            .first();

            if(!users) {
                return response.status(400).json({ error: 'Usuario não existe' });
            }

            return response.json(users)
    }
}
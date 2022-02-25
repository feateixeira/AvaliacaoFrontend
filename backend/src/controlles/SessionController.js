const connection = require('../database/connection');
const { create } = require('./UserControllers')

module.exports = {
    async create(request, response) {
        const { user } = request.body;

        const users = await connection('users')
            .where('user', user)
            .select('user')
            .first();

            if(!users) {
                return response.status(400).json({ error: 'Usuario não existe' });
            }

            return response.json(users)
    }
}
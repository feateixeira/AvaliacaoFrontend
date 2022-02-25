const connection = require('../database/connection');
const { create } = require('./UserControllers')

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const user = await connection('users')
            .where('id', id)
            .select('user_id')
            .first();

            if(!user) {
                return response.status(400).json({ error: 'Usuario não existe' });
            }

            return response.json(user)
    }
}
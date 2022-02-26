const connection = require('../database/connection');
const { create } = require('./UserControllers')

module.exports = {
    async create(request, response) {
        const { user, senha } = request.body;

        const users = await connection('users')
            .where('user', user)
            .where('senha', senha)
            .select("*")
            .first();

            if(!users || !senha) {
                return response.status(400).json({ error: 'Usuario não existe' });
            }

            return response.json({user, senha})
    }
}
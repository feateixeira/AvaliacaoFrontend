const connection = require('../database/connection'); 

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('clientes').count();

        console.log(count);

        const clientes = await connection('clientes')
            .join('users', 'user_id', '=', 'clientes.user_id')
            .limit(10)
            .offset((page - 1) * 10)
            .select([
                'clientes.*',
                'user_id'
            ]);

            response.header('X-Total-Count', count['count(*)']);
    
        return response.json(clientes);
    },

    async create(request, response) {
        const {nome, cpf, endereco, telefone, email } = request.body;
        const user_id = request.headers.authorization;


    const [id] = await connection('clientes').insert({
        nome,
        cpf,
        endereco,
        telefone,
        email,
        user_id,
    });

    return response.json(id) ;
    },

    async delete(request, response) {
        const { id } = request.params;
        const user_id = await connection('clientes')
            .where('id', id)
            .select('user_id')
            .firt();

            if(clientes.user_id !== user_id) {
                return response.status(401).json({error: 'Operação nao permitida.'});
            }

            await connection('clientes').where('id', id).delete();

            return response.status(204).send();
        }
};
'use strict'

const User = use('App/Models/User');
const Helpers = use('Helpers');

class UserController {
    async register({ request, response }){
        const data = request.only(['username', 'email', 'password'])

        try{
            const user = await User.create(data);
            return user;
        } catch (error){
            return response.status(500).send({error: error})
        }
    }

    async login({ request, response, auth }){
        try {
            const { email, password } = request.all();

            const token = await auth.attempt(email, password);

            return token;

        } catch (error) {
            return response.status(500).send({error: error})
        }
    }

    async getUserByToken({request, response, auth}) {
        try {   
            const user = await auth.getUser()
            const userReturn = { id:user.id, name:user.nome, username: user.username }

            return userReturn;
        } catch (error) {
            response.send('Missing or invalid jwt token')
        }
    }

    async logout({ auth, response, request }){
        try{
            const isLogged = await auth.check();
            if(!isLogged){
                await auth.logout()
            }

            return response.status(403).send({ info: 'Desconectado' })
        } catch (error){
            return response.status(403).semd({ info: 'Não logado' })
        }
    }

    async index({  }){
        // pega todos os usuarios
        const users = await User.all();

        return users;
    }

    async update({ params, request }){
        const data = request.only(['nome', 'sobrenome', 'cidade', 'idade', 'cargo', 'telefone', 'resumo', 'image'])

        const user = await User.find(params.id);
        
        // merge das informações atualizadas
        user.merge(data);

        await user.save();

        return user
    }

    async destroy({ params }){
        const user = await User.find(params.id)

        await user.delete()
    }

    show ({ auth, params }) {
        if (!auth) {
          return 'You cannot see someone else\'s profile'
        }
        return auth.user
    }
}

module.exports = UserController

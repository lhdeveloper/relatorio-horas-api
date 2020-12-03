'use strict'
const moment = use('moment');

const Database = use('Database')
// carregandoo modelo HORA;
const Hora = use('App/Models/Hora');


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with horas
 */
class HoraController {
    /**
     * Show a list of all horas.
     * GET horas
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */

    // metodo index carrega todos os itens
    async index() {
        // varmazenando na variavel todos os registros de horas
        const horas = await Hora.all();

        // retornando todos os registros (json format)
        return horas;
    }

    /**
     * Create/save a new hora.
     * POST horas
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, auth }) {
        // pegando os campos
        const results = request.only(['data', 'inicio', 'saida', 'retorno', 'fim',  'obs', 'user_id', 'saida2', 'saida3', 'saida4', 'retorno2', 'retorno3', 'retorno4']);
        // salvando o horario inicial
        const inicioDia = moment(results.inicio);

        // calculando horário de almoço
        const saidaAlmoco = moment(results.saida);
        const voltaAlmoco = moment(results.retorno);
        const durationAlmoco = moment.utc(moment(voltaAlmoco, 'HH:mm:ss').diff(moment(saidaAlmoco, 'HH:mm:ss'))).format('HH:mm:ss');


        // // verificando se houveram saidas2
        // if(results.saida2 != null){
        //     // pegando os horarios saida2/retorno2
        //     const segundaSaida2 = moment(results.saida2);
        //     const retornoSaida2 = moment(results.retorno2);

        //     // calculando o tempo de saida2;
        //     const durationSaida2 = moment.utc(moment(retornoSaida2, 'HH:mm:ss').diff(moment(segundaSaida2, 'HH:mm:ss'))).format('YYYY-MM-DD HH:mm:ss');
        //     const horasSaida2 = moment(durationSaida2).format(`H`);
        //     const minutosSaida2 = moment(durationSaida2).format(`mm`);

        //     var someHoras = moment(durationAlmoco).add(horasSaida2, 'hour');
        //     var someHoras = moment(durationAlmoco).add(minutosSaida2, 'minutes');

        //     console.log(someHoras);
        // }

        // // verificando se houveram saidas3
        // if(results.saida3 != null){
        //     // pegando os horarios saida3/retorno3
        //     const segundaSaida3 = moment(results.saida3);
        //     const retornoSaida3 = moment(results.retorno3);

        //     // calculando o tempo de saida3;
        //     const durationSaida3 = moment.utc(moment(retornoSaida3, 'HH:mm:ss').diff(moment(segundaSaida3, 'HH:mm:ss'))).format('HH:mm:ss');
        // }

        // // verificando se houveram saidas4
        // if(results.saida4 != null){
        //     // pegando os horarios saida4/retorno4
        //     const segundaSaida4 = moment(results.saida4);
        //     const retornoSaida4 = moment(results.retorno4);

        //     // calculando o tempo de saida4;
        //     const durationSaida4 = moment.utc(moment(retornoSaida4, 'HH:mm:ss').diff(moment(segundaSaida4, 'HH:mm:ss'))).format('HH:mm:ss');
        // }

        //somando todas as saidas;

        // verificando se o campo data fim está preenchido para calcular o total de horas
        if(results.fim !== null){
            // calculando hora de entrada e hora de saida
            const finalDia = moment(results.fim)
            const durationWorkDay = moment.utc(moment(finalDia,"HH:mm:ss").diff(moment(inicioDia,"HH:mm:ss"))).format("HH:mm:ss");
            
            // subtraindo o horário de almoço do horário total
            const totalHorasDay = moment(moment()).format(`YYYY-MM-DD ${durationWorkDay}Z`);
            const horasFinais = moment(totalHorasDay).subtract(durationAlmoco, 'hour');

            //total de horas trabalhadas no dia - almoço
            const totalHoras = moment(horasFinais).format('YYYY-MM-DD HH:mm:ss');

            // setando totalHoras no campo total
            results.total = totalHoras;

        }else {
            // se não tem total, preenche com valor zerado;
            results.total = moment().format(`YYYY-MM-DD 00:00:00`)
        }

        

        // criando item no banco
        const hora = await Hora.create(results);

        // retornando o post criado
        return hora;
    }

    /**
     * Display a single hora.
     * GET horas/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params }) {
        // buscando o post pelo ID
        const hora = await Hora.find(params.id)

        // retornando o item encontrado
        return hora;
    }

    /**
     * Update hora details.
     * PUT or PATCH horas/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response, auth }) {
        // verificando se usuário logado tem acesso
        const userToken = await auth.getUser();
        const paramUserID = params.user_id;
        const userID = parseFloat(paramUserID);

        if(userToken.id === userID){
            //buscando campos a serem atualizados
            const results = request.only(['data', 'inicio', 'fim', 'saida', 'retorno', 'obs', 'total', 'user_id', 'saida2', 'saida3', 'saida4', 'retorno2', 'retorno3', 'retorno4']);
            
            // pegando o item pelo id
            const hora = await Hora.find(params.id)

            // verificando se o campo fim (final expedidente) foi preenchido para calcular o restante
            if(results.fim != null){
                // calculando hora de entrada e hora de saida
                const inicioDia = moment(results.inicio);
                const finalDia = moment(results.fim)
                const duration = moment.utc(moment(finalDia,"HH:mm:ss").diff(moment(inicioDia,"HH:mm:ss"))).format("HH:mm:ss");
                
                // calculando horário de almoço
                const saidaAlmoco = moment(results.saida);
                const voltaAlmoco = moment(results.retorno);
                const durationAlmoco = moment.utc(moment(voltaAlmoco, 'HH:mm:ss').diff(moment(saidaAlmoco, 'HH:mm:ss'))).format('HH:mm:ss');
                
                // subtraindo o horário de almoço do horário total
                const dataHora = moment(moment()).format(`YYYY-MM-DD ${duration}Z`);
                const dataSubtract = moment(dataHora).subtract(durationAlmoco, 'hour');
                const totalHoras = moment(dataSubtract).format('YYYY-MM-DD HH:mm:ss');

                // setando totalHoras no campo total_horas_dia
                results.total = totalHoras;
            }else{
                results.total = moment().format(`YYYY-MM-DD 00:00:00`);
            }

            // merge das informações atualizadas
            hora.merge(results);

            // salvando alterações
            await hora.save();

            // retornando o item atualizado
            return hora;
        }else {
            return response.status(403).json('Forbidden');
        }
    }

    /**
     * Delete a hora with id.
     * DELETE horas/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params }) {
        // pegando o item
        const hora = await Hora.find(params.id)

        // deletando item
        await hora.delete();
    }

    async horasPerUser({ params, response, auth }) {
        // verificando se usuário logado tem acesso
        const userToken = await auth.getUser();
        const paramUserID = params.user_id;
        const userID = parseFloat(paramUserID);

        if(userToken.id === userID){
            // varmazenando na variavel todos os registros de horas
            return await Database
                .table('horas')
                .where('user_id', userToken.id)
        }else{
            return response.status(403).json('Forbidden');
        }

        
    }
}

module.exports = HoraController

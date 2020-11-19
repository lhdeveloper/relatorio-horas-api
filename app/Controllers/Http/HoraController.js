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
    async store({ request }) {
        // pegando os campos
        const results = request.only(['data', 'inicio', 'saida', 'retorno', 'fim',  'obs']);

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
        const totalHoras = moment(dataSubtract).format('HH:mm:ss');

        // setando totalHoras no campo total_horas_dia
        results.total = totalHoras;

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
    async update({ params, request, response }) {
        //buscando campos a serem atualizados
        const results = request.only(['data', 'inicio', 'fim', 'saida', 'retorno', 'obs', 'total']);
        
        // pegando o item pelo id
        const hora = await Hora.find(params.id)

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
        const totalHoras = moment(dataSubtract).format('HH:mm:ss');

        // setando totalHoras no campo total_horas_dia
        results.total = totalHoras;

        // merge das informações atualizadas
        hora.merge(results);

        // salvando alterações
        await hora.save();

        // retornando o item atualizado
        return hora;
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

    async horasPerUser({ params }) {
        // varmazenando na variavel todos os registros de horas
        return await Database
            .table('horas')
            .where('user_id', params)
    }
}

module.exports = HoraController

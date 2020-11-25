'use strict'
const Route = use('Route')
const Helpers = use('Helpers')

// Routes > Rotas de Registro de Horas
Route.group(() => {

    //Novo registro
    Route.post('/horas', 'HoraController.store')

    //Todos os registros
    Route.get('/horas', 'HoraController.index')

    //Visualizar registro
    Route.get('/horas/:id', 'HoraController.show')

    //Editar registro
    Route.put('/horas/:id/:user_id', 'HoraController.update')

    //Deletar registro
    Route.delete('/horas/:id', 'HoraController.destroy')

    //Horas de um usuário específico
    Route.get('/horas/user/:user_id', 'HoraController.horasPerUser')
}).middleware('auth');

// Routes > Rotas de User
Route.group(() => {
    //Novo usuário
    Route.post('/users/new', 'UserController.register')

    //Listar os usuários
    Route.get('/users', 'UserController.index').middleware('auth');

    // Disp user
    Route.get('/users/view/:username', 'UserController.show').middleware('auth')

    // Current User
    Route.get('/user/:id', 'UserController.show').middleware('auth')

    // Edit user
    Route.put('/users/update/:id', 'UserController.update').middleware('auth')

    // UPload Files
    Route.post('/images/uploads', 'UserController.uploadPicture').middleware('auth')

    // Delete user
    Route.delete('/users/delete/:id', 'UserController.destroy').middleware('auth')

    //Login
    Route.post('/login', 'UserController.login')

    // Logout
    Route.post('/logout', 'UserController.logout').middleware('auth')
})


Route.get('/me', 'UserController.getUserByToken').middleware('auth')
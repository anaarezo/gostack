const express = require('express');

const app = express();

app.use(express.json());

/**
 * Métodos HTTP:
 * 
 * GET: Buscar informações do back-end
 * POST: Criar informação no back-end
 * PUT/PATCH: Alterar uma informação no back-end
 * PUT Várias informações /PATCH única informação específica
 * DELETE: Deletar informação no back-end
 * depois da / é chamado de recurso /projects é um recurso
 */

 /**
  * Tipos de parâmetros
  * Query params: filtros e paginação, e.g. {{ base_url }}/projects?title=React&owner=Ana
  * Route params: identificar recursos na hora de atualizar ou deletar
  * Request body: conteúdo na hora de criar e editar um recurso
  */

app.get('/projects', (request, response) => {
  //const query = request.query; abaixo como desestruturar parâmetros
  //console.log(query);
  const { title, owner } = request.query;
  console.log(title);
  console.log(owner);

  return response.json([
    'Projeto 1',
    'Projeto 2',
  ]);
});

app.post('/projects', (request, response) => {
  // const body = request.body;
  // console.log(body);
  const { title, owner } = request.body;
  console.log(title);
  console.log(owner);
  return response.json([
    'Projeto 1',
    'Projeto 2',
    'Projeto 3',
  ]);
});

// PUT atualizar 1 projeto e não todos os projetos usando identificador único e.g. http://localhost:3333/projects/2
app.put('/projects/:id', (request, response) => {
  //const params = request.params;
  //console.log(params);

  const { id } = request.params;
  console.log(id);

  return response.json([
    'Projeto 4',
    'Projeto 2',
    'Projeto 3',
  ]);
});

app.delete('/projects/:id', (request, response) => {
  return response.json([
    'Projeto 2',
    'Projeto 3',
  ]);
});

app.listen(3333, () => {
  console.log('BACK-END STARTED!');
});
const express = require('express');

const app = express();
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

app.get('/projects', (request, response) => {
  return response.json([
    'Projeto 1',
    'Projeto 2',
  ]);
});

app.post('/projects', (request, response) => {
  return response.json([
    'Projeto 1',
    'Projeto 2',
    'Projeto 3',
  ]);
});

// PUT atualizar 1 projeto e não todos os projetos usando identificador único e.g. http://localhost:3333/projects/2
app.put('/projects/:id', (request, response) => {
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
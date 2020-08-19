const express = require('express');
const { uuid, isUuid } = require('uuidv4');
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

/**
 * Middleware:
 * Interceptador de requisições que interromper totalmente a requisição
 */
const projects = [];

function logRequests(request, response, next) {
  const { method, url } = request;
  const logLabel = `[${method.toUpperCase()}] ${url}`;

  // console.log('1');
  console.time(logLabel);

  next(); // Próximo middle
  // console.log('2');
  console.timeEnd(logLabel);

  //aqui passo 3
}

function validateProjectId(request,response,next) {
  const { id } = request.params;

  if(!isUuid(id)){
    return response.status(400).json({error: 'Invalid Project ID.'});
  }

  return next();
}

app.use(logRequests);
app.use('/projects/:id', validateProjectId);

app.get('/projects', (request, response) => {
  // console.log('3');
  const { title } = request.query;

  const results = title
  ? projects.filter(project => project.title.includes(title))
  : projects;
  return response.json(results);
});

app.post('/projects', (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuid(), title, owner };

  projects.push(project);

  return response.json(project);
});

// PUT atualizar 1 projeto e não todos os projetos usando identificador único e.g. http://localhost:3333/projects/2
app.put('/projects/:id', (request, response) => {
  const { id } = request.params;

  const { title, owner } = request.body;
  const projectIndex = projects.findIndex(project => project.id === id);

  if(projectIndex < 0) {
    return response.status(400).json({error: 'Project not found.'});
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;
  return response.json(project);
});

app.delete('/projects/:id', (request, response) => {

  const { id } = request.params;

  const projectIndex = projects.findIndex(project => project.id === id);

  if(projectIndex < 0) {
    return response.status(400).json({error: 'Project not found.'});
  }

  projects.splice(projectIndex, 1);

  return response.status(204).send();
});

app.listen(3333, () => {
  console.log('BACK-END STARTED!');
});
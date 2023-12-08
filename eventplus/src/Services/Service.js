import axios from "axios";

/**
 * Rota para o recurso EventoS
 */
export const eventsResource = '/Evento';

/**
 * Rota para o recurso próximos Eventos
 */
export const nextEventResource = '/Evento/ListarProximos';

/**
 * Rota para o recurso Tipos de Eventos
 */
export const eventsTypeResource = '/TiposEvento';

export const myEventsResource = `/PresencasEvento/ListarMinhas`;

export const presencesEventsResource = "/PresencasEvento";

export const commentaryEventResource = "/ComentariosEvento/BuscarPorIdUsuario";

//Rota para o recurso de Login
export const loginResource = '/Login'

const apiPort = '5000'
const localApiUrl= `http://localhost:${apiPort}/api`
const externalApiUrl = null;

const api = axios.create({
    baseURL: localApiUrl
});

export default api;
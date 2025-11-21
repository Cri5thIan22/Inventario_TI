import axios from "axios";

const ACTIVO_BASE_URL = "http://localhost:8080/api/v1/activo/todos";
const URL_BASE = "http://localhost:8080/api/v1/activo"

class activoService{
    getAllService(){
        return axios.get(ACTIVO_BASE_URL);
    }

    getActivosByUsuarioId(idUsuario){
        const URL_ACTIVO_USER_ID = `${URL_BASE}/${idUsuario}/activos`;
        return axios.get(URL_ACTIVO_USER_ID); 
    }   

    getDetallesByActivoId(idActivo){
        const URL_DETALLES_ACTIVO_ID = `${URL_BASE}/${idActivo}/detalles`;
        return axios.get(URL_DETALLES_ACTIVO_ID);
    }
    
}

export default new activoService();

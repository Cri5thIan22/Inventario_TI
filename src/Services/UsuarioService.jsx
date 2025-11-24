import axios from "axios";

const USUARIO_BASE_URL = "http://localhost:8080/api/v1/usuarios/todos";

class usuarioService {
    getAllService(){
        return axios.get(USUARIO_BASE_URL);
    }

}

export default new usuarioService();
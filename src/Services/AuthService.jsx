import axios from "axios";

const URL_REGISTRO = "http://localhost:8080/api/v1/auth/registro";

class AuthService{

    postCrearUsuario(datosUsuario){
        return axios.post(URL_REGISTRO,datosUsuario);
    }

}

export default new AuthService();
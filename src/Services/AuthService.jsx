import axios from "axios";

const URL_REGISTRO = "http://localhost:8080/api/v1/auth/registro";
const URL_LOGIN = "http://localhost:8080/api/v1/auth/login";
 
class AuthService{

    postCrearUsuario(datosUsuario){
        return axios.post(URL_REGISTRO,datosUsuario);
    }

    postLoginUsuario(datosUsuario){
        return axios.post(URL_LOGIN,datosUsuario);
    }

}

export default new AuthService();
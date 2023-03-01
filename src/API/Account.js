import axios from 'axios'
import { useEffect } from 'react';
import Auth from "../middleWare/Auth/Auth"

class Account {
    constructor() {
        this.result = []
        this.user = null
    }
    LoginApi = (email, password) => {
        const res = async () => {
            const resp = await axios
                // .post(`https://209.97.168.200/hr/public/api/login?email=${email}&password=${password}`)
                .post(`https://209.97.168.200/hr/public/api/login`, null, {
                    params: {
                        email,
                        password
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            return resp;
        };
        return res();
    };
    UserImageApi = (email) => {
        const res = async () => {
            const resp = await axios
                .post(`https://209.97.168.200/hr/public/api/already_existing_user_role_api`, null, {
                    params: {
                        email,
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            return resp;
        };
        return res();
    };
}
export default new Account()
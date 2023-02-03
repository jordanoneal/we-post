import axios from "axios";

export async function LoginUser(username: string, password: string) {
    try {
        const params = { username, password }
        const response = await axios.post(`http://localhost:5000/auth/login`, params, { withCredentials: true, })

        console.log(JSON.stringify(response.data));
        return response.data;
    }
    catch (err: any) {
        console.log(err);
        return undefined;
    }
}
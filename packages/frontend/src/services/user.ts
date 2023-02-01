import axios from 'axios';
import { IUser, ICreateUserParams } from '@common.interfaces';

export async function CreateUser(params: ICreateUserParams): Promise<IUser | undefined> {
    try {
        console.log('Sending request to create user...');
        
        const response = await axios.post(`http://localhost:5000/users`, params, { withCredentials: true });
        return response.data as IUser;
    }
    catch (err: any) {
        console.log(err);
        return undefined;
    }
}
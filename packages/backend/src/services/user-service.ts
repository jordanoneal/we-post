import { ICreateUserParams, IUpdateUserParams, IUser } from "common.interfaces";
import { getRepository, Repository } from "typeorm";
import { User } from "../entities/user";
import { hashPassword } from "./auth";

class UserService {
    private userRepository!: Repository<User>;

    public getUserRepository(): Repository<User> {
        if (this.userRepository) return this.userRepository;
        return this.userRepository = getRepository(User);
    }

    public async retrieveAllUsers(): Promise<IUser[]> {
        return await this.getUserRepository().find();
    }

    public async retrieveUserById(id: number): Promise<IUser> {
        const user = await this.getUserRepository().findOne({
            where: {
                id: id
            },
            relations: ['posts', 'comments']
        })
        if (!user) throw new Error('Could not retrieve User by id');
        return user;
    }

    public async createUser(params: ICreateUserParams): Promise<IUser> {
        const password = await hashPassword(params.password);
        const user = new User({ ...params, password });

        return await this.getUserRepository().save(user);
    }

    public async updateUser(id: number, params: IUpdateUserParams): Promise<IUser> {
        const user = await this.retrieveUserById(id);
        if (!user) throw new Error("No user found ");

        const updatedUser = Object.assign(user, params);
        await this.getUserRepository().save(updatedUser);

        return updatedUser;
    }

    public async retrieveUserByRefreshToken(refreshToken: string): Promise<IUser> {
        const user = await this.getUserRepository().findOne({
            where: {
                refreshToken: refreshToken
            }
        })
        if (!user) throw new Error('Could not retrieve User by refreshToken');
        return user;
    }
}

const instance = new UserService();

export { instance as UserService };
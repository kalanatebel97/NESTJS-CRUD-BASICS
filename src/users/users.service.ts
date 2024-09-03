import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {

    private users = [
        {
            "id": 1,
            "name": "Ava",
            "email": "ava@example.com",
            "role": "engineer"
        },
        {
            "id": 2,
            "name": "Liam",
            "email": "liam@example.com",
            "role": "developer"
        },
        {
            "id": 3,
            "name": "Olivia",
            "email": "olivia@example.com",
            "role": "designer"
        },
        {
            "id": 4,
            "name": "Ethan",
            "email": "ethan@example.com",
            "role": "engineer"
        },
        {
            "id": 5,
            "name": "Sophia",
            "email": "sophia@example.com",
            "role": "business analyst"
        }
    ]

    findAll(role?: 'engineer' | 'developer' | 'designer') {
        if (role) {
            return this.users.filter(user => user.role === role)
        }
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id);
        return user;
    }

    createUser(user: { name: string, email: string, role: 'engineer' | 'developer' | 'designer' }) {
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...user
        }
        this.users.push(newUser);
        return newUser;
    }


    updateUser(id: number, updateUser: { name?: string, email?: string, role?: 'engineer' | 'developer' | 'designer' }) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updateUser }
            }
            return user
        })
        return this.findOne(id)
    }

    deleteUser(id: number) {
        const removedUser = this.findOne(id);
        this.users = this.users.filter(user => user.id !== id);
        return removedUser;
    }
}

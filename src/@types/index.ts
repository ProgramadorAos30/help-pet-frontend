export interface City {
    id: number,
    nome:string,
    sigla: string
}

export interface UF{
    id: number,
    nome:string,
    sigla: string
}

export interface User {
    name: string,
    age: string,
    phone_number: string,
    email: string,
    password: string,
    state: string,
    city: string,
    genre: string,
    breed: string,
    active: true,
    trusted: false,
    role: string,
    first_access: boolean,
    settings: {
      user: string,
      service_notifications: [
        string
      ],
      all_notifications: boolean,
      push_token: string,
      _id: string
    },
    _id: string,
    createdAt: string,
    updatedAt: string
}
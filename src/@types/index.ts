export type listCity = {
  id: number,
  nome:string,
  sigla: string
};

export interface City {
  cities: listCity[]
};

export type listUf = {
  id: number,
  nome:string,
  sigla: string
};

export interface UF {
    states: listUf[]
};

export interface User {
  data: [
    {
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
  ]
};

export interface AllUsers {
  data: [{
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
  }],
  meta:[{
    page: any,
    take: any,
    itemCount: any,
    pageCount: any,
    hasPreviousPage: any,
    hasNextPage: any
  }]
}

export interface User_setings {
    user: string,
    service_notifications: [
      string
    ],
    all_notifications: boolean,
    push_token: string,
    _id: string
};

export interface Dashboard_occurrences {
    total: number,
    new_today: number,
    approved_today: number,
    disapproved_today: number,
    line_charts: [
      string
    ],
    genre_chart: {
      male_percent: number,
      female_percent: number,
      non_binary_percent: number,
      others_percent: number
    },
    breed_chart: {
      yellow_percent: number,
      white_percent: number,
      indigenous_percent: number,
      brown_percent: number,
      black_percent: number
    },
    annual_occurrences: {
      total: number,
      monthly: number
    }
};

export interface Dashboard_users {
    total: number,
    new_today: number,
    active_today: number,
    inactive_today: number,
    line_charts: [
      string
    ],
    annual_users: {
      total: number,
      monthly: number
    }
};

export type State_List = {
    name: string,
    user_total: number
};

export interface Dashboard_region_Users {
  name: string,
  state_list: State_List[]
  user_total: number
};

export interface Messages {
    name: string,
    email: string,
    reason: string,
    message: string,
    message_reply: string,
    status: string,
    createdAt: string,
    updatedAt: string,
    _id: string
};

export interface Notifications {
    title: string,
    message: string,
    occurrence: {
      service: string,
      source: string,
      source_name: string,
      date: string,
      restoration_date: string,
      address: string,
      neighborhood: string,
      city: string,
      state: string,
      country: string,
      special_place: string,
      have_energy_meter: string,
      have_hydrometer: string,
      have_reservoir: string,
      type_place: string,
      area: string,
      description: string,
      restoration_description: string,
      agree_share: boolean,
      latitude: string,
      longitude: string,
      status: string,
      finished_status: string,
      user: string,
      _id: string,
      createdAt: string,
      updatedAt: string
    },
    service: string,
    status: string,
    error: string,
    sending_attempts: number,
    _id: string,
    createdAt: string,
    updatedAt: string
};

export interface Occurrences {
    data: [{
      service: {
        image: string,
        name: string,
        background_color: string,
        active: boolean,
        other_option: boolean,
        sources: [
          string
        ],
        _id: string
      },
      source: string,
      source_name: string,
      date: string,
      restoration_date: string,
      address: string,
      neighborhood: string,
      city: string,
      state: string,
      country: string,
      special_place: string,
      have_energy_meter: string,
      have_hydrometer: string,
      have_reservoir: string,
      type_place: string,
      area: string,
      description: string,
      restoration_description: string,
      agree_share: boolean,
      latitude: string,
      longitude: string,
      status: string,
      finished_status: string,
      user: {
        name: string,
        age: string,
        phone_number: string,
        email: string,
        password: string,
        state: string,
        city: string,
        genre: string,
        breed: string,
        active: boolean,
        trusted: boolean,
        role: string,
        first_access: boolean,
        _id: string,
        createdAt: string,
        updatedAt: string
      },
      _id: string,
      createdAt: string,
      updatedAt: string,
    }],
    meta: {
      page: any,
      take: any,
      itemCount: any,
      pageCount: any,
      hasPreviousPage: any,
      hasNextPage: any
    }
};

export interface Occurrences_map {
      service: {
        image: string,
        name: string,
        background_color: string,
        active: boolean,
        other_option: boolean,
        sources: [
          string
        ],
        _id: string
      },
      source: string,
      source_name: string,
      date: string,
      restoration_date: string,
      address: string,
      neighborhood: string,
      city: string,
      state: string,
      country: string,
      special_place: string,
      have_energy_meter: string,
      have_hydrometer: string,
      have_reservoir: string,
      type_place: string,
      area: string,
      description: string,
      restoration_description: string,
      agree_share: boolean,
      latitude: string,
      longitude: string,
      status: string,
      finished_status: string,
      user: {
        name: string,
        age: string,
        phone_number: string,
        email: string,
        password: string,
        state: string,
        city: string,
        genre: string,
        breed: string,
        active: boolean,
        trusted: boolean,
        role: string,
        first_access: boolean,
        _id: string,
        createdAt: string,
        updatedAt: string
      },
      _id: string,
      createdAt: string,
      updatedAt: string
};

export interface Services {
    image?: string,
    name?: string,
    background_color?: string,
    active?: boolean,
    other_option?: boolean,
    sources?: Soucers[],
    id?: string
};

export type ServiceFormData = {
  image?: string,
  name: string,
  background_color: string,
  active: boolean,
  other_option: boolean,
  sources?: SourceFormData[],
  id?: string
}

export type SourceFormData = {
  service?: string,
  name?: string,
  id?: string
  _id?: string
}

export interface Soucers {
    service: string,
    name: string,
    id?: string
    _id?: string
};

export interface Uploads {
    file: any,
    id?: string
};
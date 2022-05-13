export const initialState = {
    users: {
        "name": "",
        "age": "tring",
        "phone_number": "",
        "email": "",
        "password": "",
        "state": "",
        "city": "",
        "genre": "",
        "breed": "",
        "active": false,
        "trusted": false,
        "role": "",
        "first_access": false,
        "settings": {
            "user": "",
            "service_notifications": [
            ""
            ],
            "all_notifications": false,
            "push_token": "",
            "_id": ""
        },
        "_id": "",
        "createdAt": "",
        "updatedAt": ""
    },
    token: '',
    user_setings: {
        "user": "",
        "service_notifications": [
          ""
        ],
        "all_notifications": false,
        "push_token": "",
        "_id": ""
    },
    dashboard_occurrences: {
        "total": 0,
        "new_today": 0,
        "approved_today": 0,
        "disapproved_today": 0,
        "line_charts": [
          ""
        ],
        "genre_chart": {
          "male_percent": 0,
          "female_percent": 0,
          "non_binary_percent": 0,
          "others_percent": 0
        },
        "breed_chart": {
          "yellow_percent": 0,
          "white_percent": 0,
          "indigenous_percent": 0,
          "brown_percent": 0,
          "black_percent": 0
        },
        "annual_occurrences": {
          "total": 0,
          "monthly": 0
        }
    },
    dashboard_users: {
        "total": 0,
        "new_today": 0,
        "active_today": 0,
        "inactive_today": 0,
        "line_charts": [
          ""
        ],
        "annual_users": {
          "total": 0,
          "monthly": 0
        }
    },
    messages: {
        "name": "",
        "email": "",
        "reason": "",
        "message": "",
        "message_reply": "",
        "status": "",
        "createdAt": "",
        "updatedAt": "",
        "_id": ""
    },
    notifications: {
        "title": "",
        "message": "",
        "occurrence": {
          "service": "",
          "source": "",
          "source_name": "",
          "date": "",
          "restoration_date": "",
          "address": "",
          "neighborhood": "",
          "city": "",
          "state": "",
          "country": "",
          "special_place": "",
          "have_energy_meter": "",
          "have_hydrometer": "",
          "have_reservoir": "",
          "type_place": "",
          "area": "House",
          "description": "",
          "restoration_description": "",
          "agree_share": false,
          "latitude": "",
          "longitude": "",
          "status": "",
          "finished_status": "",
          "user": "",
          "_id": "",
          "createdAt": "",
          "updatedAt": ""
        },
        "service": "",
        "status": "",
        "error": "",
        "sending_attempts": 0,
        "_id": "",
        "createdAt": "",
        "updatedAt": ""
    },
    occurrences: {
        "service": {
            "image": "",
            "name": "",
            "background_color": "",
            "active": false,
            "other_option": false,
            "sources": [
              ""
            ],
            "_id": ""
          },
          "source": "",
          "source_name": "",
          "date": "",
          "restoration_date": "",
          "address": "",
          "neighborhood": "",
          "city": "",
          "state": "",
          "country": "",
          "special_place": "",
          "have_energy_meter": "",
          "have_hydrometer": "",
          "have_reservoir": "",
          "type_place": "",
          "area": "",
          "description": "",
          "restoration_description": "",
          "agree_share": false,
          "latitude": "",
          "longitude": "",
          "status": "",
          "finished_status": "",
          "user": {
            "name": "",
            "age": "",
            "phone_number": "",
            "email": "",
            "password": "",
            "state": "",
            "city": "",
            "genre": "",
            "breed": "",
            "active": false,
            "trusted": false,
            "role": "",
            "first_access": false,
            "_id": "",
            "createdAt": "",
            "updatedAt": ""
          },
          "_id": "",
          "createdAt": "",
          "updatedAt": ""
    },
    occurrences_map: {
        "service": {
            "image": "",
            "name": "",
            "background_color": "",
            "active": false,
            "other_option": false,
            "sources": [
              ""
            ],
            "_id": ""
          },
          "source": "",
          "source_name": "",
          "date": "",
          "restoration_date": "",
          "address": "",
          "neighborhood": "",
          "city": "",
          "state": "",
          "country": "",
          "special_place": "",
          "have_energy_meter": "",
          "have_hydrometer": "",
          "have_reservoir": "",
          "type_place": "",
          "area": "",
          "description": "",
          "restoration_description": "",
          "agree_share": false,
          "latitude": "",
          "longitude": "",
          "status": "",
          "finished_status": "",
          "user": {
            "name": "",
            "age": "",
            "phone_number": "",
            "email": "",
            "password": "",
            "state": "",
            "city": "",
            "genre": "",
            "breed": "",
            "active": false,
            "trusted": false,
            "role": "Mobile",
            "first_access": false,
            "_id": "",
            "createdAt": "",
            "updatedAt": ""
          },
          "_id": "",
          "createdAt": "",
          "updatedAt": ""
    },
    services: {
        "image": "",
        "name": "",
        "background_color": "",
        "active": false,
        "other_option": false,
        "sources": [
          ""
        ],
        "_id": ""
    },
    soucers: {
        "service": "",
        "name": "",
        "_id": ""
    },
    uploads: {
        "file": "",
        "_id": ""
    },
    state: [{
      'id': 0,
      'nome':'',
      'sigla': ''
    }],
    city: [{
      'id': 0,
      'nome':'',
      'sigla': ''
    }]
}
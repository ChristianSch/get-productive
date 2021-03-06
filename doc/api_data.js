define({ api: [
  {
    "type": "delete",
    "url": "/api/v1/user",
    "title": "Delete user",
    "name": "DeleteUser",
    "group": "User",
    "version": "0.0.1",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "id",
            "optional": false,
            "description": "Users unique id."
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200 OK": [
          {
            "group": "200",
            "type": "String",
            "field": "_id",
            "optional": false,
            "description": "User id"
          },
          {
            "group": "200",
            "type": "Object",
            "field": "local",
            "optional": false,
            "description": "Local user information"
          },
          {
            "group": "200",
            "type": "String",
            "field": "local.name",
            "optional": false,
            "description": "User name"
          },
          {
            "group": "200",
            "type": "String",
            "field": "local.mail",
            "optional": false,
            "description": "User mail"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   {\n       \"_id\": \"539f4ec4debc120000dd9ab6\",\n       \"local\": {\n           \"name\": \"JohnDoe\",\n           \"mail\": \"foobar@dieter.de\"\n       }\n   }\n"
        }
      ]
    },
    "error": {
      "fields": {
        "422 Unprocessable Entity": [
          {
            "group": "422",
            "field": "NoValidID",
            "optional": false,
            "description": "ID is not valid"
          }
        ],
        "404 Not Found": [
          {
            "group": "404 Not Found",
            "field": "UserNotFound",
            "optional": false,
            "description": "The id of the User was not found."
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 422 Unprocessable Entity\n   {\n       \"error\": \"NoValidID\"\n   }\n"
        },
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 404 Not Found\n   {\n     \"error\": \"UserNotFound\"\n   }\n"
        }
      ]
    },
    "filename": "lib/api/v1/user/index.js"
  },
  {
    "type": "get",
    "url": "/api/v1/user/:id",
    "title": "Request user information",
    "name": "GetUser",
    "group": "User",
    "version": "0.0.1",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "id",
            "optional": false,
            "description": "Users unique id"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200 OK": [
          {
            "group": "200",
            "type": "String",
            "field": "_id",
            "optional": false,
            "description": "User id"
          },
          {
            "group": "200",
            "type": "Object",
            "field": "local",
            "optional": false,
            "description": "Local user information"
          },
          {
            "group": "200",
            "type": "String",
            "field": "local.name",
            "optional": false,
            "description": "User name"
          },
          {
            "group": "200",
            "type": "String",
            "field": "local.mail",
            "optional": false,
            "description": "User mail"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   {\n       \"_id\": \"539f4ec4debc120000dd9ab6\",\n       \"local\": {\n           \"name\": \"JohnDoe\",\n           \"mail\": \"foobar@dieter.de\"\n       }\n   }\n"
        }
      ]
    },
    "error": {
      "fields": {
        "422 Unprocessable Entity": [
          {
            "group": "422",
            "field": "NoValidID",
            "optional": false,
            "description": "ID is not valid"
          }
        ],
        "404 Not Found": [
          {
            "group": "404 Not Found",
            "field": "UserNotFound",
            "optional": false,
            "description": "The id of the User was not found."
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 422 Unprocessable Entity\n   {\n       \"error\": \"NoValidID\"\n   }\n"
        },
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 404 Not Found\n   {\n     \"error\": \"UserNotFound\"\n   }\n"
        }
      ]
    },
    "filename": "lib/api/v1/user/index.js"
  },
  {
    "type": "post",
    "url": "/api/v1/user",
    "title": "Create new user",
    "name": "PostUser",
    "group": "User",
    "version": "0.0.1",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "name",
            "optional": false,
            "description": "Name of user"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "mail",
            "optional": false,
            "description": "Mail address of user"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "password",
            "optional": false,
            "description": "Cleartext password of user"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "201 Created": [
          {
            "group": "201",
            "type": "String",
            "field": "_id",
            "optional": false,
            "description": "User id"
          },
          {
            "group": "201",
            "type": "Object",
            "field": "local",
            "optional": false,
            "description": "Local user information"
          },
          {
            "group": "201",
            "type": "String",
            "field": "local.name",
            "optional": false,
            "description": "User name"
          },
          {
            "group": "201",
            "type": "String",
            "field": "local.mail",
            "optional": false,
            "description": "User mail"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 201 Created\n   {\n        \"_id\": \"53a0be0561a95fa217f3a4ee\",\n        \"local\": {\n            \"name\": \"hans\",\n            \"mail\": \"foo@bar.de\"\n        }\n   }\n"
        }
      ]
    },
    "error": {
      "fields": {
        "400 Bad Request": [
          {
            "group": "400",
            "field": "MissingData",
            "optional": false,
            "description": "Not enough data provided"
          }
        ],
        "422 Unprocessable Entity": [
          {
            "group": "422",
            "field": "UserNameTaken",
            "optional": false,
            "description": "The user name is already taken"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 422 Unprocessable Entity\n   {\n     \"error\": \"UserNameTaken\"\n   }\n"
        },
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 400 Bad Request\n   {\n     \"error\": \"Missing Data\"\n   }\n"
        }
      ]
    },
    "filename": "lib/api/v1/user/index.js"
  },
  {
    "type": "put",
    "url": "/api/v1/user/:id",
    "title": "Change user information",
    "name": "PutUser",
    "group": "User",
    "version": "0.0.1",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "id",
            "optional": false,
            "description": "Users unique id"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200 OK": [
          {
            "group": "200",
            "type": "String",
            "field": "_id",
            "optional": false,
            "description": "User id"
          },
          {
            "group": "200",
            "type": "Object",
            "field": "local",
            "optional": false,
            "description": "Local user information"
          },
          {
            "group": "200",
            "type": "String",
            "field": "local.name",
            "optional": false,
            "description": "User name"
          },
          {
            "group": "200",
            "type": "String",
            "field": "local.mail",
            "optional": false,
            "description": "User mail"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   {\n       \"_id\": \"539f4ec4debc120000dd9ab6\",\n       \"local\": {\n           \"name\": \"JohnDoe\",\n           \"mail\": \"foobar@dieter.de\"\n       }\n   }\n"
        }
      ]
    },
    "error": {
      "fields": {
        "400 Bad Request": [
          {
            "group": "400",
            "field": "NotEnoughData",
            "optional": false,
            "description": "Missing data"
          }
        ],
        "422 Unprocessable Entity": [
          {
            "group": "422",
            "field": "NoValidID",
            "optional": false,
            "description": "ID is not valid"
          }
        ],
        "404 Not Found": [
          {
            "group": "404 Not Found",
            "field": "UserNotFound",
            "optional": false,
            "description": "The id of the User was not found."
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 400 Bad Request\n   {\n       \"error\": \"NotEnoughData\"\n   }\n"
        },
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 422 Unprocessable Entity\n   {\n       \"error\": \"NoValidID\"\n   }\n"
        },
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 404 Not Found\n   {\n     \"error\": \"UserNotFound\"\n   }\n"
        }
      ]
    },
    "filename": "lib/api/v1/user/index.js"
  },
  {
    "error": {
      "fields": {
        "404 Not Found": [
          {
            "group": "404 Not Found",
            "field": "UserNotFound",
            "optional": false,
            "description": "The id of the User was not found."
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 404 Not Found\n   {\n     \"error\": \"UserNotFound\"\n   }\n"
        }
      ]
    },
    "group": "index.js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "lib/api/v1/user/index.js"
  }
] });
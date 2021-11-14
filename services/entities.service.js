const fetch   = require('node-fetch');
const config  = require('./../config');

class EntitiesService {
    constructor() {
        this.entities = [];
    }

    async consultAPI(entityId) {
        var response     = await fetch(config.ENDPOINT_API + entityId);
        var responseJson = await response.json();
        return responseJson;
    }

    async find(body) {
        var statusCode;
        var responseMessage;

        const lengthBody = Object.keys(body).length;

        if (lengthBody === 2) {
            var startId = body["startId"];
            var endId   = body["endId"];

            if ((startId >= 1 && startId <= 20) && (endId >= 1 && endId <= 20)) {
                if (startId <= endId) {
                    var statusConsult = true;
                    for (let index = startId; index <= endId; index++) {
                        var response = await this.consultAPI(index);
                        var data     = response["data"];

                        const lengthData = Object.keys(data).length;

                        if (lengthData === 0) {
                            statusConsult = false;
                            break;
                        } else {
                            var arrayData = {
                                entityId: data["entityId"],
                                name: data["name"],
                                identificationNumber: data["identificationNumber"],
                                expirationDate: data["expirationDate"],
                                contactName: data["contactName"],
                                contactEmail: data["contactMail"],
                                logo: data["logo"]
                            };

                            this.entities.push(arrayData);
                        }
                    }

                    if (statusConsult) {
                        this.entities.sort((a, b) => {
                            if (a.name < b.name) {
                                return -1;
                            } else if (a.name > b.name) {
                                return 1;
                            } else {
                                return 0;
                            }
                        });

                        statusCode = 200;
                        responseMessage = this.entities;
                    } else {
                        statusCode      = 404;
                        responseMessage = {
                            Error: 'Error en validación datos de entrada'
                        };
                    }
                } else {
                    statusCode      = 400;
                    responseMessage = {
                        Error: 'Error en validación datos de entrada'
                    };
                }
            } else {
                statusCode      = 400;
                responseMessage = {
                    Error: 'Error en validación datos de entrada'
                };
            }
        } else {
            statusCode      = 400;
            responseMessage = {
                Error: 'Error en validación datos de entrada'
            };
        }

        return {
            status  : statusCode,
            response: responseMessage
        };
    }
}

module.exports = EntitiesService;
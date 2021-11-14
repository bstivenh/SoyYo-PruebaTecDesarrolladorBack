const express = require('express');

const EntitiesService = require('./../services/entities.service');

const router  = express.Router();
const service = new EntitiesService();

router.post('/filter', async (request, response) => {
    const body     = request.body;
    const entities = await service.find(body);
    response.status(entities["status"]).json(entities["response"]);
});

module.exports = router;
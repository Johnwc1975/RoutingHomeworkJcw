var express = require('express');
var router = express.Router();

var data = [
    { id: 0, name: "person1", username: "user1" },
    { id: 1, name: "person2", username: "user2" },
    { id: 2, name: "person3", username: "user3" }
];

// GET /api/person
router.get('/person', function(req, res, next) {
    res.status(200).json(data);
});

// GET /api/person/:id
router.get('/person/:id', function(req, res, next) {
    const id = parseInt(req.params.id);
    const person = data.find(person => person.id === id);
    if (!person) {
        return res.status(404).json({ message: 'Person not found' });
    }
    res.status(200).json(person);
});

// POST /api/person
router.post('/person', function(req, res, next) {
    const newPerson = req.body;
    data.push(newPerson);
    res.status(201).json(newPerson);
});

// PUT /api/person/:id
router.put('/person/:id', function(req, res, next) {
    const id = parseInt(req.params.id);
    const updatedPerson = req.body;
    const index = data.findIndex(person => person.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Person not found' });
    }
    data[index] = updatedPerson;
    res.status(200).json(updatedPerson);
});

// DELETE /api/person/:id
router.delete('/person/:id', function(req, res, next) {
    const id = parseInt(req.params.id);
    const index = data.findIndex(person => person.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Person not found' });
    }
    data.splice(index, 1);
    res.status(204).send();
});

module.exports = router;
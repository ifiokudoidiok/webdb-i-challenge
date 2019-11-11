const express = require('express');

// database access using knex
const db = require('./data/dbConfig');

const router = express.Router();

router.get('/', getAllAccounts);
router.get('/:id', getAccountById);
router.post('/', createAccount);
router.put('/:id', editAccount);
router.delete('/:id', deleteAccount);

function getAllAccounts(req, res) {
    db('accounts')
    .then(result => {
        res.json(result);
    })
    .catch(error => {
        res.status(500).json({ message: 'this went wrong: ' + error.message });
      })
}

async function  getAccountById(req, res) {
 try{
     const result = await db('accounts').where({id: req.params.id})
     res.json(result[0]);
 }catch(error){
    res.status(500).json({ message: 'this went wrong: ' + error.message });
 }
}

 function createAccount(req, res) {
    db('accounts').insert({
        name: req.body.name,
        budget: req.body.budget,
    })
    .then(result => {
        res.json(result[0])
    })
    .catch(error => {
        res.status(500).json({ message: 'this went wrong: ' + error.message });
      })
}

function editAccount(req, res) {
    db('accounts').where({id: req.params.id})
    .update({
        name: req.body.name,
        budget: req.body.budget,  
    })
    .then(update => {
        res.json(update)
    })
    .catch(error => {
        res.status(500).json({ message: 'this went wrong: ' + error.message });
      })
}

function deleteAccount(req, res) {
    db('accounts').where({id: req.params.id})
    .del()
    .then(deleted => {
        res.json(deleted)
    })
    .catch(error => {
        res.status(500).json({ message: 'this went wrong: ' + error.message });
      })
}
module.exports = router;
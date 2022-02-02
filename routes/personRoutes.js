const router = require('express').Router()

const Person = require('../models/Person')

// Create - criacao de dados
router.post('/', async (req, res) => {

    // req.body
    const {name, salary, approved} = req.body

    if(!name) {
        res.status(422).json({error: 'O nome eh obrigatorio!!'})
        return
    }

    const person = {
        name,
        salary,
        approved
    }

    try {
        // criando dados
        await Person.create(person)
        
        res.status(201).json({message: 'Pessoa inserida no sistema com suceso!'})
    } catch (error){
        res.status(500).json({error: error})
    }
})
module.exports = router

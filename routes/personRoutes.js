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


// Read - leitura de dados
router.get('/', async (req, res) => {
    try {
        // lendo dados
        const people = await Person.find()

        res.status(200).json(people)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/:id', async (req, res) => {

    //extrair o dado da requisicao, pela url = req.params
    const id = req.params.id

    try {
        const person = await Person.findOne({ _id: id })

        if(!person) {
            res.status(422).json({message: 'O usuario nao foi encontrado!!'})
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

// Update - atualizacao de dados (PUT, PATCH)
router.patch('/:id', async (req, res) => {
    
    const id = req.params.id

    const {name, salary, approved} = req.body

    const person = {
        name, 
        salary,
        approved
    }

    try {
        
        const updatePerson = await Person.updateOne({_id: id}, person)

        if(updatePerson.matchedCount === 0) {
            res.status(422).json({message: 'O usuario nao foi encontrado!!'})
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

// Delete - deletar dados
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    
    const person = await Person.findOne({ _id: id })

    if(!person) {
        res.status(422).json({message: 'O usuario nao foi encontrado!!'})
        return
    }

    try {
        
        await Person.deleteOne({_id: id})

        res.status(200).json({message: 'Usuario removido com sucesso!!'})

    } catch (error) {
        res.status(500).json({error: error})
    }
})

module.exports = router

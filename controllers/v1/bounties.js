// Create router and reference the models
let db = require('../../models')
let router = require('express').Router()

// GET /v1/bounties - Retrieve all bounties in the DB
router.get('/', (rep, res) => {
	db.Bounty.find()
	.then(bounties => {
		res.send(bounties)
	})
	.catch(err => {
		console.log('Error in index route', err)
		res.status(500).send({message: 'Opps?'})
	})
})

// POST /v1/bounties - Create a new bounty
router.post('/', (req, res) => {
	db.Bounty.create(req.body)
	.then(newBounty => {
		res.send(201).send(newBounty)
	})
	.catch(err => {
		console.log('Error creating a bounty', err)
		if (err.name == 'Validation Error') {
			res.status(406).send({ message: 'Validation error'})
		}
		else {
			res.status(503).send({ message: 'Server or Database error'})
		}
	})
})

// PUT /v1/bounties - Bulk update bounties
// TODO: LAB

// GET /v1/bounties/:id - Retrieve a single bounty by its id
router.get('/:id', (req, res) => {
	db.Bounty.findById(req.params.id)
	.then(bounty => {
		res.send(bounty)
	})
	.catch(err => {
		console.log('Error in /:id route', err)
		res.status(500).send({message: 'Ops?'})
	})
})

// DELETE /v1/bounties - Delete ALL bounties
router.delete('/', (req, res) => {
	db.Bounty.deleteMany({})
	.then(() => {
		res.send('All documents deleted')
	})
	.catch(err => {
		console.log('Error in /:id route', err)
		res.status(500).send({message: 'Ops?'})
	})
})

// PUT /v1/bounties/:id - Update a single bounty
router.put('/:id', (req, res) => {
	db.Bounty.findByIdAndUpdate(req.params.id, req.body)
	.then(() => {
		res.send('Bounty updated')
	})
	.catch(err => {
		console.log('Error in /:id route', err)
		res.status(500).send({message: 'Ops?'})
	})
})

// DELETE /v1/bounties/:id - Delete a single bounty
router.delete('/:id', (req, res) => {
	db.Bounty.findByIdAndRemove(req.params.id)
	.then(() =>  {
		res.send('Successfully deleted')
	})
	.catch(err => {
		console.log('Error in /:id route', err)
		res.status(500).send({message: 'Ops?'})
	})
})

// Export the router object and the routes attached to it
module.exports = router

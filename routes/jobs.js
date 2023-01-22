const express = require('express')

const router = express.Router()

// importing Jobs controller
const { createJob, getAllJobs, getJob, updateJob, deleteJob } = require('../controllers/jobs')

// Routers and Routes
router.route('/').post(createJob).get(getAllJobs)
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob)

module.exports = router
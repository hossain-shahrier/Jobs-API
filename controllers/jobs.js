// model
const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}

const getJob = async (req, res) => {
    // Get user info from req params
    const { user: { userId }, params: { id: jobId } } = req

    const job = await Job.findOne({
        _id: jobId,
        createdBy: userId,
    })
    if (!job) {
        throw new NotFoundError(`No job related to ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
}
const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}
const updateJob = async (req, res) => {
    // Get user info from req params
    const {
        body: { company, position },
        user: { userId },
        params: { id: jobId } } = req

    if (company == "" || position == "") {
        throw new BadRequestError('Comapany or Position fields can not be empty')
    }
    // Find Job and Update
    const job = await Job.findOneAndUpdate({
        _id: jobId,
        createdBy: userId
    }, req.body, { new: true, runValidators: true })
    // Job is available or not
    if (!job) {
        throw new NotFoundError(`No job related to ${jobId}`)
    }
    // Send the job
    res.status(StatusCodes.CREATED).json({ job })
}
const deleteJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId } } = req
    const job = await Job.findOneAndRemove({
        _id: jobId,
        createdBy: userId,
    })
    // Job is available or not
    if (!job) {
        throw new NotFoundError(`No job related to ${jobId}`)
    }
    // Send the job
    res.status(StatusCodes.CREATED).send()
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob, deleteJob
}
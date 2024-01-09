var express = require('express');
var router = express.Router();
var JobService=require("../modules/job/jobService")
var Response = require("../responseData/responseData")


router.post('/insertJob',async function (req, res, next) {
  var request=req.body
  var checkedEmail = await JobService.insertJob(request)
  res.json(checkedEmail);
});


router.get('/getJob',async function (req, res, next) {
  var result = await JobService.getJobAll()
  res.json(result);
});


router.post('/filterJob',async function (req, res, next) {
  var request=req.body
  var result = await JobService.filterJob(request)
  res.json(result);
});

router.get('/getJobByID/:id',async function (req, res, next) {
  var id=req.params.id
  var result = await JobService.getJobByID(id)
  res.json(result);
});

router.get('/deleteJobByID/:id',async function (req, res, next) {
  var id=req.params.id
  var result = await JobService.deleteJobByID(id)
  res.json(result);
});


router.post('/updateJobByID',async function (req, res, next) {
  var request=req.body
  var result = await JobService.updateJobByID(request)
  res.json(result);
});


module.exports = router;

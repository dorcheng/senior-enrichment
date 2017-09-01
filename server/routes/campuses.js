const router = require('express').Router();
const { Campus, User } = require('../../db/models');

module.exports = router;

router.get('/', function(req, res, next){
  Campus.findAll()
  .then(campuses => res.json(campuses))
  .catch(next);
});

router.get('/:campusId', function(req, res, next){
  Campus.findOne({
    where: {
      id: req.params.campusId
    },
    include: [{
      all: true,
      nested: true
    }]
  })
  .then(campus => res.json(campus))
  .catch(next);
});

router.post('/', function(req, res, next){
  return Campus.create(req.body)
  .then(newCampus => res.json(newCampus))
  .catch(next);
});

router.put('/:campusId', function(req, res, next){
  Campus.findOne({
    where: {
      id: req.params.campusId
    }
  })
  .then(campus => campus.update({
    name: req.body.name,
    location: req.body.location,
    imageUrl: req.body.imageUrl
  }))
  .then(updatedCampus => res.json(updatedCampus))
  .catch(next);
});

router.delete('/:campusId', function(req, res, next){
  Campus.findOne({
    where: {
      id: req.params.campusId
    }
  })
  .then(campus => campus.destroy())
  .then(() => res.send('Sucessfully deleted campus!'))
  .catch(next);
});

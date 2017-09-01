const router = require('express').Router();
const { Campus, User } = require('../../db/models');

module.exports = router;

router.get('/', function(req, res, next){
  User.findAll({
    include: [{model: Campus, as: 'school'}]
  })
  .then(users => res.json(users))
  .catch(next);
});

router.get('/:studentId', function(req, res, next){
  User.findOne({
    include: [{model: Campus, as: 'school'}],
    where: {
      id: req.params.studentId
    }
  })
  .then(user => res.json(user))
  .catch(next);
});

router.post('/', function(req, res, next){
  User.create(req.body)
  .then(newUser => res.json(newUser))
  .catch(next);
});

router.put('/:studentId', function(req, res, next){
  User.findOne({
    where: {
      id: req.params.studentId
    }
  })
  .then(user => user.update({
    name: req.body.name,
    email: req.body.email,
    campusId: req.body.campusId
  }))
  .then(updatedStudent =>
    User.findOne({
      include: [{model: Campus, as: 'school'}],
      where: {
        id: updatedStudent.id
      }
    })
    .then(nestedUpdatedStudent => res.json(nestedUpdatedStudent))
  )
  .catch(next);
});

router.delete('/:studentId', function(req, res, next){
  User.findOne({
    where: {
      id: req.params.studentId
    }
  })
  .then(user => user.destroy())
  .then(() => res.send('Successfully deleted student!'))
  .catch(next);
});

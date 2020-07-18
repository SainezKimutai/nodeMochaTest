const userService = require('../../services/user.service');
const mailService = require("../../services/mail.service");

exports.login = (req, res, next) => {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(401).json({ message: 'Email or password is incorrect' }))
        .catch(err => next(err));
};

exports.create = (req, res, next) => {
    userService.create(req.body)
        .then(user => user ? res.json(user) : res.status(409).json({ message: 'User already Exists' }))
        .catch(err => next(err));

};

exports.getAll = (req, res, next) => {
    userService.getAll()
        .then(users => { res.json(users); })
        .catch(err => next(err));
};

exports.getOne = (req, res, next) => {
    userService.getOne(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
};

exports.update = (req, res, next) => {
    userService.update(req.params.id, req.body)
        .then((user)=> res.json(user))
        .catch(err => next(err));
};

exports.delete = (req, res, next) => {
    userService.delete(req.params.id)
        .then(()=> res.json({}))
        .catch(err => next(err));
};

exports.invite = (req, res, next) => {
  mailService.inviteUser(req.body)
      .then(e =>res.json({}))
      .catch(err => {res.sendStatus(401); console.log(err)});
  };

exports.emailVerification = (req, res, next) =>{
  userService.getOneByEmail(req.body)
      .then(user => {
        if (user) {
          res.status(409).json({ message: 'User already Exists' })
        } else {
          mailService.sendVerificationEmail({reciever: req.body.email, code:req.body.code})
            .then(e =>res.json({}))
            .catch(err => {res.sendStatus(401); console.log(err)});
        }
      })
      .catch(err => {res.sendStatus(401); console.log(err)});
}

exports.passwordResetCode =(req, res, next) => {
  userService.getOneByEmail(req.body)
      .then(user => {
        if (user) {
          mailService.passwordResetCode({reciever: req.body.email, code:req.body.code})
            .then(e =>res.json({}))
            .catch(err => {res.sendStatus(401); console.log(err)});
        } else {
          res.status(404).json({ message: 'User user do not exist' })
        }
      })
      .catch(err => {res.sendStatus(401); console.log(err)});
}

exports.passwordReset = (req, res, next) =>{
  userService.getOneByEmail(req.body)
      .then(user => {
        if (user) {
          userService.update(user._id, req.body)
              .then((updateUser)=> {
                userService.authenticate({email: req.body.email, password: req.body.unhashedPassword})
                    .then(loggedUser => { res.json(loggedUser) })
                    .catch(err => next(err));
              })
              .catch(err => next(err));
        } else {
          res.status(404).json({ message: 'User user do not exist' })
        }
      })
      .catch(err => {res.sendStatus(401); console.log(err)});
}

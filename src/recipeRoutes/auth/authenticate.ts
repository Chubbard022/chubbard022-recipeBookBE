require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtKey = process.env.JWT_SECRET;

module.exports = {
  authenticate,
  add,
  find,
  findBy,
  findById,
};

function authenticate(request:any, response:any, next:any) {
  const token = process.env.TOKEN;
  const cookie = request.get('Authorization');
  if (token !== '' || cookie !== '') {
    jwt.verify(token, jwtKey, (err: any, decoded: any) => {
      if (err) return response.status(401).json(err);

      request.decoded = decoded;

      next();
    });
  } else {
    return request.status(401).json({
      error: 'No token provided, must be set on the Authorization Header',
    });
  }
}

function find() {
  return db('users').select('id', 'username', 'password');
}

function findBy(filter:any) {
  return db('users').where(filter);
}

async function add(user:any) {
  const [id] = await db('users').insert(user);

  return findById(id);
}

function findById(id:number) {
  return db('users').where({ id }).first();
}

interface Auth{
  request: { get: (arg0: string) => any; decoded: any; }
  response:  { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): any; new(): any; }; }; }
  next: () => void
}
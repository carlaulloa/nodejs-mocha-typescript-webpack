import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as expressMethodOverride from 'express-method-override';
import * as expressValidation from 'express-validation';
import * as cors from 'cors';

import * as swaggerTools from 'swagger-tools';
import * as YAML from 'yamljs';

import { messages } from './configuration/messages';
import { container } from './configuration/di';

import dotenv from 'dotenv';

const ENV = process.env.NODE_ENV || 'development';

if (ENV !== 'production') {
  const PATH_ENV = ENV === 'test' ? `./.env.test` : `./.env`;
  dotenv.load({ path: PATH_ENV });
}

const PORT = process.env.PORT || 7000;

container().cradle.connectToDB
  .then(() => {
    console.log('Connected to database');
  })
  .catch(err => console.log("ERROR", err));

const swaggerDoc = YAML.load('api-docs.yaml');
const swaggerOptions = {
  useStubs: ENV === 'development' ? true : false
};

const app = express();

const router = express.Router();

if (ENV === 'development') {
  app.use(morgan('dev'));
}
app.set('port', PORT);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressMethodOverride('_method'));
app.use(cors());

expressValidation.options({
  allowUnknownBody: false,
  allowUnknownHeaders: false,
  allowUnknownParams: false
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    data: err.data,
    errors: err.errors
  });
});

swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  app.use(middleware.swaggerMetadata());
  app.use(middleware.swaggerValidator());
  app.use(middleware.swaggerRouter(swaggerOptions));
  router.use(middleware.swaggerUi());
});

app.get('/api/data', (req, res) => {
  res.status(200).json({ data: 100 });
});
app.use('/api', router); // route for docs: /api/docs

app.all('*', (req, res) => {
  res.status(404).json({ message: messages.errors.urlNotFound });
});

console.log(__dirname);
//server 
app.listen(app.get('port'), () => {
  console.log(`Listening at port ${app.get('port')}`);
});

export { app };

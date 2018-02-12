import * as awilix from 'awilix';
import { AwilixContainer, asValue, asClass, asFunction } from 'awilix';

/*
  models and controllers are classes
  db is a function to connect to database
  schemas are values of schemas created with mongoose
*/
export function initDI({ db, models, controllers, schemas }): AwilixContainer {
  const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
  });

  const classes = Object.assign({}, models, controllers);
  const keysClasses = Object.keys(classes);
  let asClasses = {};
  for (let key of keysClasses) {
    asClasses[key] = awilix.asClass(classes[key]);
  }

  const values = Object.assign({}, schemas);
  const keyValues = Object.keys(values);
  let asValues = {};
  for (let key of keyValues) {
    asValues[key] = awilix.asValue(values[key]);
  }

  const functions = Object.assign({}, db);
  const keyFuncs = Object.keys(functions);
  let asFunctions = {};
  for (let key of keyFuncs) {
    asFunctions[key] = awilix.asFunction(functions[key]);
  }

  container.register(asClasses);
  container.register(asValues);
  container.register(asFunctions);

  return container;
}
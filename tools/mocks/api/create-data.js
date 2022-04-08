/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv').config();

const port = process.env.API_PORT || 4000;
const apiUrl = `http://localhost:${port}/api`;
const imagesUrl = `http://localhost:${port}/images`;

const path = require('path');
const fs = require('fs');

const films = require('./assets/films.json');
const people = require('./assets/people.json');
const planets = require('./assets/planets.json');
const species = require('./assets/species.json');
const starships = require('./assets/starships.json');
const transport = require('./assets/transport.json');
const vehicles = require('./assets/vehicles.json');

const db = {
  films,
  people,
  planets,
  species,
  starships,
  transport,
  vehicles,
};

/**
 * Lifting the "fields" to the root of the object
 * Using the "pk" as the "id"
 */
const fdb = Object.keys(db).reduce((acc, current) => {
  acc[current] = db[current].map(item => {
    const fields = { ...item.fields };
    if ('image' in fields) fields.image = `${imagesUrl}/${fields.image}`;

    return Object.assign(fields, {
      id: item.pk,
    });
  });

  return acc;
}, {});

/**
 * Vehicles and Starships "extend" Transport...
 */

const xdb = Object.keys(fdb).reduce((acc, current) => {
  if (current === 'starships' || current === 'vehicles') {
    acc[current] = acc[current].map(item => {
      const transport = acc['transport'].find(elm => {
        return elm.id === item.id;
      });

      if (transport) {
        return Object.assign(item, transport);
      }

      return item;
    });
  }
  return acc;
}, fdb);

/**
 * Relation definitions to match them with swapi.co
 * HACK: DO NOT MESS WITH THE ORDER!!!
 */
const relations = [
  {
    name: 'planets',
    relation: [
      {
        alias: 'residents',
        table: 'people',
        name: 'homeworld',
        type: Number,
      },
      {
        alias: 'films',
        table: 'films',
        name: 'planets',
        type: Array,
      },
    ],
  },
  {
    name: 'starships',
    relation: [
      {
        alias: 'films',
        table: 'films',
        name: 'starships',
        type: Array,
      },
    ],
  },
  {
    name: 'people',
    relation: [
      {
        alias: 'vehicles',
        table: 'vehicles',
        name: 'pilots',
        type: Array,
      },
      {
        alias: 'starships',
        table: 'starships',
        name: 'pilots',
        type: Array,
      },
      {
        alias: 'films',
        table: 'films',
        name: 'characters',
        type: Array,
      },
      {
        alias: 'homeworld',
        table: 'planets',
        name: 'id',
        type: 'Self',
      },
    ],
  },
  {
    name: 'films',
    relation: [
      {
        alias: 'starships',
        table: 'starships',
        name: 'id',
        type: 'SelfArray',
      },
      {
        alias: 'vehicles',
        table: 'vehicles',
        name: 'id',
        type: 'SelfArray',
      },
      {
        alias: 'planets',
        table: 'planets',
        name: 'id',
        type: 'SelfArray',
      },
      {
        alias: 'characters',
        table: 'people',
        name: 'id',
        type: 'SelfArray',
      },
      {
        alias: 'species',
        table: 'species',
        name: 'id',
        type: 'SelfArray',
      },
    ],
  },
  {
    name: 'species',
    relation: [
      {
        alias: 'people',
        table: 'people',
        name: 'id',
        type: 'SelfArray',
      },
      {
        alias: 'homeworld',
        table: 'planets',
        name: 'id',
        type: 'Self',
      },
    ],
  },
  {
    name: 'starships',
    relation: [
      {
        alias: 'pilots',
        table: 'people',
        name: 'id',
        type: 'SelfArray',
      },
    ],
  },
  {
    name: 'vehicles',
    relation: [
      {
        alias: 'pilots',
        table: 'people',
        name: 'id',
        type: 'SelfArray',
      },
    ],
  },
];

function addRelation(db, host, relations) {
  return relations.reduce((acc, relation) => {
    const alias = relation.alias;
    const table = relation.table;
    const name = relation.name;

    if (relation.type === 'SelfArray') {
      let ids = [];
      if (host[alias] && Array.isArray(host[alias])) {
        ids = [...host[alias]];
      }

      acc[alias] = db[table]
        .filter(item => ids.includes(item[name]))
        .map(item => {
          return {
            id: item.id,
            name: item.name || item.title,
            link: `${apiUrl}/${table}/${item.id}`,
          };
        });

      return acc;
    }

    if (relation.type === 'Self') {
      const id = host[alias];

      acc[alias] = db[table]
        .filter(item => id === item[name])
        .map(item => {
          return {
            id: item.id,
            name: item.name || item.title,
            link: `${apiUrl}/${table}/${item.id}`,
          };
        })[0];

      return acc;
    }

    if (relation.type === Number) {
      acc[alias] = db[table]
        .filter(item => item[name] === host.id)
        .map(item => {
          return {
            id: item.id,
            name: item.name || item.title,
            link: `${apiUrl}/${table}/${item.id}`,
          };
        });

      return acc;
    }

    acc[alias] = db[table]
      .filter(item => item[name].indexOf(host.id) > -1)
      .map(item => {
        return {
          id: item.id,
          name: item.name || item.title,
          link: `${apiUrl}/${table}/${item.id}`,
        };
      });

    return acc;
  }, {});
}

const relationDb = relations.reduce((acc, current) => {
  acc[current.name] = acc[current.name].map(item => {
    return Object.assign(item, addRelation(acc, item, current.relation));
  });
  return acc;
}, xdb);

const dir = path.join(__dirname, 'data');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const dataPath = path.join(__dirname, 'data', 'db.json');
fs.writeFile(dataPath, JSON.stringify(relationDb), () => {
  console.log('MockApi: Data created successfully!');
});

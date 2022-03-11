require('dotenv').config();
const { CONNECTION_STRING } = process.env;
const { INTEGER } = require('sequelize');
const Sequelize = require('sequelize');
const db = new Sequelize(CONNECTION_STRING, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  getCountries: async (req, res) => {
    try {
      const response = await db.query(`
                SELECT * FROM countries;
            `);
      res.status(200).send(response[0]);
    } catch (error) {
      console.log('getCountries Error ', error);
    }
  },
  createCity: async (req, res) => {
    console.log(req.body);
    try {
      const { name, rating, countryId } = req.body;
      const response = await db.query(
        `
            INSERT INTO cities (name, rating, country_id)
            VALUES('${name}', ${rating}, ${countryId});
          `
      );
      res.status(200).send(response[0]);
    } catch (error) {
      console.log('createCity ', error);
    }
  },
  getCities: async (req, res) => {
    try {
      const response = await db.query(`
        SELECT cities.name AS city, cities.city_id AS city_id, cities.rating, countries.country_id as country_id, countries.name AS country
        FROM cities
        JOIN countries ON countries.country_id = cities.country_id 
        ORDER BY cities.rating DESC;
        ;
    `);
      res.status(200).send(response[0]);
    } catch (error) {
      console.log('getCities Error', error);
    }
  },
  deleteCity: async (req, res) => {
    try {
      const response = await db.query(
        `DELETE FROM cities WHERE city_id = ${req.params.id}`
      );
      res.status(200).send(response[0]);
    } catch (error) {
      console.log('deleteCity Error ', error);
    }
  },
  seed: (req, res) => {
    db.query(
      `
            drop table if exists cities;
            drop table if exists countries;

            create table countries (
                country_id serial primary key, 
                name varchar
            );

            CREATE TABLE cities(
              city_id SERIAL PRIMARY KEY,
              name VARCHAR(255),
              rating INTEGER,
              country_id INTEGER REFERENCES countries(country_id)  
            );

            insert into countries (name)
            values ('Afghanistan'),
            ('Albania'),
            ('Algeria'),
            ('Andorra'),
            ('Angola'),
            ('Antigua and Barbuda'),
            ('Argentina'),
            ('Armenia'),
            ('Australia'),
            ('Austria'),
            ('Azerbaijan'),
            ('Bahamas'),
            ('Bahrain'),
            ('Bangladesh'),
            ('Barbados'),
            ('Belarus'),
            ('Belgium'),
            ('Belize'),
            ('Benin'),
            ('Bhutan'),
            ('Bolivia'),
            ('Bosnia and Herzegovina'),
            ('Botswana'),
            ('Brazil'),
            ('Brunei'),
            ('Bulgaria'),
            ('Burkina Faso'),
            ('Burundi'),
            ('Côte d''Ivoire'),
            ('Cabo Verde'),
            ('Cambodia'),
            ('Cameroon'),
            ('Canada'),
            ('Central African Republic'),
            ('Chad'),
            ('Chile'),
            ('China'),
            ('Colombia'),
            ('Comoros'),
            ('Congo'),
            ('Costa Rica'),
            ('Croatia'),
            ('Cuba'),
            ('Cyprus'),
            ('Czech Republic'),
            ('Democratic Republic of the Congo'),
            ('Denmark'),
            ('Djibouti'),
            ('Dominica'),
            ('Dominican Republic'),
            ('Ecuador'),
            ('Egypt'),
            ('El Salvador'),
            ('Equatorial Guinea'),
            ('Eritrea'),
            ('Estonia'),
            ('Eswatini'),
            ('Ethiopia'),
            ('Fiji'),
            ('Finland'),
            ('France'),
            ('Gabon'),
            ('Gambia'),
            ('Georgia'),
            ('Germany'),
            ('Ghana'),
            ('Greece'),
            ('Grenada'),
            ('Guatemala'),
            ('Guinea'),
            ('Guinea-Bissau'),
            ('Guyana'),
            ('Haiti'),
            ('Holy See'),
            ('Honduras'),
            ('Hungary'),
            ('Iceland'),
            ('India'),
            ('Indonesia'),
            ('Iran'),
            ('Iraq'),
            ('Ireland'),
            ('Israel'),
            ('Italy'),
            ('Jamaica'),
            ('Japan'),
            ('Jordan'),
            ('Kazakhstan'),
            ('Kenya'),
            ('Kiribati'),
            ('Kuwait'),
            ('Kyrgyzstan'),
            ('Laos'),
            ('Latvia'),
            ('Lebanon'),
            ('Lesotho'),
            ('Liberia'),
            ('Libya'),
            ('Liechtenstein'),
            ('Lithuania'),
            ('Luxembourg'),
            ('Madagascar'),
            ('Malawi'),
            ('Malaysia'),
            ('Maldives'),
            ('Mali'),
            ('Malta'),
            ('Marshall Islands'),
            ('Mauritania'),
            ('Mauritius'),
            ('Mexico'),
            ('Micronesia'),
            ('Moldova'),
            ('Monaco'),
            ('Mongolia'),
            ('Montenegro'),
            ('Morocco'),
            ('Mozambique'),
            ('Myanmar'),
            ('Namibia'),
            ('Nauru'),
            ('Nepal'),
            ('Netherlands'),
            ('New Zealand'),
            ('Nicaragua'),
            ('Niger'),
            ('Nigeria'),
            ('North Korea'),
            ('North Macedonia'),
            ('Norway'),
            ('Oman'),
            ('Pakistan'),
            ('Palau'),
            ('Palestine State'),
            ('Panama'),
            ('Papua New Guinea'),
            ('Paraguay'),
            ('Peru'),
            ('Philippines'),
            ('Poland'),
            ('Portugal'),
            ('Qatar'),
            ('Romania'),
            ('Russia'),
            ('Rwanda'),
            ('Saint Kitts and Nevis'),
            ('Saint Lucia'),
            ('Saint Vincent and the Grenadines'),
            ('Samoa'),
            ('San Marino'),
            ('Sao Tome and Principe'),
            ('Saudi Arabia'),
            ('Senegal'),
            ('Serbia'),
            ('Seychelles'),
            ('Sierra Leone'),
            ('Singapore'),
            ('Slovakia'),
            ('Slovenia'),
            ('Solomon Islands'),
            ('Somalia'),
            ('South Africa'),
            ('South Korea'),
            ('South Sudan'),
            ('Spain'),
            ('Sri Lanka'),
            ('Sudan'),
            ('Suriname'),
            ('Sweden'),
            ('Switzerland'),
            ('Syria'),
            ('Tajikistan'),
            ('Tanzania'),
            ('Thailand'),
            ('Timor-Leste'),
            ('Togo'),
            ('Tonga'),
            ('Trinidad and Tobago'),
            ('Tunisia'),
            ('Turkey'),
            ('Turkmenistan'),
            ('Tuvalu'),
            ('Uganda'),
            ('Ukraine'),
            ('United Arab Emirates'),
            ('United Kingdom'),
            ('United States of America'),
            ('Uruguay'),
            ('Uzbekistan'),
            ('Vanuatu'),
            ('Venezuela'),
            ('Vietnam'),
            ('Yemen'),
            ('Zambia'),
            ('Zimbabwe');

            INSERT INTO cities (name, rating, country_id)
            VALUES('Manila', 4, 139),
            ('Salt Lake City', 5, 187),
            ('Chicago', 3, 187);
        `
    )
      .then(() => {
        console.log('DB seeded!');
        res.sendStatus(200);
      })
      .catch((err) => console.log('error seeding DB', err));
  },
};

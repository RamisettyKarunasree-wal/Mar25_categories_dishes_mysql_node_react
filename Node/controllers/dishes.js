const connector = require('../connect');
const createDishesTable = (req, res) => {
  var sql =
    'create table dishes(name varchar(100) NOT NULL UNIQUE,description text,id int NOT NULL AUTO_INCREMENT,category int,price int,PRIMARY KEY(id),FOREIGN KEY (category) REFERENCES categories(id))';
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
};

const getDishes = (req, res) => {
  var sql = 'select * from dishes';
  connector.query(sql, function (err, results) {
    res.json({ err, results });
  });
};
const viewDish = (req, res) => {
  var sql = `select * from dishes where name=?`;
  connector.query(sql, [req.params.name], function (err, results) {
    res.json({ err, results });
  });
};
const postDishes = (req, res) => {
  const { name, description, category, price } = req.body;
  var sql = `insert into dishes (name,description,category,price) values (?,?,?,?)`;
  connector.query(
    sql,
    [name, description, category, price],
    function (err, results, fields) {
      res.json({ err, results, fields });
    }
  );
};
const deleteDishes = (req, res) => {
  let sql;
  if (req.params.name === 'deleteAll') {
    sql = 'truncate table dishes';
  } else {
    sql = `delete from dishes where name=?`;
  }
  connector.query(sql, [req.params.name], function (err, results, fields) {
    res.json({ err, results, fields });
  });
};
const updateDishes = (req, res) => {
  console.log(req.params.name);
  const { name, description, category, price } = req.body;
  var sql = `update dishes set name=?, description=?, category=?, price=? where name=?`;
  connector.query(
    sql,
    [name, description, category, price, req.params.name],
    function (err, results, fields) {
      res.json({ err, results, fields });
    }
  );
};
module.exports = {
  getDishes,
  postDishes,
  deleteDishes,
  updateDishes,
  createDishesTable,
  viewDish,
};

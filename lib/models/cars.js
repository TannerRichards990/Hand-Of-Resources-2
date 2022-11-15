const pool = require('../utils/pool');

class Car {
  id;
  brand;
  model;

  constructor({ id, brand, model }) {
    this.id = id;
    this.brand = brand;
    this.model = model;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM cars');
    return rows.map(row => new Car(row));
  }

  static async getByID(id) {
    const { rows } = await pool.query('SELECT * FROM cars WHERE id=$1', [id]);
    if (!rows[0]) return null;
    return new Car(rows[0]);
  }

  static async insert({ brand, model }) {
    const { rows } = await pool.query(
      'INSERT INTO cars (brand, model) VALUES ($1, $2) RETURNING *',
      [brand, model]);
    return new Car(rows[0]);
  }

  static async updateByID(id, update) {
    const oldCar = await Car.getByID(id);
    const newCar = { ...oldCar, ...update };
    const { rows } = await pool.query(
      `UPDATE cars
  SET brand=$1, model=$2
  WHERE id=$3
  RETURNING *`,
      [newCar.brand, newCar.model, id]
    );
    return new Car(rows[0]);
  }

  static async deleteByID(id) {
    const { rows } = await pool.query(
      'DELETE FROM cars WHERE id=$1 RETURNING *',
      [id]
    );
    return new Car(rows[0]);
  }

}

module.exports = Car; 

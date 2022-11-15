const pool = require('../utils/pool');

class Food {
  id;
  name;
  healthy;

  constructor({ id, name, healthy }) {
    this.id = id;
    this.name = name;
    this.healthy = healthy;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM food');
    return rows.map(row => new Food(row));
  }

  static async getByID(id) {
    const { rows } = await pool.query('SELECT * FROM food WHERE id=$1', [id]);
    if (!rows[0]) return null;
    return new Food(rows[0]);
  }

  static async insert({ name, healthy }) {
    const { rows } = await pool.query(
      'INSERT INTO food (name, healthy) VALUES ($1, $2) RETURNING *',
      [name, healthy]);
    return new Food(rows[0]);
  }

  static async updateByID(id, update) {
    const oldFood = await Food.getByID(id);
    const newFood = { ...oldFood, ...update };
    const { rows } = await pool.query(
      `UPDATE food
  SET name=$1, healthy=$2
  WHERE id=$3
  RETURNING *`,
      [newFood.name, newFood.healthy, id]
    );
    return new Food(rows[0]);
  }

  static async deleteByID(id) {
    const { rows } = await pool.query(
      'DELETE FROM food WHERE id=$1 RETURNING *',
      [id]
    );
    return new Food(rows[0]);
  }   
}

module.exports = Food;

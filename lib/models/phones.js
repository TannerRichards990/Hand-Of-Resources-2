const pool = require('../utils/pool');

class Phone {
  id;
  brand;
  model;

  constructor({ id, brand, model }) {
    this.id = id;
    this.brand = brand;
    this.model = model;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM phones');
    return rows.map(row => new Phone(row));
  }

  static async getByID(id) {
    const { rows } = await pool.query('SELECT * FROM phones WHERE id=$1', [id]);
    if (!rows[0]) return null;
    return new Phone(rows[0]);
  }

  static async insert({ brand, model }) {
    const { rows } = await pool.query(
      'INSERT INTO phones (brand, model) VALUES ($1, $2) RETURNING *',
      [brand, model]);
    return new Phone(rows[0]);
  }

  static async updateByID(id, update) {
    const oldPhone = await Phone.getByID(id);
    const newPhone = { ...oldPhone, ...update };
    const { rows } = await pool.query(
      `UPDATE phones
  SET brand=$1, model=$2
  WHERE id=$3
  RETURNING *`,
      [newPhone.brand, newPhone.model, id]
    );
    return new Phone(rows[0]);
  } 

  static async deleteByID(id) {
    const { rows } = await pool.query(
      'DELETE FROM phones WHERE id=$1 RETURNING *',
      [id]
    );
    return new Phone(rows[0]);
  }
}

module.exports = Phone;

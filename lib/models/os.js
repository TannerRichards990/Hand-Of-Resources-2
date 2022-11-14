const pool = require('../utils/pool');

class OS {
  id;
  name;
  easy;

  constructor({ id, name, easy }) {
    this.id = id;
    this.name = name;
    this.easy = easy;
  }


  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM os');
    return rows.map(row => new OS(row));
  }

  static async getByID(id) {
    const { rows } = await pool.query('SELECT * FROM os WHERE id=$1', [id]);
    if (!rows[0]) return null;
    return new OS(rows[0]);
  }

  static async insert({ name, easy }) {
    const { rows } = await pool.query(
      'INSERT INTO os (name, easy) VALUES ($1, $2) RETURNING *',
      [name, easy]);
    return new OS(rows[0]);
  }

  static async updateByID(id, update) {
    const oldOS = await OS.getByID(id);
    const newOS = { ...oldOS, ...update };
    const { rows } = await pool.query(
      `UPDATE os
  SET name=$1, easy=$2
  WHERE id=$3
  RETURNING *`,
      [newOS.name, newOS.easy, id]
    );
    return new OS(rows[0]);
  }

  static async deleteByID(id) {
    const { rows } = await pool.query(
      'DELETE FROM os WHERE id=$1 RETURNING *',
      [id]
    );
    return new OS(rows[0]);
  }

}

module.exports = OS;


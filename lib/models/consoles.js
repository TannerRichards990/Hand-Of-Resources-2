const pool = require('../utils/pool');

class Console {
  id;
  name;
  released;

  constructor({ id, name, released }) {
    this.id = id;
    this.name = name;
    this.released = released;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM consoles');
    return rows.map(row => new Console(row));
  }

  static async getByID(id) {
    const { rows } = await pool.query('SELECT * FROM consoles WHERE id=$1', [id]);
    if (!rows[0]) return null;
    return new Console(rows[0]);
  }

  static async insert({ name, released }) {
    const { rows } = await pool.query(
      'INSERT INTO consoles (name, released) VALUES ($1, $2) RETURNING *',
      [name, released]);
    return new Console(rows[0]);
  }

  static async updateByID(id, update) {
    const oldConsole = await Console.getByID(id);
    const newConsole = { ...oldConsole, ...update };
    const { rows } = await pool.query(
      `UPDATE consoles
  SET name=$1, released=$2
  WHERE id=$3
  RETURNING *`,
      [newConsole.name, newConsole.released, id]
    );
    return new Console(rows[0]);
  }

  static async deleteByID(id) {
    const { rows } = await pool.query(
      'DELETE FROM consoles WHERE id=$1 RETURNING *',
      [id]
    );
    return new Console(rows[0]);
  }
}

module.exports = Console;




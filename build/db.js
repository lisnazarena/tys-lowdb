import { JSONFile } from 'lowdb/node';
import { Low } from 'lowdb';
let db;
export const createConnection = () => {
    const adapter = new JSONFile('db.json');
    const defaultData = { tasks: [] };
    db = new Low(adapter, defaultData);
    db.data = defaultData;
    db.write();
    console.log(db.data);
};
export const getConnection = () => db;

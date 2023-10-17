import { JSONFile } from 'lowdb/node';
import { Low } from 'lowdb';

type Tasks = {
    id: string;
    name: string;
    description: string;


}

type Schema = {
    tasks: Tasks[]
}

let db: Low<Schema>;

export const createConnection = () => {
    const adapter = new JSONFile<Schema>('db.json');
    const defaultData = { tasks: [] };
    db = new Low(adapter, defaultData);
    db.data = defaultData;
    db.write();
    console.log(db.data);


}

export const getConnection = () => db;

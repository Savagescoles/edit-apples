import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (id, content) => {
  console.log('putDb implemented');
// connects to DB
  const contactDb = await openDB('jate', 1);
// creates transaction 
  const tx = contactDb.transaction('jate', 'readwrite');
  // open the store
  const store = tx.objectStore('jate');
// use put method on the store
  const request = store.put({ id: id, content: content});

  const result = await request;
  console.log('data changed in the database', result);
};

export const getDb = async () => {
  console.log('getDb implemented');
// connects to DB
  const contactDb = await openDB('jate', 1);
// creates transaction 
  const tx = contactDb.transaction('jate', 'readonly');
  // open the store
  const store = tx.objectStore('jate');
// use put method on the store
  const request = store.getAll();

  const result = await request;
  console.log('Here is your request!', result);
};

initdb();
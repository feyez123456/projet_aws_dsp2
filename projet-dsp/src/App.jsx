import React, { useState, useEffect } from 'react';
import './App.css';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';
import {listVoyages} from './graphql/queries'
import {updateVoyage} from './graphql/mutations'
import {createVoyage} from './graphql/mutations'
import {deleteVoyage} from './graphql/mutations'

Amplify.configure(awsExports);

function App() {
  const [voyages, setVoyages] = useState([]);
  const [newVoyagePlace, setNewVoyagePlace] = useState('');
  const [newVoyageNotes, setNewVoyageNotes] = useState([]);
  const [newVoyageRating, setNewVoyageRating] = useState(0);

  const fetchVoyage = async () => {
    try {
      const voyageData = await API.graphql(graphqlOperation(listVoyages));
      const listVoyage = voyageData.data.listVoyages.items;
      setVoyages(listVoyage);
    } catch (error) {
      console.log('error on fetching voyages', error);
    }
  }

  const addVoyage = async () => {
    try {
      const newVoyage = {
        place: newVoyagePlace,
        notes: newVoyageNotes,
        rating: newVoyageRating,
      };
      await API.graphql(graphqlOperation(createVoyage, { input: newVoyage }));
      fetchVoyage();
      setNewVoyagePlace('');
      setNewVoyageNotes([]);
      setNewVoyageRating(0);
    } catch (error) {
      console.log('error on adding voyage', error);
    }
  }

  const deleteVoyageItem = async (id) => {
    try {
      await API.graphql(graphqlOperation(deleteVoyage, { input: { id } }));
      fetchVoyage();
    } catch (error) {
      console.log('error on deleting voyage', error);
    }
  }

  const updateVoyageItem = async (id, updatedData) => {
    try {
      await API.graphql(graphqlOperation(updateVoyage, { input: { id, ...updatedData } }));
      fetchVoyage();
    } catch (error) {
      console.log('error on updating voyage', error);
    }
  }

  useEffect(() => {
    fetchVoyage()
  }, []);

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <div className="App">
            <header className="App-header">
              <button onClick={signOut}>Sign out</button>
              <h2>Travel Board</h2>
            </header>
            <div className="voyageList">
              {voyages.map((voyage) => {
                return (
                  <div key={voyage.id} className="voyageItem">
                    <h1>{voyage.place}</h1>
                    <p>Notes: {voyage.notes ? voyage.notes.join(', ') : 'N/A'}</p>
                    <p>Rating: {voyage.rating ? voyage.rating : 'N/A'}</p>
                    <button onClick={() => deleteVoyageItem(voyage.id)}>Delete</button>
                    <button onClick={() => updateVoyageItem(voyage.id, { place: 'Updated Place', notes: ['Updated Note'], rating: 5 })}>Update</button>
                  </div>
                );
              })}
            </div>
            <div className="addVoyageForm">
              <h2>Add a New Trip</h2>
              <input
                type="text"
                placeholder="Place"
                value={newVoyagePlace}
                onChange={(e) => setNewVoyagePlace(e.target.value)}
              />
              <input
                type="text"
                placeholder="Notes (comma-separated)"
                value={newVoyageNotes.join(', ')}
                onChange={(e) => setNewVoyageNotes(e.target.value.split(', '))}
              />
              <input
                type="number"
                placeholder="Rating"
                value={newVoyageRating}
                onChange={(e) => setNewVoyageRating(parseInt(e.target.value))}
              />
              <button onClick={addVoyage}>Add Trip</button>
            </div>
          </div>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
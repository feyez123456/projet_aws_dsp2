import React, { useEffect, useState } from 'react';
import './App.css';
import { API, Amplify, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import { listVoyages } from './graphql/queries';
Amplify.configure(awsExports);





// ... TravelEntry, PhotoGallery, and Notes components as before ...

function App() {

  const [voyages, setVoyages] = useState([]);

  const fetchVoyage = async () => {
    try {
      const voyageData = await API.graphql(graphqlOperation(listVoyages));
      const listVoyage = voyageData.data.listVoyages.items;
      console.log(listVoyage);
      setVoyages(voyageData);
    } catch (error) {
      console.log('error on fetching songs',error);
    }
  }

  useEffect(() => {
    fetchVoyage()
  }, [])
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
               </div>
          </div>
        </main>
      )}
    </Authenticator>
  );
}

export default withAuthenticator(App);

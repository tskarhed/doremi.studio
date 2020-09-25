import React, { useState } from 'react';
import { Page } from './Page';
import { Login } from '../firebase/auth/AuthUI';
import { db } from '../firebase/firebase';
import { ProfileForm, FormDTO } from '../firebase/auth/ProfileForm';
import { firestore } from 'firebase';
import ShortUId from 'short-unique-id';
import { useHistory } from 'react-router-dom';

interface NewUser {
  displayName: string;
  shortId: string;
}

export const LoginView = () => {
  const [showMissingFields, setShowMissingFields] = useState(false);
  const [userId, setUserId] = useState();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [redirect, setRedirect] = useState('/');
  let history = useHistory();

  console.log(userId);

  const handleLogin = async (authResult: any, redirectUrl: string) => {
    setUserId(authResult.user.uid);
    setRedirect(redirectUrl);

    if (authResult.user.displayName) {
      setDisplayName(authResult.user.displayName);
    }

    if (authResult.user.email) {
      setEmail(authResult.user.email);
    }

    console.log(authResult, redirectUrl);

    const userDoc = await db.collection('users').doc(authResult.user.uid).get();
    if (userDoc.exists) {
      history.push(redirect);
      console.log('User exists in DB');
    } else {
      setShowMissingFields(true);
    }
  };

  const registerNewUser = async (form: FormDTO) => {
    console.log(userId);
    const uid = new ShortUId();
    await db.collection('users').doc(userId).set({
      displayName,
      email,
      shortUID: uid(),
      createdAt: firestore.Timestamp.now(),
    });
    console.log('User successfully created!');
    history.push(redirect);
  };

  return (
    <Page title="Login" editable={false} noHeader={true}>
      <div
        style={{
          textAlign: 'center',
          display: 'flex',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          // padding: '5%',
        }}
      >
        <p>Log in or continue anonymously</p>
        <Login afterLogin={handleLogin} />
        {showMissingFields && (
          <ProfileForm
            initialValues={{ displayName }}
            onSubmit={registerNewUser}
          />
        )}
      </div>
    </Page>
  );
};

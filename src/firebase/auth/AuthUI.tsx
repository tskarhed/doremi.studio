
import React, { FC } from 'react';
import "react-firebaseui";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {uiConfig, auth} from '../firebase';




interface LoginProps {
  /**
   * Runs after user has been authenticated. Good to check user fields before going further into the application.
   * Function being run in Firebase4 UIs signInSuccessWithAuthResult.
   */
  afterLogin: (authResult: any, redirectUrl: string) => void; 
}

export const Login: FC<LoginProps> = ({afterLogin}) => {

  uiConfig.callbacks.signInSuccessWithAuthResult = (authResult: any, redirectUrl: any) => {
    afterLogin(authResult, redirectUrl);
    return false;
  };

  return (
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
  );
};

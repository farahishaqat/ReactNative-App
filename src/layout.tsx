import PublicNavigator, {PrivateNavigation} from './navigation/routes';

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

const Layout = () => {
  return (
    <NavigationContainer>
      {/* 

                if user is logged in ?
                     <PrivateNavigation /> 
                    :
                     <PublicNavigator />
            */}
  


      <PublicNavigator />
      {/* <PrivateNavigation /> */}
    </NavigationContainer>
  );
};

export default Layout;

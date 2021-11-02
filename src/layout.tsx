import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import PublicNavigator, { PrivateNavigation } from './navigation/routes';

const Layout = () => {
    return (
        <NavigationContainer>
            {/* 
                * Stack navigation ? 
                * bottom tab navigation
                * Drawer
            */}
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
}

export default Layout;
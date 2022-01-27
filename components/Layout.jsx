import React, { Children } from 'react';
import {Header} from './';

const Layout = ({ children}) => {
  return (
      <React.Fragment>
          <Header />
          {children}
      </React.Fragment>
  );
};

export default Layout;

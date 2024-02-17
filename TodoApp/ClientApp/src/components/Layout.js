import React from 'react';

const Layout = (props) => {
    return (
      <div className="container d-flex flex-column gap-3 justify-content-center align-items-center">{props.children}</div>
    );
}

export default Layout;

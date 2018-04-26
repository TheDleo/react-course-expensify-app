import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => {
    return (
        <div>
            <h1>Info</h1>
            <p> The info is: {props.info}</p>
        </div>
    );
};

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info.</p>}
            <WrappedComponent {...props} />
        </div>
    );
};

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? (<WrappedComponent {...props} />) : (<p>Please log in to view the info</p>)}
        </div>
    );
};

const AdminWarning = withAdminWarning(Info);
const AuthWarning = requireAuthentication(AdminWarning);

// ReactDOM.render(<AdminWarning isAdmin={true} info="this is the data"/>, document.getElementById('app'));
ReactDOM.render(<AuthWarning isAuthenticated={false} info="this is the data"/>, document.getElementById('app'));
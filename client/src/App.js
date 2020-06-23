import React, { Fragment, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import './theme-1.css';
import './App.css';
import Aboutme from './components/Aboutme';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Bloglist from './components/Bloglist';
import Footer from './components/layout/Footer';
import Alert from './components/layout/Alert';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Protectedroute from './components/routing/Protectedroute';
import CreatePost from './components/CreatePost';
import Post from './components/Post';
//Redux

import setAuthToken from './utils/setAuthToken';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Fragment>
        <Router>
          <Sidebar />
          <div className='main-wrapper'>
            <Route exact path='/' component={Bloglist} />
            <Alert />
            <Switch>
              <Route exact path='/about' component={Aboutme} />

              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/posts/:id' component={Post} />
              <Protectedroute
                exact
                path='/create-post'
                component={CreatePost}
              />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Fragment>
    </Provider>
  );
}

export default App;

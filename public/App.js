import React                    from 'react';
import {Link}                   from 'react-router';
import {connect}                from 'react-redux';
import {bindActionCreators}     from 'redux';
import * as UserActions         from './actions/userActions';
import './sass/app-root.scss';



const App = React.createClass({
  componentWillMount: function() {
    this.actions = bindActionCreators(UserActions,this.props.dispatch)
    this.actions.authenticate();
  },
  render () {
    let {userStore} = this.props;
    let {profile} = this.props.userStore;


    if(userStore.authenticationError){
      return (
        <h1 className="error-message">Failed To Authenticate</h1>
      )
    }

    if(!profile.user){
      return (
        <div className="loader"/>
      )
    }


    return (
      <div className="app-root">
        <div className="profile-container">
          {
            profile.user.photos.length>0?
              <img className="profile-picture" src={profile.user.photos[0].url}/>
            :
              <span>no photos</span>
          }
        </div>
        <div className="links-container">
          <Link to="/">
            <div className="link">Swipes</div>
          </Link>
          <Link to="/matches">
            <div className="link">Matches</div>
          </Link>
        </div>
        <section className="child-route">
          {this.props.children}
        </section>
      </div>
    )
  }
});


export default connect(state => { return {userStore : state.user.toJS()} })(App);

import React, { PropTypes }               from 'react'
import {connect}                          from 'react-redux';
import {bindActionCreators}               from 'redux';
import * as TinderActions                 from '../actions/tinderActions';
import Profile                            from '../components/Profile';
import '../sass/matchesPage.scss';


const MatchesPage = React.createClass({
  componentWillMount() {
    this.actions = bindActionCreators(TinderActions, this.props.dispatch);
  },
  componentDidMount: function() {
    this.actions.getHistory();
  },
  render () {
    let {tinderStore} = this.props;
    return (
      <div className="matches-page">
        <div className="profiles">
          {
            tinderStore.matches.map(profile=>
              <Profile key={profile._id} profile={profile}/>
            )
          }
        </div>
      </div>
    )
  }
})

export default connect(state => { return {tinderStore : state.tinder.toJS()} })(MatchesPage);

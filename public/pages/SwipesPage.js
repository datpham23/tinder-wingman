import React, { PropTypes }               from 'react'
import {connect}                          from 'react-redux';
import {bindActionCreators}               from 'redux';
import * as TinderActions                 from '../actions/tinderActions';
import Profile                            from '../components/Profile';
import '../sass/swipesPage.scss';
import '../sass/components/switch.scss';

const SwipesPage = React.createClass({
  componentWillMount() {
    this.actions = bindActionCreators(TinderActions, this.props.dispatch);
  },
  componentDidMount() {
    this.actions.getState();
    this.actions.getSwipes();
    this.actions.openSockets();
    document.addEventListener('scroll', this.onScrollBottom);
  },
  componentWillUnmount() {
    document.removeEventListener('click', this.onScrollBottom, false);
  },
  onScrollBottom(event){
    if(document.body.scrollHeight == document.body.scrollTop + window.innerHeight) {
      this.actions.getSwipes();
    }
  },
  render () {
    let {tinderStore} = this.props;
    return (
      <div className="swipes-page">
        <div className="switch-container">
          <input className="switch-input"
            type="checkbox"
            id="swipeSwitch"
            checked={tinderStore.isSwiping}/>
          <label className="switch-label" for="swipeSwitch" onClick={this.actions.toggleSwiping}></label>
          <div className="description">Auto Swipe</div>
        </div>

        <div className="profiles">
          {
            tinderStore.profiles.map(profile=>{
              return <Profile key={profile._id} profile={profile}/>
            })
          }
        </div>
      </div>
    )
  }
})

export default connect(state => { return {tinderStore : state.tinder.toJS()} })(SwipesPage);

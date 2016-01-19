import React, { PropTypes }               from 'react'
import {connect}                          from 'react-redux';
import {bindActionCreators}               from 'redux';
import * as UserActions                   from '../actions/userActions';
import {GoogleMapLoader,
        GoogleMap,
        Marker}                           from "react-google-maps";
import '../sass/settingsPage.scss';


const SettingsPage = React.createClass({
  componentWillMount() {
    this.actions = bindActionCreators(UserActions, this.props.dispatch);
  },
  componentDidMount: function() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 10
    });

    var myLatlng = new google.maps.LatLng(-25.363882,131.044922);

    var marker = new google.maps.Marker({
        position: myLatlng,
        title:"Hello World!"
    });


  },
  render () {
    let {userStore} = this.props;
    let user = userStore.profile.user;

    return (
      <div className="settings-page">
        <div className="row">
          <div className="col-md-2">
            <div className="form-group">
              <label>Min Age</label>
              <input
                className="form-control input-sm"
                type="text"
                placeholder="Min Age"
                value={user.age_filter_min}
                maxLength="2"
                onChange={this.onFormUpdate}
                ref="eventTagName"/>
            </div>
            <div className="form-group">
              <label>Max Age</label>
              <input
                className="form-control input-sm"
                type="text"
                placeholder="Max Age"
                value={user.age_filter_max}
                maxLength="2"
                onChange={this.onFormUpdate}
                ref="eventTagName"/>
            </div>
            <div className="form-group">
              <label>Gender</label>
              <div class="radio">
                <label>
                  <input type="radio" name="gender-selection" id="optionsRadios1" value='1' checked={user.gender_filter == 1}/>
                  FEMALE
                </label>
              </div>
              <div class="radio">
                <label>
                  <input type="radio" name="optionsRadios" id="optionsRadios2" value="0" checked={user.gender_filter == 0}/>
                  MALE
                </label>
              </div>
            </div>
          </div>
          <div className="col-md-10">
            <div id="map" className="map"/>
          </div>
        </div>
      </div>
    )
  }
})

export default connect(state => { return {userStore : state.user.toJS()} })(SettingsPage);

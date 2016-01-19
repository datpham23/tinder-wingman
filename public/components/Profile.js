import React            from 'react'
import {
        Carousel,
        CarouselItem
      }                from 'react-bootstrap';
import '../sass/components/profile.scss';


const Profile = React.createClass({
  render () {
    let {profile} = this.props;
    return (
      <div className="profile">
        <Carousel>
          {
            profile.photos.length>0?
              profile.photos.map(photo=>{
                return (
                  <CarouselItem key={photo.url}>
                    <img width={250} height={250} alt="250x250" src={photo.url}/>
                  </CarouselItem>
                )
              })
            :
              null
          }
        </Carousel>
        <div className="name">{profile.name}</div>
        <div className="mutual-friends-count">{profile.common_friend_count}</div>
      </div>
    )
  }
})

export default Profile

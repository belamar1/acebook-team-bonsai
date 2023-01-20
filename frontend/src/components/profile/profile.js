import React, { useEffect, useState } from 'react'
import profile_placeholder from './profile_placeholder.jpeg';
import Card from '../Helpers/Card.js';
import './profile.css';
import Feed from '../feed/Feed'
import { useParams } from 'react-router-dom';
import coverPhoto from './cover-photo.jpg';
import '../../index.css';

const Profile = () => {

  const { id } = useParams();
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  const [user, setUser] = useState([]);
  const userId = window.localStorage.getItem('user_id');
  const userName = window.localStorage.getItem('user_name');
  const friendsList = window.localStorage.getItem('friends_list');
  const age = window.localStorage.getItem('age');

  useEffect(() => {
    if (token) {
      fetch('/users/' + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem('token', data.token);
          setToken(window.localStorage.getItem('token'));
          setUser(data.user);
          // console.log(data.user.name);
          // console.log(data.user.age)
        });
    }
    // eslint-disable-next-line
  }, []);


  const profileMatch = user._id === userId;


  const handleAddFriend = () => {
    // Pushes Eliza into Bill's friends list:
    user.friends.push(userName);
    // Pushed Bill into Eliza's friends list:
    const friendsArray = friendsList.split(',');
    friendsArray.push(user.name);
    console.log(friendsArray);
    console.log(user.friends);

    // fetch('/users/' + id, {
    //   method: 'PATCH',
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     'Content-type': 'application/json',
    //   },
    //   body: JSON.stringify({ post_id: post._id, user_id: userId }),
    // }).then(() => setPostAdded(true));
  }

return(
  <div >
    <div className="profile-container">
    <div className='coverPhoto'>
      </div>
      </div>

    <div className='profile'>
  
      <div className='left'>
        <div className='user-info'>
          <Card>
            <img src={ user.avatar } />
            <h1>{ user.name }</h1>
            <div className="user-details">
              <p>{user.hometown}</p>
              <p>{user.profession}</p>
              <p>{user.relationship_status}</p>
            </div>

            <div>
              {profileMatch ? (
              <div className='edit-button'>
                <button>Edit profile</button>
              </div>
              ) : (
              <div className='friend-button'>
                <button onClick={ handleAddFriend }>Add Friend</button>
              </div>
              )}
            </div>
            </Card>
        </div>

        <div className='intro'>
          <Card> 
            <h3>Intro</h3>
            <p>{user.bio}</p>
          </Card>   
   
        </div>

        <div className='photos'>
          <Card>
            <div className='photo'>
              <Card>
                <img src={profile_placeholder} style={{width: "50px", height: "50px"}} />
              </Card>
            </div>
            <div className='photo'>
              <Card>
                <img src={profile_placeholder} style={{width: "50px", height: "50px"}} />
              </Card>
            </div>
            <div className='photo'>
              <Card>
                <img src={profile_placeholder} style={{width: "50px", height: "50px"}} />
              </Card>
            </div>
            <div className='photo'>
              <Card>
                <img src={profile_placeholder} style={{width: "50px", height: "50px"}} />
              </Card>
            </div>
          </Card>
        </div>
      </div>

                
      <div className='posts right'>
        <Feed />
      </div>
    </div>  
  </div>
 )
}

export default Profile
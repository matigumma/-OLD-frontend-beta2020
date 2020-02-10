import React from 'react';

const UserProfile = (props) => {
console.log('props de UserProfile: ',props)
    return (
        <>
            <h1 className="mt-3" >hola {props.state.username}</h1>
        </>
    )
}
export default UserProfile
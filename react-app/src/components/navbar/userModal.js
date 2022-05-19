import { useState } from "react";
import Popup from "reactjs-popup";
import LogoutButton from "../auth/LogoutButton";
import About from "./about";

const UserInfo = ({ user }) => {
  const [open, setOpen] = useState(false);

  const toggleModal = () => setOpen(!open);

  return (
    <>
      <div to='/' className='userLink'
        style={{backgroundImage:`url(${user.profilePic})`}}
        onClick={toggleModal}
      />
      <Popup position='bottom center' open={open}>
        <div className='user-link-options'>
          <p>{user?.firstName} {user?.lastName}</p>
          {/* <About /> */}
          <LogoutButton onClick={toggleModal} />
        </div>
      </Popup>
    </>
  )
}

export default UserInfo;
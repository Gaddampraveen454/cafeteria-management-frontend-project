import React, { useState } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { LogOutURL } from 'auth/authSlice';
import { useHistory } from 'react-router-dom';
import { MENU_BEHAVIOUR } from 'constants.js';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { Button } from 'react-bootstrap';
import { settingsChangeColor } from 'settings/settingsSlice';
import IconMenuNotifications from './notifications/Notifications';
import SearchModal from './search/SearchModal';

import { menuChangeBehaviour } from './main-menu/menuSlice';




const NavIconMenu = () => {
  const { pinButtonEnable, behaviour } = useSelector((state) => state.menu);
  const { color } = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const history = useHistory()

  const onPinButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (pinButtonEnable) {
      dispatch(menuChangeBehaviour(behaviour === MENU_BEHAVIOUR.Pinned ? MENU_BEHAVIOUR.Unpinned : MENU_BEHAVIOUR.Pinned));
    }
    return false;
  };
  const onDisabledPinButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onLightDarkModeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(settingsChangeColor(color.includes('light') ? color.replace('light', 'dark') : color.replace('dark', 'light')));
  };
  const [showSearchModal, setShowSearchModal] = useState(false);

  const onSearchIconClick = (e) => {
    e.preventDefault();
    setShowSearchModal(true);
  };

  const { isLogin, currentUser } = useSelector((state) => state.auth);


  const redirect = () => {
     if(currentUser.data.group === "store" || currentUser.data.group === "company" || currentUser.data.group === "icafe_admin"){
         history.push('/login')
     }
     else{
    console.log("enter1")
    const companyId = localStorage.getItem('companyId');
    console.log(companyId, "companyId")
    const compNewId = !companyId ? "qr" : companyId
    dispatch(LogOutURL())
    history.push(`/menu/company/${compNewId}`)
     }
  }

  const Loginredirect = () => {
    history.push('/consumer/login', { update: true })
  }
  // /consumer/login
  return (
    <>
      {currentUser?.data?.group === "company" && <Button>{currentUser?.data?.company_name?.toUpperCase()}</Button>}
      {currentUser?.data?.group === "store" && <Button>{currentUser?.data?.store_name?.toUpperCase()}</Button>}
      {currentUser?.data?.group === "icafe_admin" && <Button>{currentUser?.data?.company_name?.toUpperCase()}</Button>}

      <ul className="list-unstyled list-inline text-center menu-icons">
        {/* <li className="list-inline-item">
          <a href="#/" 
          onClick={onSearchIconClick}
          >
            <CsLineIcons icon="search" size="18" />
          </a>
        </li> */}
        {/* <li className="list-inline-item">
          <a
            href="#/"
            id="pinButton"
            onClick={pinButtonEnable ? onPinButtonClick : onDisabledPinButtonClick}
            className={classNames('pin-button', { disabled: !pinButtonEnable })}
          >
            <CsLineIcons icon="lock-on" size="18" className="unpin" />
            <CsLineIcons icon="lock-off" size="18" className="pin" />
          </a>
        </li>
        <li className="list-inline-item">
          <a href="#/" id="colorButton" onClick={onLightDarkModeClick}>
            <CsLineIcons icon="light-on" size="18" className="light" />
            <CsLineIcons icon="light-off" size="18" className="dark" />
          </a>
        </li> */}
        {/* <IconMenuNotifications /> */}
        {/* {currentUser?.data?.group === "company" && currentUser?.data?.company_name}
        {currentUser?.data?.group === "company" && currentUser?.data?.company_name} */}
        <li className="list-inline-item">
          {currentUser && currentUser.data ?
            <a
              onClick={redirect}
            >
              <CsLineIcons icon="logout" size="18" /> <label style={{ cursor: "pointer" }}>&nbsp;Logout</label>
            </a>
            :
            <a
              onClick={Loginredirect}
            >
              <CsLineIcons icon="login" size="18" /> <label style={{ cursor: "pointer" }}>&nbsp;Login</label>
            </a>
          }
        </li>
        {isLogin === true && currentUser && currentUser?.data?.group === "consumer" &&
          <IconMenuNotifications />
        }
      </ul>
      <SearchModal show={showSearchModal} setShow={setShowSearchModal} />
    </>
  );
};

export default React.memo(NavIconMenu);

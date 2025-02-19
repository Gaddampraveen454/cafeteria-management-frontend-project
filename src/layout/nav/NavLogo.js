import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_PATHS } from 'config.js';
import logo from "../../Assests/images/cafewhite.png"


const NavLogo = () => {
  let companyId = '';
  useEffect(() => {
    companyId = localStorage.getItem('companyId')
  },[localStorage.getItem('companyId')])
  // console.log(companyId, "companyIdcompanyId")
  return (
    <div className="logo position-relative">
      <Link to={`${DEFAULT_PATHS.APP}`}>
        
          {/* Logo can be added directly */}
          <img src={logo} alt="logo" />
          {/* Or added via css to provide different ones for different color themes */}
        
        {/* <div className="img" /> */}
      </Link>
    </div>
  );
};
export default React.memo(NavLogo);

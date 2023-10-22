import { KaImage } from '@components/primitive';
import { FC, useState } from 'react';

interface ISidebarProps {}

const Sidebar: FC<ISidebarProps> = () => {
  return (
    <aside className="ks-home-sidebar">
      <div className="logo">
        <KaImage src="/images/logo-gradient.svg" alt="logo" className="logo" />
        {/* <Tooltip title={`Collapse: ${onModeCollapse ? 'On' : 'Off'}`} color={'rgb(7, 142, 200)'}>
          <button onClick={() => setOnModeCollapse((prev) => !prev)}>
            <RiBarChartHorizontalLine></RiBarChartHorizontalLine>
          </button>
        </Tooltip> */}
      </div>
      {/* <div className="toggle-menu" onClick={() => setToggleMenu(!toggleMenu)}>
        {toggleMenu ? <CloseOutlined /> : <MenuUnfoldOutlined />}
      </div>
      <div className={`user-nav-group ${toggleMenu ? 'menu-show' : ''}`}>
        <div className="user-infomation">
          <div className="avatar-friend" onClick={handleNavigateProfile}>
            {dataUser.dataUser.avatar ? <img src={dataUser.dataUser.avatar} /> : dataUser.dataUser.name.slice(0, 2).toLocaleUpperCase()}
          </div>
          <div className="user-name">{dataUser.dataUser.name}</div>
        </div>
        <div className={`menu ${delayShowMenu ? '' : 'hide-menu'}`}>
          <NavLink to="/dashboard" className="nav-link">
            <img src="/dashboard-gray.svg" alt="" /> <span>Dashboard</span>
          </NavLink>
          <NavLink to="/community" className="nav-link">
            <img src="communication-gray.svg" alt="" /> <span>Community</span>
          </NavLink>
          <NavLink to="/chat" className="nav-link">
            <img src="icon-gray.svg" alt="" /> <span>Chat</span>
          </NavLink>
          <NavLink to={`/profile/${dataUser.dataUser.username}`} className="nav-link">
            <img src="/setting-gray.svg" alt="" /> <span>Settings</span>
          </NavLink>
          <div className="nav-link nav-notification">
            <img src="/noti-gray.svg" alt="" />
          </div>
          <div className="nav-link nav-notification" onClick={() => dispath(logout())}>
            <RiLogoutBoxRLine></RiLogoutBoxRLine>
          </div>
        </div>
      </div> */}
    </aside>
  );
};

export default Sidebar;

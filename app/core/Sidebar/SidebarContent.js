import React, { useEffect } from "react";
import { Menu } from "antd";
import Link from "next/link";

import { useRouter } from 'next/router'
import CustomScrollbars from "../../../util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../../constants/ThemeSetting";
import IntlMessages from "../../../util/IntlMessages";
import { useDispatch, useSelector } from "react-redux";
import { setPathName } from "../../../redux/actions";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


const SidebarContent = () => {
  const navStyle = useSelector(({ settings }) => settings.navStyle);
  const themeType = useSelector(({ settings }) => settings.themeType);
  const dispatch = useDispatch();
  const router = useRouter()

  const getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return "gx-no-header-notifications";
    }
    return "";
  };
  const getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };

  useEffect(() => {
    dispatch(setPathName(router.pathname))
  }, [router.pathname]);

  const selectedKeys = router.pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split('/')[1];
  return (
    <>
      <SidebarLogo />
      <div className="gx-sidebar-content">
        <div className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}>
          <UserProfile />
          <AppsNavigation />
        </div>
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
            mode="inline">

            <MenuItemGroup key="main" className="gx-menu-group" title={<IntlMessages id="sidebar.main" />}>
              <SubMenu key="dashboard" popupClassName={getNavStyleSubMenuClass(navStyle)}
                title={<span><i className="icon icon-dasbhoard" />
                  <span><IntlMessages id="sidebar.dashboard" /></span></span>}>
                <Menu.Item key="main/dashboard/crypto">
                  <Link href="/main/dashboard/crypto">
                    <a><i className="icon icon-crypto" />
                      <span><IntlMessages id="sidebar.dashboard.crypto" /></span>
                    </a></Link>
                </Menu.Item>
                <Menu.Item key="main/dashboard/crm">
                  <Link href="/main/dashboard/crm">
                    <a><i className="icon icon-crm" />
                      <span><IntlMessages id="sidebar.dashboard.crm" /></span>
                    </a></Link>
                </Menu.Item>
                <Menu.Item key="main/dashboard/listing">
                  <Link href="/main/dashboard/listing">
                    <a><i className="icon icon-listing-dbrd" />
                      <span><IntlMessages id="sidebar.dashboard.listing" /></span>
                    </a></Link>
                </Menu.Item>
              </SubMenu>

              <Menu.Item key="main/widgets">
                <Link href="/main/widgets"><a><i className="icon icon-widgets" />
                  <span><IntlMessages id="sidebar.widgets" /></span></a></Link>
              </Menu.Item>

              <Menu.Item key="main/metrics">
                <Link href="/main/metrics"><a><i className="icon icon-apps" />
                  <span><IntlMessages id="sidebar.metrics" /></span></a></Link>
              </Menu.Item>

              <Menu.Item key="main/layouts">
                <Link href="/main/layouts"><a><i className="icon icon-card" />
                  <span> <IntlMessages id="sidebar.layouts" /></span></a></Link>
              </Menu.Item>

            </MenuItemGroup>
            {/* <MenuItemGroup key="test" className="gx-menu-group" title={"Testing"}>
            <Menu.Item key="testing">
                <Link href="/test"><a><i className="icon icon-card" />
                  <span>Notes</span></a></Link>
              </Menu.Item>
            </MenuItemGroup> */}
            <MenuItemGroup key="masterdata" className="gx-menu-group" title={"Master Data"}>
            <Menu.Item key="generator">
                <Link href="/generator"><a><i className="icon icon-card" />
                  <span>Generators</span></a></Link>
              </Menu.Item>
              <Menu.Item key="pump">
                <Link href="/pump"><a><i className="icon icon-card" />
                  <span>Pumps</span></a></Link>
              </Menu.Item>
              <Menu.Item key="waste">
                <Link href="/waste"><a><i className="icon icon-card" />
                  <span>Wastes</span></a></Link>
              </Menu.Item>
              <Menu.Item key="floor">
                <Link href="/floor"><a><i className="icon icon-card" />
                  <span>Floors</span></a></Link>
              </Menu.Item>
            </MenuItemGroup>
            <MenuItemGroup key="add-report" className="gx-menu-group" title={"Reports"}>
              <Menu.Item key="monitor-reports">
                <Link href="/monitor-reports"><a><i className="icon icon-card" />
                  <span>Monitor Reports</span></a></Link>
              </Menu.Item>
            </MenuItemGroup>
            











          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

SidebarContent.propTypes = {};
export default SidebarContent;


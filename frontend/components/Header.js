import React from 'react';
import { useState } from 'react';
//import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import { APP_NAME } from '../config';
import { signout, isAuth } from '../actions/auth';
//import UserProvider from "../context/user";
import dynamic from "next/dynamic";
const Link = dynamic(() => import('next/link'), { ssr: false });

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import '.././node_modules/nprogress/nprogress.css';
import Search from './book/Search';

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <React.Fragment>
      <Navbar color="light" light expand="md">
          <NavLink href="/" className="font-weight-bold">{APP_NAME}</NavLink>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <React.Fragment>
              <NavItem>
                  <NavLink href="/books">Books</NavLink>
              </NavItem>

              <NavItem>
                  <NavLink href="/contact">Contact</NavLink>
              </NavItem>
            </React.Fragment>

            {!isAuth() && (
              <React.Fragment>
                <NavItem>
                    <NavLink href="/signin">Signin</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/signup">Signup</NavLink>
                </NavItem>
              </React.Fragment>
            )}

            {isAuth() && isAuth().role === 0 && (
              <NavItem>
                  <NavLink href="/user">{`${isAuth().name}'s Dashboard`}</NavLink>
              </NavItem>
            )}

            {isAuth() && isAuth().role === 1 && (
              <NavItem>
                  <NavLink href="/admin">{`${isAuth().name}'s Dashboard`}</NavLink>
              </NavItem>
            )}

            {isAuth() && (
              <NavItem>
                <NavLink style={{ cursor: 'pointer' }} onClick={() => signout(() => Router.replace(`/signin`))}>
                  Signout
                </NavLink>
              </NavItem>
            )}

            <NavItem>
              <Link href="/user/crud/book" className="btn btn-primary text-light">
                Write a book
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Search />
    </React.Fragment>
  );
};

export default Header;

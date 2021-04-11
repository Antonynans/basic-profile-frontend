import React from 'react';
import swal from "sweetalert";
import { withRouter, Link } from "react-router-dom";
import './style.css';
import {DropdownButton, Dropdown, Navbar, Nav} from 'react-bootstrap';


const NavBar = ({history}) => {
    const Logout = () => {
        swal("Are your sure SignOut?", {
          buttons: {
            nope: {
              text: "Let me back",
              value: "nope"
            },
            sure: {
              text: "I'm, Sure",
              value: "sure"
            }
          }
        })
        .then(value => {
          switch (value) {
            case "sure":
              swal(" SignOut Successfully", "success")
                localStorage.removeItem("TOKEN_KEY");
                history.push("/login");
              break;
            case "nope":
              swal("Ok", "success");
              break;
            default:
              swal("Got away safely!");
          }
        });
      };

    return (
        <>
              {/* <Navbar expand="md" fixed="top" variant="dark">
              <Navbar.Brand className="pl-5" href="#">
                <li>hello</li>
              </Navbar.Brand>
              </Navbar> */}

          <nav className="main-header">
            <div className="nav">
        {/* Left navbar links */}
          <ul>
          {/* <li className="nav-items">
            <a className="nav-link" data-widget="pushmenu" href="##">
              <i className="fas fa-bars" />
            </a>
          </li> */}
          <li className="nav-item">
            <a href="/" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/#" className="nav-link">
              Contact
            </a>
          </li>
        </ul>
        {/* SEARCH FORM */}
        <form>
          <div className="form">
            <input
              className="form-control form-control-navbar"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <div className="input-group-append">
              <button className="btn btn-navbar" type="submit">
                <i className="fas fa-search" />
              </button>
            </div>
          </div>
        </form>
        </div>
        {/* Right navbar links */}
        {/* <div className="dropdown">
          <button className="dropbtn">Menu
            <i className="fa fa-caret-down" />
          </button>
          <div className="dropdown-content">
            <a href="#">update profile</a>
            <a href="#">Logout</a>
          </div>
        </div> */}
        <div className="nav-item">
        <DropdownButton id="dropdown-basic-button" title="Menu">
          <Dropdown.Item href="/profile">Profile</Dropdown.Item>
          <Dropdown.Item href="##" onClick={() => Logout()}>Logout</Dropdown.Item>
          <Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>
        </DropdownButton>
        </div>
            
        {/* <ul className="navbar-nav ml-auto"> */}
          {/* Messages Dropdown Menu */}
          {/* Notifications Dropdown Menu */}

          {/* <li className="dropdown">
            <a className="nav-link" data-toggle="dropdown" href="##">
              <i className="far fa-user" />
            </a>

            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <span className="dropdown-item dropdown-header">menu</span>
              <div className="dropdown-divider" />
              <Link to="/profile" className="dropdown-item">
                <i className="fas fa-user-alt mr-2" /> Update Profile
              </Link>
              <div className="dropdown-divider" />
              <a
                href="##"
                onClick={() => Logout()}
                className="dropdown-item"
              >
                <i className="fas fa-sign-out-alt mr-2" /> Logout
              </a>
            </div>
          </li>
        </ul> */}
      </nav>

        </>
    );
};
export default withRouter (NavBar);

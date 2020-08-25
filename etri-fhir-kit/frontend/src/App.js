import "./index.css";
import { ReactComponent as BellIcon } from "./icons/bell.svg";
import { ReactComponent as MessengerIcon } from "./icons/messenger.svg";
import { ReactComponent as CaretIcon } from "./icons/caret.svg";
import { ReactComponent as PlusIcon } from "./icons/plus.svg";
import { ReactComponent as CogIcon } from "./icons/cog.svg";
import { ReactComponent as ChevronIcon } from "./icons/chevron.svg";
import { ReactComponent as ArrowIcon } from "./icons/arrow.svg";
import { ReactComponent as BoltIcon } from "./icons/bolt.svg";

import React, { Component, useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import Patient from "./Patient";
import { Layout, Input, List, Card, Row, Col, Spin } from "antd";
import "./App.css";

const { Header, Content } = Layout;
const Search = Input.Search;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.searchPatientNames = this.searchPatientNames.bind(this);
  }

  searchPatientNames(value) {
    this.setState({ loading: true });
    fetch(`api/patient?name=${value}`, {
      accept: "application/json",
    })
      .then((response) => response.json())
      .then((patients) => {
        this.setState({
          patients: patients,
          loading: false,
          searchResolved: true,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  }

  render() {
    const { patients, loading, searchResolved } = this.state;

    function DropdownMenu() {
      const [activeMenu, setActiveMenu] = useState("main");
      const [menuHeight, setMenuHeight] = useState(null);
      const dropdownRef = useRef(null);

      useEffect(() => {
        setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
      }, []);

      function calcHeight(el) {
        const height = el.offsetHeight;
        setMenuHeight(height);
      }

      function DropdownItem(props) {
        return (
          <a
            href="#"
            className="menu-item"
            onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
          >
            <span className="icon-button">{props.leftIcon}</span>
            {props.children}
            <span className="icon-right">{props.rightIcon}</span>
          </a>
        );
      }

      return (
        <div
          className="dropdown"
          style={{ height: menuHeight }}
          ref={dropdownRef}
        >
          <CSSTransition
            in={activeMenu === "main"}
            timeout={500}
            classNames="menu-primary"
            unmountOnExit
            onEnter={calcHeight}
          >
            <div className="menu">
              <DropdownItem>My Profile</DropdownItem>
              <DropdownItem
                leftIcon={<CogIcon />}
                rightIcon={<ChevronIcon />}
                goToMenu="settings"
              >
                Settings
              </DropdownItem>
              <DropdownItem
                leftIcon="🦧"
                rightIcon={<ChevronIcon />}
                goToMenu="animals"
              >
                Animals
              </DropdownItem>
            </div>
          </CSSTransition>

          <CSSTransition
            in={activeMenu === "settings"}
            timeout={500}
            classNames="menu-secondary"
            unmountOnExit
            onEnter={calcHeight}
          >
            <div className="menu">
              <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
                <h2>My Tutorial</h2>
              </DropdownItem>
              <DropdownItem leftIcon={<BoltIcon />}>HTML</DropdownItem>
              <DropdownItem leftIcon={<BoltIcon />}>CSS</DropdownItem>
              <DropdownItem leftIcon={<BoltIcon />}>JavaScript</DropdownItem>
              <DropdownItem leftIcon={<BoltIcon />}>Awesome!</DropdownItem>
            </div>
          </CSSTransition>

          <CSSTransition
            in={activeMenu === "animals"}
            timeout={500}
            classNames="menu-secondary"
            unmountOnExit
            onEnter={calcHeight}
          >
            <div className="menu">
              <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
                <h2>Animals</h2>
              </DropdownItem>
              <DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
              <DropdownItem leftIcon="🐸">Frog</DropdownItem>
              <DropdownItem leftIcon="🦋">Horse?</DropdownItem>
              <DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>
            </div>
          </CSSTransition>
        </div>
      );
    }

    function Navbar(props) {
      return (
        <nav className="navbar">
          <ul className="navbar-nav">{props.children}</ul>
        </nav>
      );
    }

    function NavItem(props) {
      const [open, setOpen] = useState(false);

      return (
        <li className="nav-item">
          <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
            {props.icon}
          </a>

          {open && props.children}
        </li>
      );
    }

    return (
      <Layout className="App">
        <Navbar>
          <NavItem icon={<PlusIcon />} />
          <NavItem icon={<BellIcon />} />
          <NavItem icon={<MessengerIcon />} />

          <NavItem icon={<CaretIcon />}>
            <DropdownMenu />
          </NavItem>
        </Navbar>
        <Content className="App-content">
          <Row>
            <Col span={10} offset={7}>
              <p>fhir-resource-tester by react (presentJay)</p>
            </Col>
          </Row>
          <h2>Patient Name Search Example</h2>
          <Search
            className="App-search"
            placeholder="Search Patient Names"
            enterButton="Search"
            size="large"
            onSearch={this.searchPatientNames}
          />
          {loading ? (
            <Row type="flex" justify="center">
              <Col span={4}>
                <Spin />
              </Col>
            </Row>
          ) : (
            <List
              className="App-list"
              grid={{ gutter: 16, column: 2 }}
              dataSource={patients}
              locale={
                searchResolved
                  ? { emptyText: "No results found." }
                  : { emptyText: "" }
              }
              renderItem={(patient) => (
                <List.Item>
                  <Card title={patient.name}>
                    <Patient
                      id={patient.id}
                      name={patient.name}
                      birthDate={patient.birthDate}
                      gender={patient.gender}
                    />
                  </Card>
                </List.Item>
              )}
            />
          )}
        </Content>
      </Layout>
    );
  }
}

export default App;

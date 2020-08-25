import React, { Component } from 'react';
import Patient from './Patient';
import { Layout, Input, List, Card, Row, Col, Spin } from 'antd';
import './App.css';

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
      accept: 'application/json'
    })
    .then((response) => (
      response.json()
    ))
    .then((patients) => {
      this.setState({ patients: patients, loading: false, searchResolved: true })
    })
    .catch((err) => {
      console.log(err);
      this.setState({ loading: false });
    })
  }

  render() {
    const { patients, loading, searchResolved } = this.state;

    return (
      <Layout className="App">
        <Header className="App-header">
          <h1>fhir-resource-tester (Fhir-kit-client)</h1>
        </Header>
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
          { loading ? (
              <Row type="flex" justify="center">
                <Col span={4}>
                  <Spin/>
                </Col>
              </Row>
            ) : (
              <List
                className="App-list"
                grid={{ gutter: 16, column: 2 }}
                dataSource={patients}
                locale={searchResolved ? { emptyText: 'No results found.' } : { emptyText: '' }}
                renderItem={patient => (
                  <List.Item>
                    <Card title={patient.name}>
                    <Patient
                      id={patient.id}
                      name={patient.name}
                      birthDate={patient.birthDate}
                      gender={patient.gender} />
                    </Card>
                  </List.Item>
                )}
              />
          ) }

        </Content>
      </Layout>
    );
  }
}

export default App;

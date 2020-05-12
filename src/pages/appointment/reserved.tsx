import React, { Component } from "react";

import { Container, Grid, Card } from "tabler-react";
import Layout from "../../containers/layout";

export default class AppointmentMePage extends Component {
  render() {
    return (
      <Layout title="Reservar hora médica">
        <Container>
          <Grid.Row>
            <Grid.Col lg={12}>
              <Card>
                <Card.Header></Card.Header>
                <Card.Body></Card.Body>
              </Card>
            </Grid.Col>
          </Grid.Row>
        </Container>
      </Layout>
    );
  }
}

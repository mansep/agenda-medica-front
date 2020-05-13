import React, { Component } from "react";

import { Container, Grid, Card } from "tabler-react";
import Layout from "../../containers/layout";
import { Calendar } from "antd";
import moment from "moment";
import "moment/locale/es-us";
moment.locale("es-us");

export default class AppointmentMePage extends Component {
  render() {
    return (
      <Layout title="Reservas">
        <Container>
          <Grid.Row>
            <Grid.Col lg={12}>
              <Card>
                <Card.Header>
                  <Card.Title>Mis Reservas</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Calendar />
                </Card.Body>
              </Card>
            </Grid.Col>
          </Grid.Row>
        </Container>
      </Layout>
    );
  }
}

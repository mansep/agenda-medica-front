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
      <Layout title="Mis reservas médica">
        <Container>
          <Grid.Row>
            <Grid.Col lg={12}>
              <Card>
                <Card.Header></Card.Header>
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

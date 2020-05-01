import React, { Component } from "react";
import { Form, Grid } from "tabler-react";

type Props = {
  user: any;
  medicalSpecialities: any;
  medicalCenters: any;
};
export default class DoctorsSelectable extends Component<Props> {
  render() {
    const { medicalSpecialities, medicalCenters } = this.props;
    return (
      <Grid.Row>
        <Grid.Col md={12} lg={12}>
          <Form.Group label="Especialidades">
            <Grid.Row>
              {medicalSpecialities.map((item) => {
                return (
                  <Grid.Col md={3} lg={3}>
                    <Form.Checkbox
                      key={String(item.id)}
                      label={item.name}
                      name="especialidades"
                      value={String(item.id)}
                    />
                  </Grid.Col>
                );
              })}
            </Grid.Row>
          </Form.Group>
        </Grid.Col>

        <Grid.Col md={12} lg={12}>
          <Form.Group label="Centros">
            <Grid.Row>
              {medicalCenters.map((item) => {
                return (
                  <Grid.Col md={3} lg={3}>
                    <Form.Checkbox
                      key={String(item.id)}
                      label={item.name}
                      name="centros"
                      value={String(item.id)}
                    />
                  </Grid.Col>
                );
              })}
            </Grid.Row>
          </Form.Group>
        </Grid.Col>
      </Grid.Row>
    );
  }
}

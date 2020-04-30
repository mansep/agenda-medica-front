import React, { Component } from "react";
import {
  Container,
  Grid,
  Card,
  Button,
  Form,
  Comment,
  FormTextInput,
  Avatar,
  Icon,
  Table,
} from "tabler-react";

import Layout from "../../containers/layout";

export default class UsersPage extends Component {
  render() {
    return (
      <Layout title="Administracion de usuarios">
        <Container>
          <Grid.Row>
            <Grid.Col lg={12}>
              <Card>
                <Card.Header>
                  <Button
                    color="primary"
                    className="float-right margin-left-auto"
                  >
                    Nuevo usuario
                  </Button>
                </Card.Header>
                <Card.Body>
                  <Table
                    cards={true}
                    striped={true}
                    responsive={true}
                    className="table-vcenter"
                  >
                    <Table.Header>
                      <Table.Row>
                        <Table.ColHeader colSpan={2}>User</Table.ColHeader>
                        <Table.ColHeader>Commit</Table.ColHeader>
                        <Table.ColHeader>Date</Table.ColHeader>
                        <Table.ColHeader />
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Col className="w-1">
                          <Avatar imageURL="./demo/faces/male/9.jpg" />
                        </Table.Col>
                        <Table.Col>Ronald Bradley</Table.Col>
                        <Table.Col>Initial commit</Table.Col>
                        <Table.Col className="text-nowrap">
                          May 6, 2018
                        </Table.Col>
                        <Table.Col className="w-1">
                          <Icon link={true} name="trash" />
                        </Table.Col>
                      </Table.Row>
                      <Table.Row>
                        <Table.Col>
                          <Avatar>BM</Avatar>
                        </Table.Col>
                        <Table.Col>Russell Gibson</Table.Col>
                        <Table.Col>Main structure</Table.Col>
                        <Table.Col className="text-nowrap">
                          April 22, 2018
                        </Table.Col>
                        <Table.Col>
                          <Icon link={true} name="trash" />
                        </Table.Col>
                      </Table.Row>
                      <Table.Row>
                        <Table.Col>
                          <Avatar imageURL="./demo/faces/female/1.jpg" />
                        </Table.Col>
                        <Table.Col>Beverly Armstrong</Table.Col>
                        <Table.Col>Left sidebar adjustments</Table.Col>
                        <Table.Col className="text-nowrap">
                          April 15, 2018
                        </Table.Col>
                        <Table.Col>
                          <Icon link={true} name="trash" />
                        </Table.Col>
                      </Table.Row>
                      <Table.Row>
                        <Table.Col>
                          <Avatar imageURL="./demo/faces/male/4.jpg" />
                        </Table.Col>
                        <Table.Col>Bobby Knight</Table.Col>
                        <Table.Col>Topbar dropdown style</Table.Col>
                        <Table.Col className="text-nowrap">
                          April 8, 2018
                        </Table.Col>
                        <Table.Col>
                          <Icon link={true} name="trash" />
                        </Table.Col>
                      </Table.Row>
                      <Table.Row>
                        <Table.Col>
                          <Avatar imageURL="./demo/faces/female/11.jpg" />
                        </Table.Col>
                        <Table.Col>Sharon Wells</Table.Col>
                        <Table.Col>Fixes #625</Table.Col>
                        <Table.Col className="text-nowrap">
                          April 9, 2018
                        </Table.Col>
                        <Table.Col>
                          <Icon link={true} name="trash" />
                        </Table.Col>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </Card.Body>
              </Card>
            </Grid.Col>
          </Grid.Row>
        </Container>
      </Layout>
    );
  }
}

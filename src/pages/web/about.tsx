import React from "react";

import { Container, Grid, Card } from "tabler-react";

import Layout from "../../containers/layout";
import { Alert, Collapse } from "antd";
const { Panel } = Collapse;

export default class AboutPageWeb extends React.Component {
  render() {
    return (
      <>
        <Alert
          message="Bienvenido al nuevo sitio web. Ahora prodrás reservar tus horas médicas online"
          banner
          type="success"
        />
        <Layout isHome={true}>
          <div className="my-3 my-md-5">
            <Container>
              <Grid.Row>
                <Grid.Col lg={12}>
                  <Card>
                    <Card.Header>
                      <Card.Title>Nosotros</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <div className="d-flex justify-content-center mb-5">
                        <img
                          src={require("../../assets/logo.png")}
                          height={100}
                          alt=""
                        />
                      </div>
                      <p>
                        CentroLab es uno de los principales centros privados
                        hospitalarios de Santa Cruz, orientado a satisfacer las
                        necesidades de salud de las personas, para lo que cuenta
                        con todas las especialidades médicas y unidades de
                        tratamiento intensivo e intermedio, para pacientes
                        adultos, infantiles y recién nacidos.
                      </p>
                      <p>
                        Ubicada en Av. Rafael Casanova 122, y ahora con
                        presencia en todo chile, anualmente realiza más de
                        10.000 consultas médicas, 4.000 consultas de urgencia,
                        4.000 intervenciones, 1.000 cirugías, 4.000
                        hospitalizaciones y 500 partos, brindando atención
                        integral a sus pacientes durante toda su estadía.
                      </p>
                      <p>
                        Actualmente cuenta con 100 camas, 10 pabellones
                        centrales, 3 pabellones de maternidad, 2 de hemodinamia
                        y 1 pabellón de neurocirugía con la más alta tecnología
                        que existe en Chile para tratar patologías del cerebro
                        (Gamma Knife Perfexion).
                      </p>
                      <p>
                        En su constante esfuerzo por estar más cerca de las
                        personas, CentroLab ha desarrollado diversos programas y
                        convenios con Fonasa e Isapres, apoyándose siempre en
                        sus profesionales altamente capacitados y con larga
                        experiencia, apoyados con la mejor tecnología para
                        brindar toda la confianza y el respaldo para sus
                        pacientes.
                      </p>
                      <Collapse defaultActiveKey={["1"]} accordion>
                        <Panel header="Misión" key="1">
                          <p>
                            Entregamos soluciones de salud con los más altos
                            estándares de calidad a toda la comunidad. Estamos
                            comprometidos con el servicio de excelencia y la
                            eficiencia en la gestión, inspirados siempre por
                            sólidos principios éticos.
                          </p>
                        </Panel>
                        <Panel header="Visión" key="2">
                          <p>
                            Ser uno de los principales grupos de salud del país,
                            ofreciendo a todos los pacientes la mejor
                            experiencia en la atención integral y de alta
                            complejidad, con los más altos niveles de calidad.
                          </p>
                        </Panel>
                        <Panel header="Propuesta de valor" key="3">
                          <p>
                            <b>Pacientes:</b>
                            <br />
                            "Resolver de manera cálida, segura y eficiente las
                            necesidades de nuestros pacientes y quienes los
                            acompañan, con medicina y servicio de excelencia"
                          </p>

                          <p>
                            <b>Aseguradoras:</b>
                            <br /> "Ser el prestador con el mejor estándar
                            resolutivo, eficiencia y costo efectividad,
                            garantizando una atención integral a sus
                            beneficiarios con un modelo de gestión diferenciador
                            para las aseguradoras"
                          </p>

                          <p>
                            <b>Médicos:</b>
                            <br /> "CentroLab es el mejor lugar para ejercer una
                            medicina de excelencia y para desarrollarse en un
                            ambiente profesional colaborativo y seguro"
                          </p>

                          <p>
                            <b>Colaboradores:</b>
                            <br /> "Nos preocupamos por las personas,
                            promoviendo desafíos profesionales en un ambiente de
                            calidez y empatía, para el desarrollo integral de
                            todos sus colaboradores"
                          </p>
                        </Panel>
                      </Collapse>
                    </Card.Body>
                  </Card>
                </Grid.Col>
              </Grid.Row>
            </Container>
          </div>
        </Layout>
      </>
    );
  }
}

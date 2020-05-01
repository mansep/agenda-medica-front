import React from "react";

import {
  Container,
  Grid,
  Card,
  Button,
  Form,
  Comment,
  FormTextInput,
} from "tabler-react";
import { Formik } from "formik";
import * as Validator from "class-validator";
import { UserDto } from "../api/dto/user.dto";
import moment from "moment";
import swal from "@sweetalert/with-react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSession } from "../redux/action";

import Layout from "../containers/layout";

type Props = {
  session: any;
  setSession: any;
};

class ProfilePage extends React.Component<Props> {
  changePass = () => {
    swal({
      text: "Cambio de contraseña",
      buttons: {
        cancel: "Cancelar",
        cambia: { text: "Cambiar contraseña", value: true },
      },
      content: (
        <div>
          <div className="form-group">
            <label className="form-label">Contraseña Actual</label>
            <input
              id="currentPassword"
              name="password"
              className="form-control"
              type="password"
              placeholder="**********"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Nueva Contraseña</label>
            <input
              id="newPassword"
              name="new_password"
              className="form-control"
              type="password"
              placeholder="**********"
            />
          </div>
        </div>
      ),
    }).then((result) => {
      const inputNew = document.getElementById("newPassword") as any;
      const inputCurrent = document.getElementById("currentPassword") as any;
      
      if (inputNew !== null && inputCurrent !== null) {
        const newPassword = inputNew.value;
        const currentPassword = inputCurrent.value;
        if (Validator.isEmpty(newPassword)) {
          swal("Compruebe", "Debe ingresar password actual", "error");
          return;
        }
        if (Validator.isEmpty(currentPassword)) {
          swal("Compruebe", "Debe ingresar password nuevo", "error");
          return;
        }
      }
    });
  };

  render() {
    const {
      rut,
      name,
      lastName,
      phone,
      email,
      dateBirth,
      mobile,
    } = this.props.session.userDto;
    return (
      <Layout>
        <div className="my-3 my-md-5">
          <Container>
            <Grid.Row>
              <Grid.Col lg={4}>
                <Card>
                  <Card.Header>
                    <Card.Title>Mi Perfil</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Formik
                      initialValues={{
                        nombre: name,
                        apellido: lastName,
                        telefono: mobile,
                        email,
                        nacimiento: moment(dateBirth).format("DD-MM-YYYY"),
                        celular: phone,
                      }}
                      validate={(values) => {
                        let errors = {} as any;

                        if (
                          !Validator.isAlpha(
                            values.nombre.split(" ").join(""),
                            "es-ES"
                          )
                        ) {
                          errors.nombre = "Nombre invalido";
                        } else if (Validator.isEmpty(values.nombre)) {
                          errors.nombre = "Debe ingresar nombre";
                        }

                        if (
                          !Validator.isAlpha(
                            values.apellido.split(" ").join(""),
                            "es-ES"
                          )
                        ) {
                          errors.apellido = "Apellido invalido";
                        } else if (Validator.isEmpty(values.apellido)) {
                          errors.apellido = "Debe ingresar apellido";
                        }

                        if (!Validator.minLength(values.nacimiento, 10)) {
                          errors.nacimiento = "Fecha de nacimiento invalida";
                        } else if (
                          !Validator.minDate(
                            moment(values.nacimiento, "DD-MM-YYYY").toDate(),
                            new Date("1900-01-01")
                          )
                        ) {
                          errors.nacimiento = "Fecha de nacimiento invalida";
                        } else if (
                          !Validator.maxDate(
                            moment(values.nacimiento, "DD-MM-YYYY").toDate(),
                            new Date()
                          )
                        ) {
                          errors.nacimiento = "Fecha de nacimiento invalida";
                        } else if (Validator.isEmpty(values.nacimiento)) {
                          errors.nacimiento =
                            "Debe ingresar fecha de nacimiento";
                        }

                        if (!Validator.isPhoneNumber(values.celular, "CL")) {
                          errors.celular = "Celular invalida";
                        } else if (Validator.isEmpty(values.celular)) {
                          errors.celular = "Debe ingresar celular";
                        }

                        if (!Validator.isPhoneNumber(values.telefono, "CL")) {
                          errors.telefono = "Teléfono invalida";
                        }

                        if (Validator.isEmpty(values.email)) {
                          errors.email = "Debe ingresar email";
                        } else if (!Validator.isEmail(values.email)) {
                          errors.email = "Email invalido";
                        }
                        return errors;
                      }}
                      onSubmit={async (
                        values,
                        {
                          setSubmitting,
                          setErrors /* setValues and other goodies */,
                        }
                      ) => {
                        const newUser: UserDto = {
                          rut,
                          name: values.nombre,
                          lastName: values.apellido,
                          email: values.email,
                          dateBirth: moment(
                            values.nacimiento,
                            "DD-MM-YYYY"
                          ).toDate(),
                          phone: values.telefono,
                          mobile: values.celular,
                        };
                        try {
                          swal("Lo sentimos", "olo", "error");
                        } catch (error) {
                          swal("Lo sentimos", error, "error");
                        }
                      }}
                      render={({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                      }) => (
                        <div>
                          <Form.Group>
                            <Form.Label>RUT</Form.Label>
                            <div>{rut}</div>
                          </Form.Group>
                          <FormTextInput
                            name="nombre"
                            label="Nombres"
                            placeholder="Juan Manuel"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values && values.nombre}
                            error={errors && errors.nombre}
                          />
                          <FormTextInput
                            name="apellido"
                            label="Apellidos"
                            placeholder="Perez Gonzales"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values && values.apellido}
                            error={errors && errors.apellido}
                          />
                          <FormTextInput
                            name="nacimiento"
                            label="Fecha Nacimiento"
                            placeholder="01-01-1990"
                            mask={[
                              /\d/,
                              /\d/,
                              "-",
                              /\d/,
                              /\d/,
                              "-",
                              /\d/,
                              /\d/,
                              /\d/,
                              /\d/,
                            ]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values && values.nacimiento}
                            error={errors && errors.nacimiento}
                          />
                          <FormTextInput
                            name="email"
                            label="Email"
                            placeholder="correo@dominio.cl"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values && values.email}
                            error={errors && errors.email}
                          />
                          <Form.Group label="Celular">
                            <Form.InputGroup>
                              <Form.InputGroupPrepend>
                                <Form.InputGroupText>+56</Form.InputGroupText>
                              </Form.InputGroupPrepend>
                              <Form.Input
                                name="celular"
                                placeholder="961876543"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values && values.celular}
                                error={errors && errors.celular}
                              />
                            </Form.InputGroup>
                          </Form.Group>
                          <Form.Group label="Teléfono">
                            <Form.InputGroup>
                              <Form.InputGroupPrepend>
                                <Form.InputGroupText>+56</Form.InputGroupText>
                              </Form.InputGroupPrepend>
                              <Form.Input
                                name="telefono"
                                placeholder="221876543"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values && values.telefono}
                                error={errors && errors.telefono}
                              />
                            </Form.InputGroup>
                          </Form.Group>
                          <Form.Footer>
                            <Button color="primary" block>
                              Guardar
                            </Button>

                            <Button
                              color="default"
                              block
                              onClick={this.changePass}
                            >
                              Cambiar contraseña
                            </Button>
                          </Form.Footer>
                        </div>
                      )}
                    />
                  </Card.Body>
                </Card>
              </Grid.Col>
              <Grid.Col lg={8}>
                <Card>
                  <Card.Header>
                    <Card.Title>Historial de atenciones médicas</Card.Title>
                  </Card.Header>
                  <Comment.List>
                    <Comment
                      avatarURL="demo/faces/male/16.jpg"
                      name="Doctor Peter Richards - Otorinonaringología"
                      date="14-04-2020 18:00 hrs"
                      text="Centro médico alameda, edificio principal, oficina 45"
                    />
                    <Comment
                      avatarURL="demo/faces/male/16.jpg"
                      name="Doctor Peter Richards - Otorinonaringología"
                      date="14-04-2020 18:00 hrs"
                      text="Centro médico alameda, edificio principal, oficina 45"
                    />
                    <Comment
                      avatarURL="demo/faces/male/16.jpg"
                      name="Doctor Peter Richards - Otorinonaringología"
                      date="14-04-2020 18:00 hrs"
                      text="Centro médico alameda, edificio principal, oficina 45"
                    />
                  </Comment.List>
                </Card>
              </Grid.Col>
            </Grid.Row>
          </Container>
        </div>
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      setSession,
    },
    dispatch
  );

const mapStateToProps = (state: any) => {
  const { reducers } = state;
  return { session: reducers.session };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
);

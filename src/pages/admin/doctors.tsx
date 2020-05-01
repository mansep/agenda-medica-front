import React, { Component } from "react";
import {
  Container,
  Grid,
  Card,
  Button,
  FormTextInput,
  Form,
  Icon,
} from "tabler-react";
import ReactLoading from "react-loading";
import swal from "sweetalert";
import Layout from "../../containers/layout";
import Table from "../../components/admin/doctors.table";
import { UserMedicalSpecialityDto } from "../../api/dto/user-medical-speciality.dto";
import { UserMedicalSpeciality } from "../../api/admin/user-medical-speciality";
import { Users } from "../../api/admin/users";
import { Modal } from "antd";
import * as Validator from "class-validator";
import { ResponseDto } from "../../api/dto/response.dto";
import { ValidateRut } from "../../api/validate";
import { MedicalSpeciality } from "../../api/admin/medical-speciality";
import { MedicalCenter } from "../../api/admin/medical-center";

export default class DoctorsPage extends Component {
  state = {
    isLoading: true,
    data: [],
    medicalSpecialities: [],
    medicalCenters: [],
    ModalText: "",
    visible: false,
    confirmLoading: false,
    isNew: false,
    esp: {} as UserMedicalSpecialityDto,
    values: {
      nombre: "",
      estado: "ACTIVE",
      rut: "",
    },
    errors: {} as any,
  };

  create = () => {
    this.setState({
      ModalText: "Nueva especialidad médica",
      visible: true,
      isNew: true,
      values: {
        nombre: "",
        estado: "ACTIVE",
        rut: "",
      },
      errors: {} as any,
    });
  };

  edit = (esp: UserMedicalSpecialityDto) => {
    this.setState({
      ModalText: "Editar espacialidad médica",
      visible: true,
      isNew: false,
      esp,
      values: {
        nombre: esp.userDoctor.name + " " + esp.userDoctor.lastName,
        rut: esp.userDoctor.rut,
        estado: esp.status,
      },
      errors: {} as any,
    });
  };

  delete = (esp: UserMedicalSpecialityDto) => {
    swal({
      title: "Deshabilitar especialidad médica",
      text: `¿Está seguro que desea deshabilitar la especialidad médica ?`,
      icon: "warning",
      buttons: ["Cancelar", true],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const result = await UserMedicalSpeciality.delete(esp.id);
        if (result.error) {
          swal(
            "Error al dehabilitar especialidad médica",
            result.error,
            "error"
          );
        } else {
          swal(
            "¡Listo!",
            "Especialidad médica deshabilitada con éxito",
            "success"
          );
        }
      }
    });
  };

  handleOk = async () => {
    const { isNew, esp, values } = this.state;
    const errors = this.getErrores();
    if (Object.keys(errors).length > 0) {
      swal("Lo sentimos", "Debe corregir errores antes de seguir", "error");
      return;
    }
    this.setState({
      confirmLoading: true,
    });
    let result: ResponseDto;

    const espSave = {
      name: values.nombre,
      code: values.rut,
      status: values.estado,
    };
    if (isNew) {
      //result = await UserMedicalSpeciality.create(espSave);
    } else {
      //result = await UserMedicalSpeciality.update(espSave, esp.id);
    }
    // if (result.error) {
    //   swal("Lo sentimos", result.error.toString(), "error");
    //   this.setState({
    //     confirmLoading: false,
    //   });
    //   return;
    // }
    this.loadingData();
    swal(
      "¡Listo!",
      `Especialidad médica ${isNew ? "creada" : "editada"} con éxito`,
      "success"
    );
    this.setState({
      visible: false,
      confirmLoading: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleChange = (evt) => {
    const { values } = this.state;

    switch (evt.target.name) {
      case "nombre": {
        this.setState({ values: { ...values, nombre: evt.target.value } });
        break;
      }
      case "rut": {
        this.setState({ values: { ...values, rut: evt.target.value } });
        break;
      }
      case "estado": {
        this.setState({ values: { ...values, estado: evt.target.value } });
        break;
      }
    }
  };

  handleBlur = (evt) => {
    this.getErrores();
  };

  getErrores = () => {
    const { values } = this.state;
    let errors = {} as any;

    if (!Validator.isAlpha(values.rut, "es-ES")) {
      errors.rut = "Rut invalido";
    } else if (Validator.isEmpty(values.rut)) {
      errors.rut = "Debe ingresar código";
    }

    if (!Validator.isAlpha(values.nombre.split(" ").join(""), "es-ES")) {
      errors.nombre = "Nombre invalido";
    } else if (Validator.isEmpty(values.nombre)) {
      errors.nombre = "Debe ingresar nombre";
    }
    this.setState({ errors });
    return errors;
  };

  componentDidMount() {
    this.loadingData();
  }

  loadingData = async () => {
    this.setState({ isLoading: true });
    const doctores = await Users.getByRole("DOCTOR");
    if (doctores.error) {
      this.setState({ isLoading: false });
      swal("Lo sentimos", doctores.error, "error");
      return;
    }
    const data = doctores.data.map((item) => {
      item.rut = ValidateRut.runFormat(item.rut);
      item.especialidades = item.userMedicalSpecialities
        .map((esp) => esp.name)
        .join(",");
      item.centros = item.userMedicalCenters.map((esp) => esp.name).join(",");
      return item;
    });

    const especialidades = await MedicalSpeciality.getAll();
    let medicalSpecialities = [];
    if (!especialidades.error) {
      medicalSpecialities = especialidades.data;
    }

    const centros = await MedicalCenter.getAll();
    let medicalCenters = [];
    if (!centros.error) {
      medicalCenters = centros.data;
    }

    this.setState({
      isLoading: false,
      data,
      medicalSpecialities,
      medicalCenters,
    });
  };

  render() {
    const {
      isLoading,
      visible,
      confirmLoading,
      ModalText,
      values,
      errors,
      data,
      medicalCenters,
      medicalSpecialities,
    } = this.state;

    return (
      <Layout title="Administracion de doctores">
        <Container>
          <Grid.Row>
            <Grid.Col lg={12}>
              <Card>
                <Card.Header></Card.Header>
                <Card.Body>
                  {isLoading ? (
                    <div className="d-flex justify-content-center">
                      <ReactLoading type="bubbles" color="#316CBE" />
                    </div>
                  ) : (
                    <Table
                      data={data}
                      medicalCenters={medicalCenters}
                      medicalSpecialities={medicalSpecialities}
                    />
                  )}
                </Card.Body>
              </Card>
            </Grid.Col>
          </Grid.Row>
        </Container>
        <Modal
          title={ModalText}
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          cancelText="Cancelar"
          okText="Guardar"
          onCancel={this.handleCancel}
        >
          <Form>
            <FormTextInput
              name="rut"
              label="Rut"
              placeholder="12.345.678-9"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              value={values && values.rut}
              error={errors && errors.rut}
            />
            <FormTextInput
              name="nombre"
              label="Nombre"
              placeholder="Medicina General"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              value={values && values.nombre}
              error={errors && errors.nombre}
            />{" "}
            <Form.Group label="Estado">
              <Form.SelectGroup>
                <Form.SelectGroupItem
                  label="Activa"
                  name="estado"
                  value="ACTIVE"
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  checked={values.estado === "ACTIVE"}
                />
                <Form.SelectGroupItem
                  label="Deshabilitado"
                  name="estado"
                  value="DELETED"
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  checked={values.estado === "DELETED"}
                />
              </Form.SelectGroup>
            </Form.Group>
          </Form>
        </Modal>
      </Layout>
    );
  }
}

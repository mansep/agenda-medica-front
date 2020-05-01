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
import Table from "../../components/admin/medical-speciality.table";
import { MedicalSpecialityDto } from "../../api/dto/medical-speciality.dto";
import { MedicalSpeciality } from "../../api/admin/medical-speciality";
import { Modal } from "antd";
import * as Validator from "class-validator";
import { ResponseDto } from "../../api/dto/response.dto";

export default class MedicalSpecialityPage extends Component {
  state = {
    isLoading: true,
    data: [],
    ModalText: "",
    visible: false,
    confirmLoading: false,
    isNew: false,
    esp: {} as MedicalSpecialityDto,
    values: {
        nombre: "",
        estado: "ACTIVE",
        codigo: "",
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
        codigo: "",
      },
      errors: {} as any,
    });
  };

  edit = (esp: MedicalSpecialityDto) => {
    this.setState({
      ModalText: "Editar espacialidad médica",
      visible: true,
      isNew: false,
      esp,
      values: {
        nombre: esp.name,
        codigo: esp.code,
        estado: esp.status,
      },
      errors: {} as any,
    });
  };

  delete = (esp: MedicalSpecialityDto) => {
    swal({
      title: "Deshabilitar especialidad médica",
      text: `¿Está seguro que desea deshabilitar la especialidad médica ${esp.name}?`,
      icon: "warning",
      buttons: ["Cancelar", true],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const result = await MedicalSpeciality.delete(esp.id);
        if (result.error) {
          swal("Error al dehabilitar especialidad médica", result.error, "error");
        } else {
          swal("¡Listo!", "Especialidad médica deshabilitada con éxito", "success");
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
      code: values.codigo,
      status: values.estado,
    };
    if (isNew) {
      result = await MedicalSpeciality.create(espSave);
    } else {
      result = await MedicalSpeciality.update(espSave, esp.id);
    }
    if (result.error) {
      swal("Lo sentimos", result.error.toString(), "error");
      this.setState({
        confirmLoading: false,
      });
      return;
    }
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
      case "codigo": {
        this.setState({ values: { ...values, codigo: evt.target.value } });
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

    if (!Validator.isAlpha(values.codigo, "es-ES")) {
      errors.codigo = "Código invalido";
    } else if (Validator.isEmpty(values.codigo)) {
      errors.codigo = "Debe ingresar código";
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
    const especialidades = await MedicalSpeciality.getAll();
    if (especialidades.error) {
      this.setState({ isLoading: false });
      swal("Lo sentimos", especialidades.error, "error");
      return;
    }
    const data = especialidades.data.map((item) => {
      item.estado = item.status === "ACTIVE" ? "Activa" : "Deshabilitado";
      item.option = (
        <Form.InputGroup append>
          <Button onClick={() => this.edit(item)}>
            <Icon prefix="fe" name="edit-2" />
          </Button>
          {item.status === "ACTIVE" ? (
            <Button onClick={() => this.delete(item)}>
              <Icon prefix="fe" name="eye-off" />
            </Button>
          ) : null}
        </Form.InputGroup>
      );
      return item;
    });
    this.setState({ isLoading: false, data });
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
    } = this.state;

    return (
      <Layout title="Administracion de especialidades médicas">
        <Container>
          <Grid.Row>
            <Grid.Col lg={12}>
              <Card>
                <Card.Header>
                  <Button
                    color="primary"
                    className="float-right margin-left-auto"
                    onClick={this.create}
                  >
                    Nueva espacialidad médica
                  </Button>
                </Card.Header>
                <Card.Body>
                  {isLoading ? (
                    <div className="d-flex justify-content-center">
                      <ReactLoading type="bubbles" color="#316CBE" />
                    </div>
                  ) : (
                    <Table data={data} />
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
              name="codigo"
              label="Código"
              placeholder="ABC"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              value={values && values.codigo}
              error={errors && errors.codigo}
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
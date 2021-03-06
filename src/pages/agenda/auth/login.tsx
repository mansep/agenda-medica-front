import * as React from "react";
import { Formik } from "formik";
import { StandaloneFormPage, FormTextInput } from "tabler-react";
import logo from "../../../assets/logo.png";
import { Auth } from "../../../api/auth";
import { withRouter } from "react-router-dom";
import { ValidateRut } from "../../../api/validate";
import FormCard from "../../../components/form-card";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSession } from "../../../redux/action";
import swal from "sweetalert";
import { Button } from "antd";

type Props = {
  setSession: any;
  history: any;
};

class LoginPage extends React.Component<Props> {
  render() {
    return (
      <Formik
        initialValues={{
          rut: "",
          password: "",
        }}
        validate={(values) => {
          let errors = {} as any;
          if (!values.rut) {
            errors.rut = "Debe ingresar rut";
          }
          if (!ValidateRut.rut(values.rut)) {
            errors.rut = "Rut invalido";
          }
          if (!values.password) {
            errors.password = "Debe ingresar contraseña";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            values.rut = values.rut
              .split(".")
              .join("")
              .split("-")
              .join("")
              .split(" ")
              .join()
              .toUpperCase();
            setSubmitting(true);
            const result = await Auth.login(values);
            if (!result.error) {
              this.props.setSession(result.data);
              localStorage.setItem("session", JSON.stringify(result.data));
              const lastPath = localStorage.getItem("last_path");
              if (lastPath !== null) {
                localStorage.removeItem("last_path");
                this.props.history.push(lastPath);
              } else {
                this.props.history.push("/agenda");
              }
            } else {
              setSubmitting(false);
              swal("Lo sentimos", result.error.toString(), "error");
            }
          } catch (error) {
            setSubmitting(false);
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
          <StandaloneFormPage imageURL={logo}>
            <FormCard
              buttonText={"Ingresar"}
              title={"Acceso de usuario"}
              isLoading={isSubmitting}
              onSubmit={handleSubmit}
            >
              <FormTextInput
                name="rut"
                label="RUT"
                placeholder="12.345.678-9"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values && ValidateRut.runFormat(values.rut)}
                error={errors && errors.rut}
              />
              <FormTextInput
                name="password"
                type="password"
                label="Contraseña"
                placeholder="**********"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values && values.password}
                error={errors && errors.password}
              />
              <a href="/recuperar-contrasena">Recuperar contraseña</a>
            </FormCard>
            <div style={{ textAlign: "center" }}>
              Si no tiene cuenta, <a href="/register">registrese aquí</a>
              <br />
              <Button href="/" className="mt-5">
                Volver al sitio web
              </Button>
            </div>
          </StandaloneFormPage>
        )}
      />
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

export default withRouter(connect(null, mapDispatchToProps)(LoginPage));

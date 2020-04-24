
import * as React from "react";
import { Formik } from "formik";
import { StandaloneFormPage, FormCard, FormTextInput } from "tabler-react";
import logo from "../../assets/logo.png";


function LoginPage() {
    return (
        <Formik
            initialValues={{
                rut: "",
                password: "",
            }}
            validate={values => {
                // same as above, but feel free to move this into a class method now.
                let errors = {};
                if (!values.rut) {
                    errors.rut = "Debe ingresar rut";
                }
                if (!values.password) {
                    errors.password = "Debe ingresar contraseña";
                }
                return errors;
            }}
            onSubmit={(
                values,
                { setSubmitting, setErrors /* setValues and other goodies */ }
            ) => {

                const user = {
                    name: "Manuel",
                    lastName: "Sepulveda",
                    role: "DOCTOR",
                }
                localStorage.setItem("session", JSON.stringify(user));
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
                            onSubmit={handleSubmit}
                        >
                            <FormTextInput
                                name="rut"
                                label="RUT"
                                placeholder="12.345.678-9"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values && values.rut}
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
                        </FormCard>
                    </StandaloneFormPage>
                )}
        />
    );
}

export default LoginPage;
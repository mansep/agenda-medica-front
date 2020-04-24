
import * as React from "react";
import { Formik } from "formik";
import { StandaloneFormPage, FormCard, FormTextInput } from "tabler-react";
import logo from "../../assets/logo.png";


function RegisterPage() {
    return (
        <Formik
            initialValues={{
                nombre: "",
                apellido: "",
                rut: "",
                telefono: "",
                email: "",
                password: "",
            }}
            validate={values => {
                // same as above, but feel free to move this into a class method now.
                let errors = {};
                if (!values.email) {
                    errors.email = "Required";
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
                ) {
                    errors.email = "Invalid email address";
                }
                return errors;
            }}
            onSubmit={(
                values,
                { setSubmitting, setErrors /* setValues and other goodies */ }
            ) => {
                alert("Done!");
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
                            buttonText={"Registrar"}
                            title={"Registro de usuario"}
                            onSubmit={handleSubmit}
                        >
                            <FormTextInput
                                name="nombre"
                                label="Nombres"
                                placeholder="Juan Manuel"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values && values.name}
                                error={errors && errors.name}
                            />
                            <FormTextInput
                                name="apellido"
                                label="Apellidos"
                                placeholder="Perez Gonzales"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values && values.name}
                                error={errors && errors.name}
                            />
                            <FormTextInput
                                name="rut"
                                label="RUT"
                                placeholder="12.345.678-9"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values && values.email}
                                error={errors && errors.email}
                            />
                            <FormTextInput
                                name="nacimiento"
                                label="Fecha Nacimiento"
                                placeholder="01-01-1990"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values && values.email}
                                error={errors && errors.email}
                            />
                            <FormTextInput
                                name="telefono"
                                label="Teléfono"
                                placeholder="+56227890123"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values && values.email}
                                error={errors && errors.email}
                            />

                            <FormTextInput
                                name="celular"
                                label="Celular"
                                placeholder="+56965432198"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values && values.email}
                                error={errors && errors.email}
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

export default RegisterPage;
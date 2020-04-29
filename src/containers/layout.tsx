// @flow

import * as React from "react";
import { NavLink, withRouter } from "react-router-dom";
import logo from "../assets/logo.png";
import { connect } from "react-redux";

import { Site, RouterContextProvider, Page } from "tabler-react";

type Props = {
  title: string;
  session: any;
};
class Layout extends React.Component<Props> {
  state = {};

  render() {
    const { session } = this.props;

    let user;
    let fullName;
    let role;
    try {
      if (session !== null) {
        user = session.userDto;
        fullName = user.name + " " + user.lastName;
        role = user.role;
      }
    } catch {}

    const navBarItems = [
      {
        value: "Inicio",
        to: "/",
        icon: "home",
        LinkComponent: withRouter(NavLink),
        useExact: true,
      },
    ];

    let reservas: any;
    let admin: any;
    let config: any;
    let rol: string = "";
    if (user) {
      switch (role) {
        case "ADMIN": {
          reservas = {
            value: "Reservas",
            icon: "calendar",
            subItems: [
              {
                value: "Crear hora médica",
                to: "/reservas/crear",
                LinkComponent: withRouter(NavLink),
              },
              {
                value: "Mis reservas",
                to: "/reservas",
                LinkComponent: withRouter(NavLink),
              },
              {
                value: "Reservar hora médica",
                to: "/reservas/reservar",
                LinkComponent: withRouter(NavLink),
              },
            ],
          };

          admin = {
            value: "Administración",
            icon: "briefcase",
            subItems: [
              {
                value: "Usuarios",
                to: "/admin/usuarios",
                LinkComponent: withRouter(NavLink),
              },
              {
                value: "Doctores",
                to: "/admin/doctores",
                LinkComponent: withRouter(NavLink),
              },
              {
                value: "Centros médicos",
                to: "/admin/centros-medicos",
                LinkComponent: withRouter(NavLink),
              },
              {
                value: "Especialidades médicas",
                to: "/admin/especialidades-medicas",
                LinkComponent: withRouter(NavLink),
              },
            ],
          };

          config = {
            icon: "cpu",
            value: "Configuración",
            to: "/configuracion",
          };
          rol = "Administrador";
          break;
        }
        case "DOCTOR": {
          reservas = {
            value: "Reservas",
            icon: "calendar",
            subItems: [
              {
                value: "Crear hora médica",
                to: "/reservas/crear",
                LinkComponent: withRouter(NavLink),
              },
              {
                value: "Mis reservas",
                to: "/reservas",
                LinkComponent: withRouter(NavLink),
              },
            ],
          };
          admin = undefined;
          config = undefined;
          rol = "Doctor";
          break;
        }
        case "USER": {
          reservas = {
            value: "Reservas",
            icon: "calendar",
            subItems: [
              {
                value: "Mis reservas",
                to: "/reservas",
                LinkComponent: withRouter(NavLink),
              },
              {
                value: "Reservar hora médica",
                to: "/reservas/reservar",
                LinkComponent: withRouter(NavLink),
              },
            ],
          };
          admin = undefined;
          config = undefined;
          rol = "Paciente";
          break;
        }
        default: {
          reservas = undefined;
          admin = undefined;
          config = undefined;
          rol = "Usuario";
        }
      }
    }
    if (reservas) {
      navBarItems.push(reservas);
    }
    if (admin) {
      navBarItems.push(admin);
    }
    if (config) {
      navBarItems.push(config);
    }

    const accountDropdownProps = {
      avatarURL: "./demo/faces/female/25.jpg",
      name: fullName,
      description: rol,
      options: [
        {
          icon: "user",
          value: "Perfil",
          to: "/perfil",
          LinkComponent: withRouter(NavLink),
        },
        { isDivider: true },
        {
          icon: "log-out",
          value: "Cerrar sesión",
          to: "/logout",
          LinkComponent: withRouter(NavLink),
        },
      ],
    };

    return (
      <Site.Wrapper
        headerProps={{
          href: "/",
          alt: "Agenda médica",
          imageURL: logo,
          accountDropdown: accountDropdownProps,
        }}
        navProps={{ itemsObjects: navBarItems }}
        routerContextComponentType={withRouter(RouterContextProvider)}
        footerProps={{
          copyright: (
            <React.Fragment>
              Copyright © 2020 - Manuel Sepúlveda Durán - Trabajo de título.
            </React.Fragment>
          ),
        }}
      >
        <Page.Content title={this.props.title}>
          {this.props.children}
        </Page.Content>
      </Site.Wrapper>
    );
  }
}

const mapStateToProps = (state: any) => {
  const { reducers } = state;
  return { session: reducers.session };
};
export default withRouter(connect(mapStateToProps)(Layout));

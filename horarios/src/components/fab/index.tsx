import React from "react";
import {FabProps, FabState} from "components/fab/types";
import {Button, Modal, Typography} from "antd";
import Icon from "@mdi/react";
import * as MDI from "@mdi/js";
import {withRouter} from "react-router-dom";
import "./fab.less";
import {fabReducer, initialState} from "components/fab/reducers";
import {cambiarModalVisible, CONNECTOR} from "components/fab/actions";

class Fab extends React.Component<FabProps, FabState> {
  constructor(props: FabProps) {
    super(props);
    this.state = initialState;
  }

  render() {
    const {Title, Paragraph, Text} = Typography;

    return <>
      <Button
        className="fab" type="primary" shape="round" size="large"
        icon={<Icon path={MDI.mdiHelpCircleOutline} size={0.8} className="icon-mtop"/>}
        onClick={() => this.setState(fabReducer(this.state, cambiarModalVisible(true)))}
      >
        Ayuda
      </Button>

      <Modal
        title="Guía de uso"
        width={1000}
        visible={this.state.visible}
        onCancel={() => this.setState(fabReducer(this.state, cambiarModalVisible(false)))}
        footer={<Button onClick={() => this.setState(fabReducer(this.state, cambiarModalVisible(false)))}>
          Cerrar
        </Button>}
      >
        <Typography>
          <Title level={4}>1. Seleccionar las asignaturas</Title>
          <Paragraph>
            Para seleccionar las asignaturas sobre las que ver el horario, en la <Text strong>página <Text code>Ajustes
            </Text></Text> hay que pulsar el botón <Text keyboard>X Asignaturas</Text> (siendo <Text keyboard>X</Text>
            un número).
          </Paragraph>
          <Paragraph>
            Entonces se abrirá un desplegable desde el lado derecho de la pantalla, con un <Text strong>selector de
            asignaturas</Text>. Están agrupadas por curso, y se pueden expandir. Marcando las casillas ya se añadirán
            las asignaturas automáticamente a la tabla.
          </Paragraph>
          <Title level={4}>2. Seleccionar los grupos</Title>
          <Paragraph>
            Tras cerrar el desplegable, en la tabla se verán las asignaturas seleccionadas. Hay tres columnas, una por
            cada tipo de clase: <Text strong>Expositivas <Text code>CLE</Text></Text>, <Text strong>Seminarios
            <Text code>CLIS</Text></Text> e <Text strong>Interactivas <Text code>CLIL</Text></Text>. <Text italic>Si en
            algún tipo de clase no aparecen grupos para seleccionar, es porque esa asignatura no tiene ese tipo de
            clase.</Text>
          </Paragraph>
          <Paragraph>
            Debajo de la selección de grupos aparece la selección de la rotación en caso de haberlas. Tanto en la
            selección de grupos como en la de rotación, <Text strong>si sólo hay un grupo/rotación ya se seleccionará
            automáticamente</Text>.
          </Paragraph>
          <Paragraph>
            <Text mark>Para agilizar la selección de grupos, se puede <Text strong>escribir en el campo de texto ambos
            apellidos y darle a <Text keyboard>Aplicar</Text> para seleccionar los grupos correspondientes
            automáticamente</Text>.</Text> Esto de-seleccionará los grupos previamente seleccionados.
          </Paragraph>
          <Title level={4}>3. Ver el horario</Title>
          <Paragraph>
            Una vez se han seleccionado todos los grupos, clicando en la pestaña <Text keyboard>Horario</Text>. Se
            comenzarán a descargar las clases, festivos, grupos, etc., para visualizar el horario. Cuando acabe se
            mostrará el horario por semanas (o una agenda en caso de ser móvil).
          </Paragraph>
          <Paragraph>
            Se puede visualizar el horario en <Text strong>modo Agenda</Text>, por <Text strong>Semana</Text> o por
            <Text strong>Mes</Text>. También se mostrarán los exámenes en período de exámenes. Hay colores diferentes
            por asignatura, por período y por tipo de clase.
          </Paragraph>
          <Title level={5}>Acceder sin conexión</Title>
          <Paragraph>
            Una vez se ha generado el primer horario, es posible acceder a él sin conexión, y se <Text strong>mostrará
            la última versión disponible</Text>.
          </Paragraph>
          <Paragraph>
            <Text strong>La URL del horario es <Text italic>compartible</Text></Text>: cualquiera que acceda a ella
            directamente descargará las mismas asignaturas y grupos.
          </Paragraph>
        </Typography>
      </Modal>
    </>;
  }
}

export default CONNECTOR(withRouter(Fab));

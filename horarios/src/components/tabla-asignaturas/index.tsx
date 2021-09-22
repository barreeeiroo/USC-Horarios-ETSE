import React from "react";
import {TablaAsignaturasProps, TablaAsignaturasState} from "components/tabla-asignaturas/types";
import {withRouter} from "react-router-dom";
import {CONNECTOR} from "components/tabla-asignaturas/actions";
import {initialState} from "components/tabla-asignaturas/reducers";
import {Table, Tooltip, Typography} from "antd";
import {ColumnProps} from "antd/lib/table";
import Asignatura from "models/asignatura";
import {cursosCardinales} from "models/enums";

class TablaAsignaturas extends React.Component<TablaAsignaturasProps, TablaAsignaturasState> {
  constructor(props: TablaAsignaturasProps) {
    super(props);
    this.state = initialState;
  }

  render() {
    const columns: ColumnProps<Asignatura>[] = [
      {
        title: 'Curso',
        dataIndex: 'curso',
        key: 'curso',
        sorter: {
          compare: (a, b) => a.curso - b.curso,
          multiple: 3
        },
        align: "center",
        render: (s: string, a: Asignatura) => <Typography.Text>{cursosCardinales[a.curso - 1]}</Typography.Text>
      },
      {
        title: 'Cuatrimestre',
        dataIndex: 'periodo',
        key: 'periodo',
        sorter: {
          compare: (a, b) => (a.periodo > b.periodo) ? 1 : ((b.periodo > a.periodo) ? -1 : 0),
          multiple: 2
        },
        align: "center",
        render: (s: string, a: Asignatura) => <Typography.Text>{a.periodo}</Typography.Text>
      },
      {
        title: 'Nombre',
        dataIndex: 'nombre',
        key: 'nombre',
        sorter: {
          compare: (a, b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0),
          multiple: 1
        },
        render: (s: string, a: Asignatura) => <Tooltip title={a.codigo} placement="top">
          <Typography.Text strong>{a.nombre}</Typography.Text>
        </Tooltip>
      },
      {
        title: 'Expositivas',
        dataIndex: 'cle',
        key: 'cle',
        sorter: false,
        align: "center",
        render: (s: string, a: Asignatura) => <></>
      },
      {
        title: 'Seminarios',
        dataIndex: 'clis',
        key: 'clis',
        sorter: false,
        align: "center",
        render: (s: string, a: Asignatura) => <></>
      },
      {
        title: 'Interactivas',
        dataIndex: 'clil',
        key: 'clil',
        sorter: false,
        align: "center",
        render: (s: string, a: Asignatura) => <></>
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={this.props.seleccionadas}
        rowKey={r => r.abreviatura}
        loading={this.props.cargando}
        size="large"
        pagination={false}
        scroll={{x: 720}}
        showSorterTooltip={false}
      />
    );
  }
}


export default CONNECTOR(withRouter(TablaAsignaturas));

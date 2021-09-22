import React from "react";
import {TablaAsignaturasProps, TablaAsignaturasState} from "components/tabla-asignaturas/types";
import {withRouter} from "react-router-dom";
import {CONNECTOR} from "components/tabla-asignaturas/actions";
import {initialState} from "components/tabla-asignaturas/reducers";
import {Radio, Table, Tooltip, Typography} from "antd";
import {ColumnProps} from "antd/lib/table";
import Asignatura from "models/asignatura";
import {TiposClase} from "models/enums";
import {Grupo} from "models/grupo";
import {Clase} from "models/clase";

class TablaAsignaturas extends React.Component<TablaAsignaturasProps, TablaAsignaturasState> {
  constructor(props: TablaAsignaturasProps) {
    super(props);
    this.state = initialState;

    this.generarSelectorGrupos = this.generarSelectorGrupos.bind(this);
  }

  private generarSelectorRotacion(asignatura: Asignatura, tipo: TiposClase): JSX.Element {
    // TODO
    return <></>;
  }

  private generarSelectorGrupos(asignatura: Asignatura, tipo: TiposClase): JSX.Element {
    let asignaturaCompleta = this.props.asignaturas.find(a => a.abreviatura === asignatura.abreviatura);
    if (asignaturaCompleta === undefined) {
      return <></>;
    }

    // Extraer todas las clases
    let clases: Clase[] = asignaturaCompleta.clases.filter(c => c.tipo === tipo);
    if (clases.length === 0) {
      return <></>;
    }

    // Extraer todos los grupos
    let grupos: Grupo[] = [];
    clases.forEach(clase => clase.grupos.forEach(grupo => {
      let found = false;
      grupos.forEach(g => {
        if (JSON.stringify(g) === JSON.stringify(grupo)) found = true;
      })
      if (!found) grupos.push(grupo);
    }));

    let gruposValidos: {
      grupos: Grupo[],
      inicio: string,
      fin: string
    }[] = [];
    grupos.forEach(grupo => {
      while (gruposValidos.length < grupo.grupo) {
        gruposValidos.push({grupos: [], inicio: "", fin: ""});
      }

      let grupoReal = gruposValidos[grupo.grupo - 1];
      grupoReal.grupos.push(grupo);
      if (grupoReal.inicio === "" || grupo.inicio < grupoReal.inicio) {
        grupoReal.inicio = grupo.inicio
      }
      if (grupoReal.fin === "" || grupo.fin > grupoReal.fin) {
        grupoReal.fin = grupo.fin;
      }
    });

    gruposValidos.sort((a,b) => (a.inicio > b.inicio) ? 1 : ((b.inicio > a.inicio) ? -1 : 0));
    return <Radio.Group buttonStyle="outline" onChange={e => console.log(e.target.value)}>
      {gruposValidos.map((g, key) => <Radio.Button value={"" + (key + 1)} key={key}>
        {g.inicio} - {g.fin}
      </Radio.Button>)}
    </Radio.Group>;
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
        render: (s: string, a: Asignatura) => <Typography.Text>{a.curso}º</Typography.Text>
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
        render: (s: string, a: Asignatura) => this.generarSelectorGrupos(a, 'CLE')
      },
      {
        title: 'Seminarios',
        dataIndex: 'clis',
        key: 'clis',
        sorter: false,
        align: "center",
        render: (s: string, a: Asignatura) => this.generarSelectorGrupos(a, 'CLIS')
      },
      {
        title: 'Interactivas',
        dataIndex: 'clil',
        key: 'clil',
        sorter: false,
        align: "center",
        render: (s: string, a: Asignatura) => this.generarSelectorGrupos(a, 'CLIL')
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

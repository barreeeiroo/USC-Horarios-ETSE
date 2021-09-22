import React from "react";
import {TablaAsignaturasProps, TablaAsignaturasState} from "components/tabla-asignaturas/types";
import {initialState} from "components/tabla-asignaturas/reducers";
import {Col, Radio, Row, Table, Tooltip, Typography} from "antd";
import {ColumnProps} from "antd/lib/table";
import Asignatura from "models/asignatura";
import {TiposClase} from "models/enums";
import {Grupo} from "models/grupo";
import {Clase} from "models/clase";
import {CONNECTOR} from "components/tabla-asignaturas/actions";
import {withRouter} from "react-router-dom";
import './tabla-asignaturas.less';

class TablaAsignaturas extends React.Component<TablaAsignaturasProps, TablaAsignaturasState> {
  constructor(props: TablaAsignaturasProps) {
    super(props);
    this.state = initialState;

    this.generarSelectorGrupos = this.generarSelectorGrupos.bind(this);
    this.seleccionarGrupo = this.seleccionarGrupo.bind(this);
    this.generarSelectorRotaciones = this.generarSelectorRotaciones.bind(this);
  }

  private generarSelectorGrupos(asignatura: Asignatura, tipo: TiposClase): JSX.Element {
    // Extraer la asignatura original
    let asignaturaOriginal = this.props.asignaturas.find(a => a.abreviatura === asignatura.abreviatura);
    if (asignaturaOriginal === undefined) {
      return <></>;
    }

    // Extraer todas las clases
    let clases: Clase[] = asignaturaOriginal.clases.filter(c => c.tipo === tipo);
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

    let numGrupo: number | undefined = asignatura.clases.filter(c => c.tipo === tipo)[0]?.grupo || undefined;
    let hayRotaciones = false;
    if (numGrupo !== undefined) {
      let grupos = asignaturaOriginal.clases.filter(c => c.tipo === tipo && c.grupo === numGrupo)[0].grupos;
      if (grupos.length > 0 && grupos[0].rotacion !== undefined) {
        hayRotaciones = true;
      }
    }

    gruposValidos.sort((a, b) => (a.inicio > b.inicio) ? 1 : ((b.inicio > a.inicio) ? -1 : 0));
    return <Radio.Group
      buttonStyle={hayRotaciones ? "solid" : "outline"}
      onChange={e => this.seleccionarGrupo(asignatura, tipo, e.target.value)}
      value={numGrupo}
    >
      {gruposValidos.map((g, key) => {
        return <Radio.Button value={key + 1} key={key}>
          {g.inicio} - {g.fin}
        </Radio.Button>
      })}
    </Radio.Group>;
  }

  private generarSelectorRotaciones(asignatura: Asignatura, tipo: TiposClase): JSX.Element {
    if (asignatura.clases.filter(c => c.tipo === tipo).length === 0) {
      return <></>;
    }

    // Extraer la asignatura original
    let asignaturaOriginal = this.props.asignaturas.find(a => a.abreviatura === asignatura.abreviatura);
    if (asignaturaOriginal === undefined) {
      return <></>;
    }

    // Extraer todas las clases
    let clases: Clase[] = asignaturaOriginal.clases.filter(c => c.tipo === tipo);
    if (clases.length === 0) {
      return <></>;
    }

    let numGrupo = asignatura.clases.filter(c => c.tipo === tipo)[0].grupo;
    let rotacion = asignatura.clases.filter(c => c.tipo === tipo)[0].grupos[0]?.rotacion || undefined;
    // Extraer todos los grupos
    let grupos: Grupo[] = [];
    clases.forEach(clase => clase.grupos.forEach(grupo => {
      let found = false;
      grupos.forEach(g => {
        if (JSON.stringify(g) === JSON.stringify(grupo)) found = true;
      })
      if (!found && grupo.grupo === numGrupo) grupos.push(grupo);
    }));

    grupos.sort((a, b) => (a.inicio > b.inicio) ? 1 : ((b.inicio > a.inicio) ? -1 : 0));
    return <Radio.Group
      buttonStyle={"outline"}
      onChange={e => this.seleccionarRotacion(asignatura, tipo, numGrupo, e.target.value)}
      value={rotacion}
    >
      {grupos.map((g, key) => {
        return <Radio.Button value={g.rotacion} key={key} className={'selector-rotaciones'}>
          {g.inicio} - {g.fin}
        </Radio.Button>
      })}
    </Radio.Group>;
  }

  private seleccionarGrupo(asignatura: Asignatura, tipo: TiposClase, nGrupo: number) {
    let asignaturaOriginal = this.props.asignaturas.find(a => a.abreviatura === asignatura.abreviatura);
    if (asignaturaOriginal === undefined) {
      return;
    }

    // Extraer todas las clases
    let clases: Clase[] = asignaturaOriginal.clases.filter(c => c.tipo === tipo && c.grupo === nGrupo);
    if (clases.length === 0) {
      return;
    }

    let i = asignatura.clases.length;
    while (i--) {
      if (asignatura.clases[i].tipo === tipo) {
        asignatura.clases.splice(i, 1);
      }
    }

    clases.forEach(clase => {
      clase = JSON.parse(JSON.stringify(clase));
      if (clase.grupos.length > 1) clase.grupos = [];
      asignatura.clases.push(clase);
    });

    this.props.guardar(this.props.matricula);
  }

  private seleccionarRotacion(asignatura: Asignatura, tipo: TiposClase, nGrupo: number, rotacion: string) {
    let asignaturaOriginal = this.props.asignaturas.find(a => a.abreviatura === asignatura.abreviatura);
    if (asignaturaOriginal === undefined) {
      return;
    }

    console.log(asignatura.abreviatura, tipo, nGrupo, rotacion);

    // Extraer todas las clases
    let clases: Clase[] = asignaturaOriginal.clases.filter(c => c.tipo === tipo && c.grupo === nGrupo);
    if (clases.length === 0) {
      return;
    }

    // Extraer todos los grupos
    let grupos: Grupo[] = [];
    clases.forEach(clase => clase.grupos.forEach(grupo => {
      grupos.push(grupo);
    }));

    asignatura.clases.filter(c => c.tipo === tipo && c.grupo === nGrupo).forEach(clase => {
      clase.grupos = [];
      grupos.filter(g => g.rotacion === rotacion).forEach(grupo => clase.grupos.push(grupo));
    });

    this.props.guardar(this.props.matricula);
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
        render: (s: string, a: Asignatura) => <>
          <Row><Col span={24}>{this.generarSelectorGrupos(a, 'CLE')}</Col></Row>
          <Row><Col span={24}>{this.generarSelectorRotaciones(a, 'CLE')}</Col></Row>
        </>
      },
      {
        title: 'Seminarios',
        dataIndex: 'clis',
        key: 'clis',
        sorter: false,
        align: "center",
        render: (s: string, a: Asignatura) => <>
          <Row><Col span={24}>{this.generarSelectorGrupos(a, 'CLIS')}</Col></Row>
          <Row><Col span={24}>{this.generarSelectorRotaciones(a, 'CLIS')}</Col></Row>
        </>
      },
      {
        title: 'Interactivas',
        dataIndex: 'clil',
        key: 'clil',
        sorter: false,
        align: "center",
        render: (s: string, a: Asignatura) => <>
          <Row><Col span={24}>{this.generarSelectorGrupos(a, 'CLIL')}</Col></Row>
          <Row><Col span={24}>{this.generarSelectorRotaciones(a, 'CLIL')}</Col></Row>
        </>
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={this.props.matricula}
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

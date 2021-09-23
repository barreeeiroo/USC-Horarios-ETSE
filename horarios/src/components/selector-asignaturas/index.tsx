import React from "react";
import {SelectorAsignaturasProps, SelectorAsignaturasState} from "components/selector-asignaturas/types";
import {Drawer, Input, Tree, Typography} from "antd";
import {initialState, selectorAsignaturasReducer} from "components/selector-asignaturas/reducers";
import {cambiarFiltroAsignaturas, CONNECTOR} from "components/selector-asignaturas/actions";
import {TreeNode} from "models/ant";
import Asignatura from "models/asignatura";
import {cursosCardinales, tiposClase} from "models/enums";
import {withRouter} from "react-router-dom";
import './selector-asignaturas.less';
import {busquedaAlfanumerica} from "utils/standarization";

class SelectorAsignaturas extends React.Component<SelectorAsignaturasProps, SelectorAsignaturasState> {
  constructor(props: SelectorAsignaturasProps) {
    super(props);
    this.state = initialState;

    this.cambiarFiltroMaterias = this.cambiarFiltroMaterias.bind(this);
    this.notificarAsignaturasSeleccionadas = this.notificarAsignaturasSeleccionadas.bind(this);
  }

  private cambiarFiltroMaterias(v: string) {
    this.setState(selectorAsignaturasReducer(this.state, cambiarFiltroAsignaturas(v)));
  }

  private notificarAsignaturasSeleccionadas(keys: any) {
    let asignaturas: Asignatura[] = [];
    keys.forEach((key: string | number) => {
      switch (typeof key) {
        case "string":
          let asignaturaOriginal = this.props.asignaturas.find(a => a.abreviatura === key);
          let asignatura = JSON.parse(JSON.stringify(asignaturaOriginal));
          if (asignatura !== undefined) {
            // En caso de ya estar seleccionada la asignatura, intentar mantener las clases seleccionadas
            asignatura.clases = this.props.seleccionadas.find(a => a.abreviatura === asignatura.abreviatura)?.clases || [];

            // Comprobar para cada tipo de clase si sólo hay un grupo
            tiposClase.forEach(tipo => {
              if (asignatura !== undefined && asignaturaOriginal !== undefined) {
                let clases = asignaturaOriginal.clases.filter(c => c.tipo === tipo);

                // Extraer el número de grupos
                let numGrupos: number[] = [];
                clases.forEach(clase => {
                  if (numGrupos.indexOf(clase.grupo) === -1) {
                    numGrupos.push(clase.grupo);
                  }
                });

                // Si solo hay uno, matricular automáticamente en todas las clases del mismo tipo
                if (numGrupos.length === 1) {
                  clases.forEach(clase => {
                    clase = JSON.parse(JSON.stringify(clase));
                    // En caso de haber más de un grupo en la misma clase, es porque hay rotaciones
                    // Por lo tanto, debemos o bien vaciar el array o mantener la rotación seleccionada
                    if (clase.grupos.length > 1) clase.grupos = this.props.seleccionadas
                      .find(a => a.abreviatura === asignatura.abreviatura)?.clases
                      .filter(c => c.tipo === clase.tipo)[0]?.grupos || [];
                    asignatura.clases.push(clase);
                  });
                }
              }
            });

            asignaturas.push(asignatura);
          }
          break;

        case "number":
        default:
          break;
      }
    });
    this.props.guardar(asignaturas);
  }

  render() {
    return (
      <Drawer
        title="Buscador de materias"
        placement="right"
        closable
        className="asignaturas"
        onClose={() => this.props.cerrar()}
        visible={this.props.visible}
        key="1"
      >
        <Input.Search
          allowClear style={{marginBottom: 8}} placeholder="Buscar asignaturas..."
          value={this.state.filtro}
          onChange={e => this.cambiarFiltroMaterias(e.target.value)}
        />
        <Tree
          selectable={false}
          checkable showLine={{showLeafIcon: false}}
          onCheck={this.notificarAsignaturasSeleccionadas}
          checkedKeys={this.props.seleccionadas.map(a => a.abreviatura)}
          treeData={SelectorAsignaturas.generarTree(this.props.asignaturas, this.state.filtro)}
        />
      </Drawer>
    );
  }

  private static asignaturaTreeTitulo(asignatura: Asignatura): JSX.Element {
    return <>
      <Typography.Text keyboard>
        {asignatura.periodo}
      </Typography.Text>{" "}
      <Typography.Text>{asignatura.nombre}</Typography.Text>
    </>;
  }

  private static cursoTreeTitulo(curso: number): JSX.Element {
    return <>
      <Typography.Text strong>{cursosCardinales[curso]} Curso</Typography.Text>
    </>;
  }

  private static generarTreeAsignaturas(asignaturas: Asignatura[], filtro: string): TreeNode[] {
    return asignaturas.filter(asignatura => {
      if (filtro.length < 3) return true;

      return busquedaAlfanumerica(asignatura.nombre).includes(busquedaAlfanumerica(filtro)) ||
        busquedaAlfanumerica(asignatura.abreviatura).includes(busquedaAlfanumerica(filtro));
    })
      .map(asignatura => {
        return {
          key: asignatura.abreviatura,
          title: SelectorAsignaturas.asignaturaTreeTitulo(asignatura),
          checkable: true,
          isLeaf: true
        }
      });
  }

  private static generarTree(asignaturas: Asignatura[], filtro: string): TreeNode[] {
    let cursos: Asignatura[][] = [];
    asignaturas.sort((a, b) => (a.periodo > b.periodo) ? 1 : ((b.periodo > a.periodo) ? -1 : ((a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0))));
    asignaturas.forEach(asignatura => {
      while (cursos.length < asignatura.curso) {
        cursos.push([]);
      }
      cursos[asignatura.curso - 1].push(asignatura);
    });

    return cursos.map((curso, key) => {
      return {
        key: key,
        title: SelectorAsignaturas.cursoTreeTitulo(key),
        checkable: true,
        children: SelectorAsignaturas.generarTreeAsignaturas(curso, filtro)
      }
    });
  }
}

export default CONNECTOR(withRouter(SelectorAsignaturas));

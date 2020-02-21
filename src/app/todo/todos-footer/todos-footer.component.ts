import { Component, OnInit } from '@angular/core';
import * as fromFiltro from '../../filter/filter.actions';
import * as fromTodo from '../todo.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { Todo } from '../model/todo.model';

@Component({
  selector: 'app-todos-footer',
  templateUrl: './todos-footer.component.html',
  styles: []
})
export class TodosFooterComponent implements OnInit {

  filtrosValidos: fromFiltro.filtrosValidos[] = ['todos', 'completados', 'pendientes'];
  filtroActual: fromFiltro.filtrosValidos;
  pendientes: number;


  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.subscribe(state => {
      this.contarPendientes( state.todos );
      this.filtroActual = state.filtro;
    });
  }

  cambiarFiltro(nuevoFitro: fromFiltro.filtrosValidos) {
    const accion = new fromFiltro.SetFiltroAction(nuevoFitro);
    this.store.dispatch( accion );
  }

  contarPendientes( todos: Todo[]) {
    this.pendientes = todos.filter( todo => !todo.completado).length;
  }

  limpiarCompletados() {
    const accion = new fromTodo.BorrarCompletedTodoAction();
    this.store.dispatch (accion);
  }

}

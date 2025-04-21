import React, { useEffect } from 'react';
import { TodoListTypes } from './todo-list.types';
import { TodoItemComponent } from '../todo-Item/todo-item.component';
import { Todo } from '../../types/Todo';
import { deleteTodo } from '../../api/todos';
import { text } from '../../constants/text';

export const TodoListComponent: React.FC<TodoListTypes> = ({
  todos,
  setTodos,
  setCustomError,
  customError,
  loadingId,
  handleLoaderId,
  titleField,
}) => {
  const deleteTodoHandler = (todo: Todo) => {
    setCustomError('');
    handleLoaderId(todo);

    deleteTodo(todo.id)
      .then(() => {
        setTodos(prevState =>
          prevState.filter(currentTodo => currentTodo.id !== todo.id),
        );
        setTimeout(() => {
          if (titleField.current) {
            titleField.current.focus();
          }
        }, 0);
        handleLoaderId(todo);
      })
      .catch(err => {
        setCustomError(text.unableToDeleteTodo);
        handleLoaderId(todo);
        setTimeout(() => {
          if (titleField.current) {
            titleField.current.focus();
          }
        }, 0);
        throw new Error(err);
      });
  };

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;

    if (customError) {
      timerId = setTimeout(() => setCustomError(''), 3000);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [customError, setCustomError]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.length > 0 &&
        todos.map(todo => (
          <TodoItemComponent
            loadingId={loadingId}
            key={todo.id}
            todo={todo}
            deleteTodoHandler={deleteTodoHandler}
          />
        ))}

      {/*/!* This todo is an active todo *!/*/}
      {/*<div data-cy="Todo" className="todo">*/}
      {/*  <label className="todo__status-label">*/}
      {/*    <input*/}
      {/*      data-cy="TodoStatus"*/}
      {/*      type="checkbox"*/}
      {/*      className="todo__status"*/}
      {/*    />*/}
      {/*  </label>*/}

      {/*  <span data-cy="TodoTitle" className="todo__title">*/}
      {/*    Not Completed Todo*/}
      {/*  </span>*/}
      {/*  <button type="button" className="todo__remove" data-cy="TodoDelete">*/}
      {/*    ×*/}
      {/*  </button>*/}

      {/*  <div data-cy="TodoLoader" className="modal overlay">*/}
      {/*    <div className="modal-background has-background-white-ter" />*/}
      {/*    <div className="loader" />*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/*/!* This todo is being edited *!/*/}
      {/*<div data-cy="Todo" className="todo">*/}
      {/*  <label className="todo__status-label">*/}
      {/*    <input*/}
      {/*      data-cy="TodoStatus"*/}
      {/*      type="checkbox"*/}
      {/*      className="todo__status"*/}
      {/*    />*/}
      {/*  </label>*/}

      {/*  /!* This form is shown instead of the title and remove button *!/*/}
      {/*  <form>*/}
      {/*    <input*/}
      {/*      data-cy="TodoTitleField"*/}
      {/*      type="text"*/}
      {/*      className="todo__title-field"*/}
      {/*      placeholder="Empty todo will be deleted"*/}
      {/*      value="Todo is being edited now"*/}
      {/*    />*/}
      {/*  </form>*/}

      {/*  <div data-cy="TodoLoader" className="modal overlay">*/}
      {/*    <div className="modal-background has-background-white-ter" />*/}
      {/*    <div className="loader" />*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/*/!* This todo is in loadind state *!/*/}
      {/*<div data-cy="Todo" className="todo">*/}
      {/*  <label className="todo__status-label">*/}
      {/*    <input*/}
      {/*      data-cy="TodoStatus"*/}
      {/*      type="checkbox"*/}
      {/*      className="todo__status"*/}
      {/*    />*/}
      {/*  </label>*/}

      {/*  <span data-cy="TodoTitle" className="todo__title">*/}
      {/*    Todo is being saved now*/}
      {/*  </span>*/}

      {/*  <button type="button" className="todo__remove" data-cy="TodoDelete">*/}
      {/*    ×*/}
      {/*  </button>*/}

      {/*  /!* 'is-active' class puts this modal on top of the todo *!/*/}
      {/*  <div data-cy="TodoLoader" className="modal overlay is-active">*/}
      {/*    <div className="modal-background has-background-white-ter" />*/}
      {/*    <div className="loader" />*/}
      {/*  </div>*/}
      {/*</div>*/}
    </section>
  );
};

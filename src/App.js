import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { FaEdit, FaTrash, FaCheck, FaHeart } from 'react-icons/fa';

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');

  useEffect(() => {
    setTodos([
      {
        todo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
        done: false,
        edit: false,
      },
      {
        todo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        done: true,
        edit: false,
      }
    ]);
  }, []);

  const onChange = event => {
    setTodo(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();

    if (todo) {
      setTodos(prevState => ([...prevState, {
        todo: todo,
        done: false,
      }]));

      setTodo('');
    }
  };

  const deleteTodo = _index => setTodos(prevState => (prevState.filter((_, index) => index !== _index)));

  const updateStatus = _index => {
    const _todos = [...todos];
    _todos[_index].done = !_todos[_index].done;
    setTodos(_todos);
  };

  const editTodo = _index => {
    const _todos = [...todos];

    if (_todos[_index].todo) {
      _todos[_index].edit = !_todos[_index].edit;
      setTodos(_todos);
    } else {
      deleteTodo(_index);
    }
  };

  const onTodoTextAreaChange = _index => event => {
    const _todos = [...todos];
    _todos[_index].todo = event.target.value;

    setTodos(_todos);
  };

  const clearCompleted = () => setTodos(prevState => (prevState.filter(_todo => !_todo.done)));

  return (
    <div className="App">
      <div className="columns is-centered mt-3">
        <div className="column is-half">
          <form className="box" onSubmit={onSubmit}>
            <div className="field">
              <div className="control">
                <input 
                  type="text"
                  value={todo}
                  onChange={onChange}
                  className="input" 
                  placeholder="What do you need to get done?"
                />
              </div>
            </div>
          </form>
          {todos.length ? (
            <div className="mt-1 box">
              {todos.map((_todo, index) => (
                <div key={index} className="mb-4 is-flex is-justify-content-space-between">
                  <div style={{ width: '90%' }}>
                    {_todo.edit ? (
                      <textarea class="textarea" onChange={onTodoTextAreaChange(index)} value={_todo.todo} />
                    ) : (
                      <p className={_todo.done ? 'has-text-primary' : undefined} onClick={() => updateStatus(index)} style={_todo.done ? { textDecoration: 'line-through' } : undefined}>{_todo.todo}</p>
                    )}
                  </div>
                  <div style={{ width: '10%' }} className="is-flex is-justify-content-end">
                    {_todo.edit ? (
                      <>
                        <button className="button is-ghost p-2" onClick={() => editTodo(index)}><FaCheck /></button>
                      </>
                    ) : (
                      <>
                        <button className="button is-ghost p-2" onClick={() => deleteTodo(index)}><FaTrash /></button>
                        <button className="button is-ghost p-2" onClick={() => editTodo(index)}><FaEdit /></button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : <div className="box mt-5 mb-5 is-flex is-justify-content-center is-align-items-center"><p>No Todo</p></div>}
          <div className="mt-1 box is-flex is-justify-content-space-between is-align-items-center">
            <p>{todos.filter(_todo => _todo.done).length}/{todos.length} Completed</p>
            <button className="button is-ghost p-2" onClick={clearCompleted}>Clear Completed</button>
          </div>
          <div className="box mt-5 mb-5 is-flex is-justify-content-center is-align-items-center">
            <p>Created by Carl</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

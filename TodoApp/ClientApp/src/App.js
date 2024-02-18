import React from 'react';
import { TodoProvider } from './TodoContext';
import Layout from './components/Layout';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import Title from './components/Title';
import './styles.css';

const App = function(props) {
  return (
    <TodoProvider>
      <Layout>
        <Title />
        <TodoInput />
        <TodoList />
      </Layout>
    </TodoProvider>
  );
}

export default App;

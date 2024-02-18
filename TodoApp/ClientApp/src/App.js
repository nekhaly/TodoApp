import React from 'react';
import Layout from './components/Layout';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import Title from './components/Title';
import './styles.css';

const App = function(props) {
  return (
    <Layout>
      <Title />
      <TodoInput />
      <TodoList />
    </Layout>
  );
}

export default App;

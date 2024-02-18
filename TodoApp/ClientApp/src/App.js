import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { TodoProvider } from './TodoContext';
import Layout from './components/Layout';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import Title from './components/Title';

import './styles.css';

library.add(fas, far);

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

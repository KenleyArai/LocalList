import React from 'react';
import ReactDOM from 'react-dom';

import TodoBox from './TodoBox';

ReactDOM.render( 
  <TodoBox 
      url='http://localhost:3002/api/todos'
      pollInterval={ 2000 } />,
  document.getElementById('root')
);
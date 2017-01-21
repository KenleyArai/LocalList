// TODO: Convert to todo list form

import React from 'react';
import ReactDOM from 'react-dom';

// TODO: Convert to todo form
import CommentBox from './CommentBox';

ReactDOM.render( <
  CommentBox url = 'http://localhost:3002/api/comments'
  pollInterval = {
    2000
  }
  />,
  document.getElementById('root')
);
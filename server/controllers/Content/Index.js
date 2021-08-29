const express = require('express');
const content = express();
const { allContent, detailContent, createContent, retouchContent, deleteContent } = require('./ContentList');
const { close } = require('./ContentClose');
const { agree, disagree } = require('./ContentChoice');

content.get('/', allContent);
content.get('/:id', detailContent);
content.post('/', createContent);
content.patch('/:id', retouchContent);
content.delete('/:id', deleteContent);

content.patch('/deadline/:id', close);

//! 나중에 get으로 변경
content.post('/agree/:id', agree);
content.post('/disagree/:id', disagree);

module.exports = content;

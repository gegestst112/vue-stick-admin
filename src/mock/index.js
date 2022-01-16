import Mock from 'mockjs'
import user from './user'

const mocks = [
  ...user
]

function mock(){
  mocks.forEach( e => {
    Mock.mock(
      e.url,
      e.type || 'get',
      e.data
    );
  });
    
  Mock.setup({
    timeout: '300-800'
  });
}

mock()
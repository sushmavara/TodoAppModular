import TodoManager from './Manager'

const App = (function(TodoManager){
    const initializeTodoManager = function(){
        TodoManager.init();
    }
    return {init: initializeTodoManager}
})(TodoManager);

export default App;
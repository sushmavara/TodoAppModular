import {todoActionHeaderSelectors} from '../domSelectors/todoAppActionBarSelector'
import {ACTION_BUTTON_CLASS_NAME} from '../constants/todoActionConstants'

const TodoActionBarController = (function(){

const showDataModal =(TodoManager)=> ()=>{
    const modalAction = event.target.getAttribute("data-modal");
         TodoManager.showAndFillDataModal(modalAction);
    }

    const onClickMarkCompleteSelectedTodo = (TodoManager) => () =>{
        let itemsToUpdate = TodoManager.getIdsOfTodo("isChecked",true);
        let action=ACTION_BUTTON_CLASS_NAME.MARK_COMPLETE_SELECTED;
        TodoManager.modifyTodoItemsOfList(itemsToUpdate,action);
        event.stopPropagation();
    }

    return {
        init : function(ToDoManager){
            todoActionHeaderSelectors.addNewTodoBtn.addEventListener('click',showDataModal(ToDoManager));
            todoActionHeaderSelectors.deleteSelectedTodoBtn.addEventListener('click',showDataModal(ToDoManager));
            todoActionHeaderSelectors.markCompleteOnSelectedTodo.addEventListener('click',onClickMarkCompleteSelectedTodo(ToDoManager));
        }
    }
})();


export default TodoActionBarController;
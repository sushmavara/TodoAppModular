import {todoContainerSelectors} from '../domSelectors/todoAppContainerSelector'
import todoItemTemplate from '../templates/todoElementTemplate'
import {ACTION_BUTTON_CLASS_NAME} from '../constants/todoActionConstants'
import TodoManager from '../controller/Manager'

const TodoItemController = (function(){

    const toggleEmptyContentMessage = function(todoListSize) {
        if(todoListSize){  
            todoContainerSelectors.emptyContent.style.display = "none";
            todoContainerSelectors.toDoListContainer.style.display = "block";
        }else {
            todoContainerSelectors.toDoListContainer.style.display = "none";
            todoContainerSelectors.emptyContent.style.display = "flex";
        }
    }
    
    const renderTodo = function(todoItemObject,htmlToNodeFunction,toDoListContainer){
        let todoTemplate = todoItemTemplate.replace("%id%",todoItemObject.id).
            replace("%title%",todoItemObject.title).
            replace("%description%",todoItemObject.description).
            replace("%dueDate%",todoItemObject.dueDate);
        todoTemplate = todoItemObject.isCompleted ? todoTemplate.replace(/%isComplete%/g," todoComplete"):
                todoTemplate.replace(/%isComplete%/g,"");
        let toDoNode = htmlToNodeFunction(todoTemplate);
        if(todoItemObject.isChecked) toDoNode.querySelector('[data-action = "markTodoChecked"]').checked = true;
        toDoListContainer.appendChild(toDoNode);
    }
    
    const onClickTodoItemWrapper =(TodoManager) => (event) => {
        const itemID = event.target.parentNode.getAttribute('target-id');
        if(itemID){
            const action = event.target.getAttribute('data-action');
            switch(action){
                case ACTION_BUTTON_CLASS_NAME.EDIT_TODO:
                    TodoManager.setActiveTodoToEdit(itemID);
                    TodoManager.showAndFillDataModal(event.target.getAttribute("data-modal"));
                    break;
                case ACTION_BUTTON_CLASS_NAME.CONFIRM_DELETE_TODO:
                case ACTION_BUTTON_CLASS_NAME.MARK_COMPLETE_TODO:
                case ACTION_BUTTON_CLASS_NAME.MARK_TODO_CHECKED:
                    TodoManager.modifyTodoItemsOfList([itemID],action);     
            } 
        }
        event.stopPropagation();
    }

    return {
        init : function(ToDoManager){
            todoContainerSelectors.toDoItemsUlList.addEventListener('click',onClickTodoItemWrapper(ToDoManager));
        },
        renderTodo: renderTodo,
        toggleEmptyContentMessage: toggleEmptyContentMessage
    }
})();

export default TodoItemController;
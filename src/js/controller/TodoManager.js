import TodoItemController from './TodoItemController'
import TodoDataModalController from './TodoDataModalController'
import TodoActionBarController from './TodoActionBarController'
import ToDoItem from '../models/ToDoItem'
import {MODALS_CLASS_NAME} from '../constants/dataModalConstants'
import {MODAL_TEMPLATE} from '../constants/dataModalConstants'
import {ACTION_BUTTON_CLASS_NAME} from '../constants/todoActionConstants'
import { todoContainerSelectors } from '../domSelectors/todoAppContainerSelector';

const ToDoManager = (function(todoItemController,toDoDataModalController,todoActionBarController){
    let activeTodoToEdit = null;
    let toDoListContainer = null;
    let toDoListItems = null;

    const setupTodoData = function(){
        toDoListContainer = todoContainerSelectors.toDoItemsUlList;
        toDoListItems = new Map();
    }
    const setActiveTodoToEdit = function (activeTodoId) {
        activeTodoToEdit = activeTodoId;
    }

    const htmlToElement = function(html) {
        let template = document.createElement('template');
        html = html.trim();
        template.innerHTML = html;
        return template.content.firstChild;
    }

    const modifyTodoItemsOfList = function(todoIdsToModify,action) {
        for( let toDoItemId of todoIdsToModify){
            const todoItemObj = toDoListItems.get(toDoItemId);
            switch(action)
            {
                case ACTION_BUTTON_CLASS_NAME.CONFIRM_DELETE_TODO:
                    toDoListItems.delete(toDoItemId);
                    break;
                case ACTION_BUTTON_CLASS_NAME.MARK_COMPLETE_TODO:
                    todoItemObj.toggleMarkComplete();
                    break;  
                case ACTION_BUTTON_CLASS_NAME.MARK_COMPLETE_SELECTED:
                    todoItemObj.markTodoComplete();
                    break;
                case ACTION_BUTTON_CLASS_NAME.MARK_TODO_CHECKED:
                    todoItemObj.toggleMarkChecked();
            }
        }
        renderTodoList();
    }


    const addNewTodoItem = function(toDoInfo){
        const newTodo = new ToDoItem(toDoInfo);
        toDoListItems.set(newTodo.id,newTodo);
    }

    const updateTodoItem = function(toDoInfo){
        let todoToEdit = toDoListItems.get(activeTodoToEdit);
        todoToEdit.editTodoItem(toDoInfo);
    }

    const showAndFillDataModal = function(modalAction) {
        const modalKeyName = Object.keys(MODALS_CLASS_NAME).find(key => MODALS_CLASS_NAME[key] === modalAction);
        const modalTemplate = MODAL_TEMPLATE[modalKeyName];
        toDoDataModalController.attachDataModal(htmlToElement(modalTemplate),ToDoManager);
        if(activeTodoToEdit){
            toDoDataModalController.fillModal(toDoListItems.get(activeTodoToEdit));
        }
    }

    const getIdsOfTodo = function(filterKey,filterValue){
        return Array.from(toDoListItems.entries()).reduce((result,current)=>{
            if(current[1][filterKey] === filterValue) result.push(current[0]);
            return result;
        },[]);
    }

    const renderTodoList = function(){
        todoItemController.toggleEmptyContentMessage(toDoListItems.size);
        toDoListContainer.innerHTML='';

        for(let todoItemId of toDoListItems.keys()){
            todoItemController.renderTodo(toDoListItems.get(todoItemId),htmlToElement,toDoListContainer);
        }
    }

    const setupEventListeners= function(){
        todoItemController.init(ToDoManager);
        todoActionBarController.init(ToDoManager);
    }

    return {
        init: function (){
            setupEventListeners();
            setupTodoData() },
        setActiveTodoToEdit : setActiveTodoToEdit,
        modifyTodoItemsOfList: modifyTodoItemsOfList,
        addNewTodoItem: addNewTodoItem,
        updateTodoItem: updateTodoItem,
        showAndFillDataModal:showAndFillDataModal,
        getIdsOfTodo:getIdsOfTodo,
        renderTodoList:renderTodoList

    }
})(TodoItemController,TodoDataModalController,TodoActionBarController);

export default ToDoManager;
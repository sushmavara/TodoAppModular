import {DataModalDomStrings} from '../domSelectors/dataModalElementsSelector'
import {ACTION_BUTTON_CLASS_NAME} from '../constants/todoActionConstants'

const DataModalController = (function(){

    const attachDataModal = function(modalToAttach,ToDoManager){
        document.body.appendChild(modalToAttach);
        bindEvents(ToDoManager);
    }
    
    const destroyActiveDataModal= () =>{
       document.body.removeChild(document.querySelector(DataModalDomStrings.modal));
       event.stopPropagation();
    }
    
    const bindEvents = function(ToDoManager) {
        let activeModal = document.querySelector(DataModalDomStrings.modal);
        let closeBtn = activeModal.querySelector(DataModalDomStrings.modalCloseBtn);
        let cancelBtn = activeModal.querySelector(DataModalDomStrings.modalCancelBtn);
        let saveBtn = activeModal.querySelector(DataModalDomStrings.modalSaveBtn);
        let updateBtn = activeModal.querySelector(DataModalDomStrings.modalUpdateBtn);
        let deleteOkBtn = activeModal.querySelector(DataModalDomStrings.modalDeleteBtn);
     
        [closeBtn,cancelBtn].forEach((current) => {
            current.addEventListener('click',
            destroyActiveDataModal);
        });
    
        if(saveBtn) saveBtn.addEventListener('click', onClickSaveNewTodo(ToDoManager));
        if(updateBtn) updateBtn.addEventListener('click',onClickUpdateTodo(ToDoManager));
        if(deleteOkBtn) deleteOkBtn.addEventListener('click',onClickDeleteConfirmSelectedTodo(ToDoManager));

    
        // When the user clicks anywhere outside of the modal, close it
        window.addEventListener('click', (event) =>{
            if (event.target === activeModal) {
                destroyActiveDataModal();
            }
        });
    }
    
    const validateTitle = (title)=>{
        if(!title){   
            document.querySelector(DataModalDomStrings.modal).querySelector(DataModalDomStrings.titleErrorMessage).style.visibility="visible";
            document.querySelector(DataModalDomStrings.modal).querySelector(DataModalDomStrings.toDoTitleInput).focus();
        }
    }
    
    const getTodoItemModalInfo = () => {
        return { 
            title:document.querySelector(DataModalDomStrings.toDoTitleInput).value,
            description:document.querySelector(DataModalDomStrings.toDoDescriptionInput).value,
            dueDate:document.querySelector(DataModalDomStrings.toDoDueDateInput).value
        }
    }
    
    const fillModal = (data) => {
        document.querySelector(DataModalDomStrings.toDoTitleInput).value = data.title;
        document.querySelector(DataModalDomStrings.toDoDescriptionInput).value = data.description;
        document.querySelector(DataModalDomStrings.toDoDueDateInput).value = data.dueDate;
    }
     
    const onClickSaveNewTodo = (TodoManager) =>(event)=>{
         const toDoInfo = getTodoItemModalInfo();
         validateTitle(toDoInfo.title.trim());
         if(toDoInfo.title.trim()){
             TodoManager.addNewTodoItem(toDoInfo);
             destroyActiveDataModal();
         }
         TodoManager.renderTodoList();
         event.stopPropagation();
     }
     
      const onClickUpdateTodo = (TodoManager) =>(event) => {
         const toDoInfo= getTodoItemModalInfo();
         validateTitle(toDoInfo.title.trim());
         if(toDoInfo.title.trim()){
            TodoManager.updateTodoItem(toDoInfo);
            destroyActiveDataModal();
            TodoManager.setActiveTodoToEdit(null);
         }
         TodoManager.renderTodoList();
         event.stopPropagation();
     }
     
     const onClickDeleteConfirmSelectedTodo = (TodoManager) => () =>{
         let itemsToDelete = TodoManager.getIdsOfTodo("isChecked",true);
         let action=ACTION_BUTTON_CLASS_NAME.CONFIRM_DELETE_TODO;
         TodoManager.modifyTodoItemsOfList(itemsToDelete,action); 
         destroyActiveDataModal();
         event.stopPropagation();
     }
     
     return{
        attachDataModal:attachDataModal,
        fillModal:fillModal,
     }

})();

export default DataModalController;
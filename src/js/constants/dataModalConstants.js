import addTodoModalTemplate from '../templates/addTodoDataModalTemplate'
import updateTodoModalTemplate from '../templates/updateTodoDataModalTemplate'
import deleteTodoModalTemplate from '../templates/deleteTodoDataModalTemplate'
import commitTodoListChangesDataModalTemplate from '../templates/commitTodoListChangesDataModalTemplate'

export const MODALS_CLASS_NAME = {
    ADD_TODO_MODAL : "addItemModal",
    DELETE_TODO_MODAL : "deleteConfirmationModal",
    UPDATE_TODO_MODAL : "updateItemModal",
    COMMIT_TODO_LIST_CHANGES : "commitTodoListChangesModal"
}

export const MODAL_TEMPLATE = {
    ADD_TODO_MODAL : addTodoModalTemplate,
    DELETE_TODO_MODAL : deleteTodoModalTemplate,
    UPDATE_TODO_MODAL : updateTodoModalTemplate,
    COMMIT_TODO_LIST_CHANGES: commitTodoListChangesDataModalTemplate
}

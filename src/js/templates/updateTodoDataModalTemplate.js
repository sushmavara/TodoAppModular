export default '<div data-modal="updateTodoItemModal" class="modal"><div class="modalContent"><div class="modalHeader"><i class="icon ion-md-close closeButton"></i>'+
'<h3> Update Todo Item</h3></div><div class="modalBody"><div><label for="title"> Title : </label><br><input type="text" name="title" class="todoTitle inputElement"><span class="errorMessage">Title can not be empty</span>'+
'</div> <div><label for="dueDate"> Due Date : </label><br><input type="date" name="dueDate" class="todoDueDate inputElement"></div><div><label for="description"> Description : </label><br>'+
'<textarea name="description" cols="30" rows="5" class="todoDescription inputElement"></textarea></div></div><div class="modalFooter"><button class="updateTodoItem">'+
'Update</button><button class="cancel">Cancel</button></div></div></div></div>';

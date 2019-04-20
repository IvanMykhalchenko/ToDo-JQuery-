$(function() {
	var ToDo = function() {
		this.model = [
			{text: 'Почистить зубы'},
			{text: 'Сходить в спортзал'},
			{text: 'Сходить в магазин'}
		];
		this.form = $('.task-form');
		this.inputField = $('.task-form__text');
		this.todoList = $('.table__body');
		this.addButton = $('.btn-primary');
		this.init();
	};
	//Добавляем написаный в форме текст в нашу модель this.model и сразу отображаем
		ToDo.prototype.addItem = function(textToDo) {
			var newText = {text: textToDo};
			this.model.push(newText);
			// Отображаем
			this.appendRenderItem(this.getItemLength(), newText);
		}
		//Получит размер нашей модели
		ToDo.prototype.getItemLength = function() {
			return this.model.length;
		}
		// Добавить новый элемент в конец на странице(отображение)
		ToDo.prototype.appendRenderItem = function(index, item) {
			this.todoList.append(this.getItemHTML(index, item.text));
		}
		//Вызываем когда происходит Сабмит формы
		ToDo.prototype.onSubmitForm = function(e) {
			e.preventDefault();
			this.addItem(this.inputField.val());
			//Сброс текста формы после Сабмита
			this.form.trigger('reset');
		}
		//Отображение начальных элементов модели, если есть.
		ToDo.prototype.renderItem = function() {
			//Сохраняем this и с помощью метода jQuery проходим по массиву и выполянем функцию для каждого элемента
			var list = '', _self = this
			$.each(this.model, function(index, item){
				list += _self.getItemHTML(index+1, item.text);
			})
			this.todoList.html(list);
		}
		//Удаляет элемент при нажатии кнопки
		ToDo.prototype.removeItem = function(index) {
			this.model.splice(index, 1);
			this.renderItem();
		}
		//Вверх списка на одну позицию
		ToDo.prototype.upItem = function(index) {
			this.model.splice(index-1, 0, this.model[index] );
			this.model.splice(index+1, 1);
			this.renderItem();
		}
		//Вызываем сразу, при инициализации нашего конструктора
		ToDo.prototype.init = function() {
			var _self = this;
			// Вызов отображения
			this.renderItem();
			// Нвешиваем на форму сабмит
			this.form.submit(function (e) {
				_self.onSubmitForm(e);
			});
			//Навешиваем CLICK на весь список, но применяем делегирование и ловим событие на кнопке '.btn-danger', используем специальный метод jQuery on();
			this.todoList.on('click', '.btn-danger', function(e) {
				var index = $(e.target).data('index');//добавили в шаблоне html дата-атрибут, он будет равен индексу элемента в массиве, чтобы потом удалить его.
				_self.removeItem(index);
		
			});
			this.todoList.on('click', '.btn-info', function(e) {
				var index = $(e.target).data('index');
				if(index == 0) return;
				_self.upItem(index);
			
			})
		

		}
		//По шаблону формируем HTML строку для вставки в конец списка, за основу взят шаблон LoDash
		ToDo.prototype.getItemHTML = function(index, item) {
			var tmpl = '<tr><th><%-index></th><td><%-item></td><td><button type="button" data-index="<%-index>" class="btn btn-info">&#8593;</button></td><td><button type="button" data-index="<%-index>" class="btn btn-danger">x</button></td></tr>';
			return tmpl.replace('<%-index>', index).replace('<%-index>', index-1).replace('<%-item>', item);
		}

		
	

	window.todo = new ToDo();
});
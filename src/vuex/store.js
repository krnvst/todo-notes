import Vue from 'vue'
import Vuex from 'vuex'
import defaultState from "../config/defaultState"

Vue.use(Vuex);

const bundledContentTranslations = {
	"Начало пользования": "Початок користування",
	"Добавить новую заметку (внизу справа)": "Додати нову нотатку (унизу праворуч)",
	"Сохранить заметку через (ctr + s)": "Зберегти нотатку за допомогою Ctrl + S",
	"Отменить изменение через (ctr + z)": "Скасувати зміну за допомогою Ctrl + Z",
	"Повторить изменение через (ctr + y)": "Повторити зміну за допомогою Ctrl + Y",
	"Подтвердить удаление через модалку": "Підтвердити видалення в модальному вікні",
	"Подтвердить отмену редактирования модалку": "Підтвердити скасування редагування в модальному вікні",
	"Посмотреть пустое состояние (когда нет заметок)": "Переглянути порожній стан (коли немає нотаток)",
	"Планы на год": "Плани на рік",
	"Прыгнуть с парашютом": "Стрибнути з парашутом",
	"Пройти собеседование": "Пройти співбесіду",
	"Подняться на Эверест": "Піднятися на Еверест"
}

const translateBundledContent = notes => notes.map(note => ({
	...note,
	title: bundledContentTranslations[note.title] || note.title,
	todo: note.todo.map(todo => [todo[0], bundledContentTranslations[todo[1]] || todo[1]])
}))

const BUNDLED_NOTES_VERSION = 2

const addNewBundledNotes = notes => {
	const currentVersion = Number(localStorage.getItem("bundledNotesVersion") || 1)
	if (currentVersion >= BUNDLED_NOTES_VERSION) return notes

	const existingIds = new Set(notes.map(note => note.id))
	const newNotes = defaultState.slice(2).filter(note => !existingIds.has(note.id))
	localStorage.setItem("bundledNotesVersion", BUNDLED_NOTES_VERSION)
	return [...notes, ...newNotes]
}

let store = new Vuex.Store({
	state: {
		notes: []
	},
	mutations: {
		SET_NOTES: (state) => {
			// Якщо в локальному сховищі немає нотаток — додаємо початкові
			// Інакше завантажуємо збережені нотатки
			let isExistLSKey = localStorage.getItem("notes");
			let data;

			if (isExistLSKey) {
				data = addNewBundledNotes(translateBundledContent(JSON.parse(isExistLSKey)));
				for (let i = 0; i < data.length; i++) {
					state.notes.push(data[i])
				}
				localStorage.setItem('notes', JSON.stringify(data));
			} else {
				data = defaultState
				state.notes.push(...data)
				localStorage.setItem('notes', JSON.stringify(data));
				localStorage.setItem("bundledNotesVersion", BUNDLED_NOTES_VERSION)
			}
		},
		SET_ITEM: (state, note) => {
			// Додати нову нотатку та згенерувати ID
			let noteObj = note
			note.id = Math.floor(100000 + Math.random() * 900000)
			state.notes.push(noteObj)
		},
		CHANGE_ITEM: (state, note) => {
			// Змінити нотатку: знаходимо її у стані та перезаписуємо
			let changededState = state.notes.map(elem => {
				if (elem.id == note.id) {
					elem = note;
					return elem;
				}
				return elem;
			})
			state.notes = changededState;
		},
		DELETE_ITEM: (state, id) => {
			// Видалити нотатку
			state.notes.map((item, index) => {
				if (item.id === id) {
					state.notes.splice(index, 1);
				}
			})
		},
		CHANGE_LOCAL_STORE: (state) => {
			// Зберегти дані в локальному сховищі
			let localStorageArray = localStorage.getItem("notes");
			let currentLS = JSON.parse(localStorageArray)
			currentLS = state.notes
			localStorage.setItem('notes', JSON.stringify(currentLS));
		},
		UPDATE_STORE: (state) => {
			// Оновити стан із локального сховища
			let localStorageArray = localStorage.getItem("notes");
			let currentLS = addNewBundledNotes(translateBundledContent(JSON.parse(localStorageArray)))
			state.notes = currentLS
			localStorage.setItem('notes', JSON.stringify(currentLS));
		}
	},
	actions: {
		ADD_DEFAULT({ commit }) {
			commit('SET_NOTES')
		},
		ADD_ITEM({ commit }, note) {
			commit('SET_ITEM', note)
			commit('CHANGE_LOCAL_STORE')
		},
		CHANGE_ITEM({ commit }, note) {
			commit('CHANGE_ITEM', note)
			commit('CHANGE_LOCAL_STORE')
		},
		DELETE_ITEM({ commit }, id) {
			commit('DELETE_ITEM', id)
			commit('CHANGE_LOCAL_STORE')
		},
		UPDATE_STORE({ commit }) {
			commit('UPDATE_STORE')
		}
	},
	getters: {
		NOTES(state) {
			return state.notes
		}
	},
})

export default store

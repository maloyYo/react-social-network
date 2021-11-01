import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state: {
        sidebar: {},
        profilePage: {
            newPostText: "",
            posts: [
                {
                    id: 1,
                    text: "Hey, what's up?!",
                    likesCount: 15,
                },
                {
                    id: 2,
                    text: "Yo!",
                    likesCount: 1223,
                },
            ],
        },
        dialogsPage: {
            users: [
                {
                    id: 1,
                    name: "Igor",
                },
                {
                    id: 2,
                    name: "Egor",
                },
                {
                    id: 3,
                    name: "Lol",
                },
            ],
            messages: [
                {
                    id: 1,
                    text: "Hi",
                },
                {
                    id: 2,
                    text: "yoy?",
                },
                {
                    id: 3,
                    text: "Serega tyt?",
                },
            ],
            newMessageText: '',
        },
    },
    _callSubscriber() {},

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },

    dispatch(action) {
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)

        this._callSubscriber(this._state)
    }
}

export default store

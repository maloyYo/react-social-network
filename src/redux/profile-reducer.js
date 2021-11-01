import { stopSubmit } from "redux-form"
import { profileAPI } from "../api/api"

const ADD_POST = "network/profile-reducer/ADD_POST"
const SET_USER = "network/profile-reducer/SET_USER"
const SET_STATUS = "network/profile-reducer/SET_STATUS"
const UPLOAD_PHOTO_SUCCESS = "network/profile-reducer/UPLOAD_PHOTO_SUCCESS"

let initialState = {
  posts: [
    {
      id: 1,
      text: "Hi",
      likesCount: 15,
    },
    {
      id: 2,
      text: "yo?",
      likesCount: 123,
    },
  ],
  profile: null,
  status: "",
}

let profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      if (action.newPostText === "" || typeof action.newPostText !== "string")
        return

      let newPost = {
        id: state.posts[state.posts.length - 1].id + 1,
        text: action.newPostText,
        likesCount: 0,
      }

      return {
        ...state,
        posts: [...state.posts, newPost],
      }
    case SET_USER:
      return {
        ...state,
        profile: action.profile,
      }
    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      }
    case UPLOAD_PHOTO_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          photos: action.photos,
        },
      }
    default:
      return state
  }
}

export let addPost = (newPostText) => ({
  type: ADD_POST,
  newPostText,
})
export let setProfile = (profile) => ({ type: SET_USER, profile })
export let setStatus = (status) => ({ type: SET_STATUS, status })
export let uploadPhotoSuccess = (photos) => ({
  type: UPLOAD_PHOTO_SUCCESS,
  photos,
})

export let getProfileThunk = (userId) => async (dispatch) => {
  let res = await profileAPI.getProfile(userId)
  dispatch(setProfile(res))
}
export let getUserStatus = (userId) => async (dispatch) => {
  let status = await profileAPI.getUserStatus(userId)
  dispatch(setStatus(status))
}
export let updateUserStatus = (status) => async (dispatch) => {
  let data = await profileAPI.updateUserStatus(status)
  if (data.resultCode === 0) {
    dispatch(setStatus(status))
  }
}
export let uploadPhoto = (image) => async (dispatch) => {
  let res = await profileAPI.uploadPhoto(image)
  if (res.data.resultCode === 0) {
    dispatch(uploadPhotoSuccess(res.data.data.photos))
  }
}
export let saveProfile = (info) => async (dispatch, getState) => {
  let res = await profileAPI.updateProfileInfo(info)
  if (res.data.resultCode === 0) {
    dispatch(getProfileThunk(getState().auth.userId))
  } else {
    let errorMessage = res.data.messages[0]
    function takePropsFromString(str) {
      str = str.split("")
      let leftBound = str.indexOf("(")
      let rightBound = str.indexOf(")")
      return str
        .filter((char, index) => index > leftBound && index < rightBound)
        .join("")
        .split("->")
        .map((prop) => {
          let firstChar = prop.charAt(0).toLowerCase()
          prop = prop.split("")
          prop[0] = firstChar
          return prop.join("")
        })
    }

    //********SHITCODE STARTS******************SHIIIIIIIIIIIT COOOOOOOODEEEE!!!!!!!!!! MUST EDIT THIS SHIT LATER!!!!!!!!!!!!!!!!!
    function composeObject(arr, value) {
      let result = arr.reduce((acc, item, index, array) => {
        if (array.length === 1) {
          return { [item]: value }
        }

        if (index === array.length - 1) {
          return { [array[index - 1]]: { [item]: value } }
        }

        if (index === 0) return { [item]: {} }

        return { [array[index - 1]]: { [item]: {} } }
      }, {})

      return result
    }
    //**********SHITCODE ENDS*************SHIIIIIIIIIIIT COOOOOOOODEEEE!!!!!!!!!! MUST EDIT THIS SHIT LATER!!!!!!!!!!!!!!!!!

    dispatch(
      stopSubmit(
        "edit-profile",
        composeObject(takePropsFromString(errorMessage), errorMessage)
      )
    )

    return Promise.reject(errorMessage)
  }
}

export default profileReducer

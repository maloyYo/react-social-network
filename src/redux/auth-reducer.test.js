import authReducer, { setUserData } from "./auth-reducer"

let state = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
}
let action = setUserData(25, "formov02@gmail.com", "maloyYo", true)
let newState = authReducer(state, action)

it("id should equal to 25", () => {
  expect(newState.userId).toBe(25)
})

it("email should equal to formov02@gmail.com", () => {
  expect(newState.email).toBe("formov02@gmail.com")
})

it("login should equal to foxy_fo", () => {
  expect(newState.login).toBe("maloyYo")
})

it("user is supposed to be authorized", () => {
  expect(newState.isAuth).toBe(true)
})

import { ADD_USER, SET_DATA, SET_CHAT } from "./chatAction";

const initialState = {
  users: [],
  chats: [],
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action; // action.type, action.payload
  switch (type) {
    case ADD_USER:
      console.log();
      const newUsers = [...state.users, payload]
      return {
        ...state, users: newUsers
      }
    case SET_CHAT:
      console.log(payload);
      const newChat = [...state.chats, payload]
      return {
        ...state, chats: newChat
      }
      case SET_DATA:
        return {
          ...state,
          chats: payload,
        }
    default:
      return state;
  }

}
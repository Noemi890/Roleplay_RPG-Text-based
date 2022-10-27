export const userInitialState = {
  email: '',
  password: ''
}

export const userProfileCreation = {
  name: '',
  surname: '',
  image: '',
  age: 0,
  race: '',
  biography: ''
}

export const initialErrorState = {
  error: false,
  message: ''
}

export const initialRoleContent = {
  gameId: 0,
  profileId: 0,
  title: '',
  content: '',
  profiles: []
}

export const initialCreateGame = {
  title: '',
  story: ''
}

export const initialResponse = {
  success: {
    message: "",
    status: false,
  },
  error: {
    message: "",
    status: false,
  }
}
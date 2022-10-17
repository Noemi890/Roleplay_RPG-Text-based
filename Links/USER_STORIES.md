`As a User-to-be, so I can partecipate, I want to be able to register an account`

*Example Request:*
```
user.create({
  data: {
    email: '',
    password: ''
  }
})
```
*Example Response:*
```
{
  status: 200,
  message: 'User has been created'
}
```
---
```
{
  status: 400,
  error: {
    message: 'Email already in use'
  }
}
```

`As a User, so I can start partecipate, I want to be able to Login in the application`

*Example Request:*
```
  user.find({
    where: {
      username,
      password
    }
  })
```
**If profile = null**

`As a User, so I can start partecipate, I want to be able to create my first profile`

*Example Request:*
```
 profile.create({
  data: {
    userId, name, surname ..
  }
 })
```

*Example Response:*
```
user: {
  id: 0,
  profile: [
    name: '',
    surname: '',
    age: 0,
    image: '',
    race: '',
    biography: '',
    game: {
      id: 0,
      story: '',
      role: [
        {
          id: 0,
          title: '',
          content: '',
          ended: false,
          event: [
            {
              id: 0,
              content: ''
            }
          ]
        }
      ]
    }
  ]
}
```
---
```
{
  status: 400,
  error: {
    message: 'Email or Password invalid'
  }
}
```
`As a User, so I can partecipate in multiple games, I want to be able to create more profiles`

*Example Request:*
```
  profile.create({
  data: {
    userId, name, surname ..
  }
 })
```

*Example Response:*

```
{
  status: 200,
  message: 'new profile created!'
}
```
---
```
{
  status: 400,
  error: {
    message: 'Profile with that name already exist'
  }
}
```
`As a User, so I can set my own rules, I want to be able to create my own game`
*Example request:*
```
game.create({
  data: {
    profileId, title, story
  }
})
```
*Example response:*
```
{
  status: 201,
  message: 'Game created'
}
```
---
{
  status: 400,
  error: {
    message: 'Game with this title already exist'
  }
}
`As a User, so I can have everything organized, I want to be able to see all the roles in the game`
*Example request:*
```
role.findMany({
  where: {
    gameId, 
    ended: false
  }
})
```

*Example Response:*
```
{
  role: [
    {
      ID: 0,
    title: '',
    content: '',
    events: []
    }
  ]
}
```
`As a User, so I can have everything organized, I want to be able to see the ended roles`
*Example request:*
```
role.findMany({
  where: {
    gameId, 
    ended: true
  }
})
```

*Example Response:*
```
{
  role: [
    {
      ID: 0,
    title: '',
    content: '',
    events: []
    }
  ]
}
```
`As a User, so I can check if I have avaiable role, I want to be able to see roles linked to me`

*Example request:*
```
role.findMany({
  where: {
    gameId,
    profile: {
      profileId
    }
    ended: true
  }
})
```

*Example Response:*
```
{
  role: [
    {
      ID: 0,
    title: '',
    content: '',
    events: []
    }
  ]
}
```
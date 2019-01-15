# How to use

## Route - `/auth`
* Route path: `/auth`
* Method: POST
* Input: { JSON } - `{ username: '', password: '' }` - username and password can not null.
* Output:
    * matched: { status: `true`, message: '', _id: '' }
    * not matched: { status: `false`, message: '' }
* Only using for login system.

```
const fetchUrl = '<root>/auth';
const userInfo = {
    username: '',
    password: ''
};

fetch(fetchUrl, {
    method: 'POST',
    headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + <accessToken>
    }),
    body: JSON.stringify(userInfo)
})
.then(response => response.json())
.then(result => console.log(result))
.catch(error => console.log(error));
```

## Route - `/checkuser`
* Route path: `/checkuser`
* Method: POST
* Input: { JSON } - `{ attribute1: value1, attributeN: valueN }`
* Output:
    * matched: { status: `true`, message: '', _id: '' }
    * not matched: { status: `false`, message: '' }
* Using for CreateUserComonent.
    * Check if the username exists.
    * Check for existing user before "convert" a `Anonymous` user to a identified user that has both username and password.

```
const fetchUrl = '<root>/checkuser';
const userInfo = {
    username: ''
};

fetch(fetchUrl, {
    method: 'POST',
    headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + <accessToken>
    }),
    body: JSON.stringify(userInfo)
})
.then(response => response.json())
.then(result => console.log(result))
.catch(error => console.log(error));
```
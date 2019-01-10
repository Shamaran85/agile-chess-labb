# How to use

## Route - `/auth`
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
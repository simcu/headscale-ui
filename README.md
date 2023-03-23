# HeadscaleUi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.
Only Use headscale http api,and save credit in localstorage.

<img width="780" alt="image" src="https://user-images.githubusercontent.com/11401602/227347953-130835c6-7f58-4227-9a83-c6b40b9c2427.png">
<img width="1371" alt="image" src="https://user-images.githubusercontent.com/11401602/227347584-905dd1e8-8b99-4292-8424-2f0e1399a031.png">
<img width="1345" alt="image" src="https://user-images.githubusercontent.com/11401602/227347766-1d9d81c2-5e5a-43fb-ac3d-80d3a04c2f8c.png">

## Depoly Method
1. run in split server (need set cors)
2. run with headscale same origin

## Guide
1. You should use cli to generate a apikey.
2. if you deploy this standalone , on loginpage click "Change Server" then, input server url.
3. input apikey , click "Login"


## Notice
ServerUrl and ApiKey are saved in localstorage in plain text. so, you will only need login once.
if apikey is invalid , system will require login again.

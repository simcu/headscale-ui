# HeadscaleUi
[![main](https://github.com/simcu/headscale-ui/actions/workflows/main.yml/badge.svg)](https://github.com/simcu/headscale-ui/actions/workflows/main.yml)

This is a static headscale admin ui, no backend enviroment required

## Thanks

Headscale - https://github.com/juanfont/headscale  version: v0.21.0

UI - https://github.com/NG-ZORRO/ng-zorro-antd  version: v15.0.3

BaseFramework - https://angular.io/ version: 15.2.4


## ScreenShots

<img width="1371" alt="image" src="https://user-images.githubusercontent.com/11401602/227347953-130835c6-7f58-4227-9a83-c6b40b9c2427.png">
<img width="1371" alt="image" src="https://user-images.githubusercontent.com/11401602/227347584-905dd1e8-8b99-4292-8424-2f0e1399a031.png">
<img width="1371" alt="image" src="https://user-images.githubusercontent.com/11401602/227347766-1d9d81c2-5e5a-43fb-ac3d-80d3a04c2f8c.png">

## Pre Requirement
1. You need to generate a apikey use headscale-cli
> on your headscale server run: headscale apikeys create -e 9999d
2. You need a static web server space, or use docker
3. (optional) If you deploy it on other domain, you need set headscale api's cors.

## Deploy Guide
### A: use static web space
emmm.... I don't know how to describe this action.... it is really very easy... 

### B: use docker (k8s also, it's a nginx static webserver, no other required)

1. run command on your docker enviroment

> docker run -d --name headscale-ui -p 8888:80 simcu/headscale-ui

2. open http://127.0.0.1:8888/manager/ 

3. (optional)  if run it not on same domain with headscale,the system will error, don't warried, only click "Exit" on the top menu, you will redirect to login page.

4.  if you deploy this standalone, on login page click "Change Server" then, input server url.
5. input apikey , click "Login"

### C: use caddy
```
domain.com {
        @ui {
                path_regexp (/$)|(\.)
        }
        handle @ui {
                root * /www/headscale-ui
                try_files {path} /index.html
                file_server
        }

        reverse_proxy 127.0.0.1:7070
}
```

## Notice
1. ServerUrl and ApiKey are saved in localstorage in plain text. 
2. you will only need login once.if apikey is invalid , system will require login again.

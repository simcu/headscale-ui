import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  ///Machine api start
  machineList(user: string): Observable<any> {
    return this.http.get(`/api/v1/node?user=${user}`)
  }

  machineRegister(user: string, key: string): Observable<any> {
    return this.http.post(`/api/v1/node/register?user=${user}&key=${key}`, null);
  }

  machineDetail(machineId: string): Observable<any> {
    return this.http.get(`/api/v1/node/${machineId}`);
  }

  machineExpire(machineId: string): Observable<any> {
    return this.http.post(`/api/v1/node/${machineId}/expire`, null);
  }

  machineDelete(machineId: string): Observable<any> {
    return this.http.delete(`/api/v1/node/${machineId}`);
  }

  machineRename(machineId: string, name: string): Observable<any> {
    return this.http.post(`/api/v1/node/${machineId}/rename/${name}`, null);
  }

  machineRoutes(machineId: string): Observable<any> {
    return this.http.get(`/api/v1/node/${machineId}/routes`);
  }

  machineTag(machineId: string, tags: Array<string>): Observable<any> {
    return this.http.post(`/api/v1/node/${machineId}/tags`, {tags});
  }

  machineChangeUser(machineId: string, user: string): Observable<any> {
    return this.http.post(`/api/v1/node/${machineId}/user?user=${user}`, null);
  }


  ///User api start
  userList(): Observable<any> {
    return this.http.get('/api/v1/user')
  }

  userAdd(name: string): Observable<any> {
    return this.http.post('/api/v1/user', {name});
  }

  userDetail(name: string): Observable<any> {
    return this.http.get(`/api/v1/user/${name}`);
  }

  userDelete(name: string): Observable<any> {
    return this.http.delete(`/api/v1/user/${name}`);
  }

  userRename(old: string, name: string): Observable<any> {
    return this.http.post(`/api/v1/user/${old}/rename/${name}`, {});
  }


  ///route api start
  routeList(): Observable<any> {
    return this.http.get(`/api/v1/routes`);
  }

  routeDelete(id: string): Observable<any> {
    return this.http.delete(`/api/v1/routes/${id}`);
  }

  routeEnable(id: string): Observable<any> {
    return this.http.post(`/api/v1/routes/${id}/enable`, null);
  }

  routeDisable(id: string): Observable<any> {
    return this.http.post(`/api/v1/routes/${id}/disable`, null);
  }

  ///preauth key start
  preAuthKeyList(user: string): Observable<any> {
    var url = `/api/v1/preauthkey`
    if (user) {
      url = `/api/v1/preauthkey?user=${user}`;
    }
    return this.http.get(url);
  }

  preAuthKeyAdd(user: string, expiration: string, aclTags: Array<string> = [], reusable = false, ephemeral = false): Observable<any> {
    return this.http.post('/api/v1/preauthkey', {user, reusable, ephemeral, aclTags, expiration})
  }

  preAuthKeyExpire(user: string, key: string): Observable<any> {
    return this.http.post('/api/v1/preauthkey/expire', {user, key});
  }

  ///api key start
  apikeyList(): Observable<any> {
    return this.http.get(`/api/v1/apikey`);
  }

  apikeyCreate(expiration: string): Observable<any> {
    return this.http.post('/api/v1/apikey', {expiration});
  }

  apikeyExpire(prefix: string): Observable<any> {
    return this.http.post('/api/v1/apikey/expire', {prefix});
  }
}

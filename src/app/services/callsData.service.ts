import { Injectable } from '@angular/core';
import { Calls } from '../models/calls.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CallUpdate } from '../models/callUpdate.model';
import { Dashboard } from '../models/dashboard.model';
import { RecordList } from '../models/recordList.model';
import { baseUrl } from '../helpers/baseUrl';
import { RegisterUser } from '../models/registerUser.model';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CallsDataService {


constructor(private http: HttpClient) { }

  GetProjectsUser() {
    return this.http.get<[{id: string, name: string}]>
      ( baseUrl + '/api/calls/GetProjects');
  }

  GetAParticipant(projectId: string) {
    return this.http.post<Calls>
      ( baseUrl + '/api/calls/GetAParticipant/' + projectId, {});
  }

  CallAgain(projectId: number) {
    return this.http.post
      ( baseUrl + '/api/calls/CallAgein/' + projectId, {});
  }

  UpdateCallData(callId: number, callData: CallUpdate) {
    return this.http.post
    ( baseUrl + '/api/calls/UpdateCallDetails/' + callId, {
      StatusId: callData.StatusId,
      Name: callData.Name,
      AgeId: callData.AgeId,
      GenderId: callData.GenderId,
      CityId: callData.CityId,
      NationalityId: callData.NationalityId,
      Appointment: callData.Appoiment,
      Note: callData.Note,
    });
  }

  SetProjectId(id: string, name: string) {
    const data = {id, name};
    localStorage.setItem('project', JSON.stringify(data));
    // this.project.next(id);
  }
  RemoveProjectId() {
    localStorage.removeItem('project');
    // this.project.next(null);
  }

}

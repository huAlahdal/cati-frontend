import { Component, OnInit } from '@angular/core';
import { CallsDataService } from '../services/callsData.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastAlertService } from '../services/toastAlert.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

  projects: [{id: string, name: string}];

  constructor(private http: CallsDataService, private router: Router,
              private spinner: NgxSpinnerService, private toastaService: ToastAlertService, private auth: AuthService) {
    document.body.style.background = 'rgb(244, 243, 239)';
  }

  ngOnInit() {
    const project = localStorage.getItem('project');
    if (project) { this.http.RemoveProjectId(); }
    this.spinner.show();

    this.http.GetProjectsUser().subscribe((resdata) => {
      if (resdata.length === 1) {
        this.http.SetProjectId(resdata[0].id, resdata[0].name);
        this.router.navigate(['/user/' + resdata[0].id]);
      }
      this.projects = resdata;
      this.spinner.hide();
    }, (errorMessage) => {
      this.toastaService.addToast(errorMessage);
      this.spinner.hide();
    });
  }

  selectedProject(id: string, name: string){
      this.http.SetProjectId(id, name);
      this.router.navigate(['/user/' + id]);
  }

  logout() {
    this.auth.logout();
  }

}

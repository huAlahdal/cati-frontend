import { Component, OnInit } from '@angular/core';
import { faPhoneAlt, faPhoneSlash } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CallsDataService } from '../services/callsData.service';
import { Calls } from '../models/calls.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../services/auth.service';
import { ToastaConfig } from 'ngx-toasta';
import { ToastAlertService } from '../services/toastAlert.service';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  dataForm: FormGroup;
  callDetails: Calls;
  username: string;
  quota = 0;
  radiosel = 0;
  faphone = faPhoneAlt;
  faPhoneSlash = faPhoneSlash;
  break = false;
  breaktxt = 'حفظ وايقاف';
  dateFormat = require('dateformat');
  projectData: { id: string, name: string };
  // @ViewChild('staticModal', {static: true}) public staticModal: ModalDirective;

  constructor(private callDetalisAPI: CallsDataService, private route: ActivatedRoute,
              private spinner: NgxSpinnerService, private auth: AuthService, private router: Router,
              private toastaService: ToastAlertService, private toastaConfig: ToastaConfig) {
    document.body.style.background = 'rgb(244, 243, 239)';
    this.toastaConfig.theme = 'default';
  }

  ngOnInit() {
    this.dataForm = new FormGroup({
      Name: new FormControl({ value: '', disabled: true }),
      AgeId: new FormControl({ value: '', disabled: true }, [Validators.required]),
      GenderId: new FormControl({ value: '', disabled: true }, [Validators.required]),
      number: new FormControl({ value: '', disabled: true }),
      CityId: new FormControl({ value: '', disabled: true }, [Validators.required]),
      NationalityId: new FormControl({ value: '', disabled: true }, [Validators.required]),
      Appointment: new FormControl({ value: '', disabled: true }),
      Note: new FormControl(),
      StatusId: new FormControl({ value: '', disabled: true }),
    });
    this.projectData = JSON.parse(localStorage.getItem('project'));
    // this.dataForm.controls.Note.disable();
    this.GetAParticipant();
    const userDataAgent = JSON.parse(localStorage.getItem('userDataAgent'));
    if (userDataAgent) {
      this.username = userDataAgent.name;
    }
  }

  GetAParticipant() {
    const projectId = this.route.snapshot.params.id;
    this.spinner.show();
    this.callDetalisAPI.GetAParticipant(projectId).subscribe((resData) => {
      this.spinner.hide();
      this.callDetails = resData;
      this.dataForm.patchValue({
        Name: this.callDetails.participant.name,
        AgeId: this.callDetails.participant.ageRangeId,
        GenderId: this.callDetails.participant.genderId,
        CityId: this.callDetails.participant.cityId,
        NationalityId: this.callDetails.participant.nationalityId,
      });
      /*setTimeout(() => {
        this.callTimer();
      }, 1000);*/
      this.break = false;
    }, errorMessage => {
      this.break = true;
      this.breaktxt = 'البدأ برقم جديد';
      this.toastaService.addToast(errorMessage);
      this.spinner.hide();
    });
  }


  nullValue() {
    if (this.radiosel === 7) {
      this.dataForm.value.StatusId = this.quota;
    } else {
      this.dataForm.value.StatusId = this.radiosel;
    }

    this.dataForm.value.Note = (this.dataForm.value.Note === '') ? null : this.dataForm.value.Note;

    if (this.radiosel === 100 || (this.radiosel === 7 && this.quota === 8)) {
      this.dataForm.value.Name = (this.dataForm.value.Name === '') ? null : this.dataForm.value.Name;
      this.dataForm.value.AgeId = (+this.dataForm.value.AgeId === 0) ? null : +this.dataForm.value.AgeId;
      this.dataForm.value.GenderId = (+this.dataForm.value.GenderId === 0) ? null : +this.dataForm.value.GenderId;
      this.dataForm.value.CityId = (+this.dataForm.value.CityId === 0) ? null : +this.dataForm.value.CityId;
      this.dataForm.value.NationalityId = (+this.dataForm.value.NationalityId === 0) ? null : +this.dataForm.value.NationalityId;
      // this.dataForm.value.Note = (this.dataForm.value.Note === '') ? null : this.dataForm.value.Note;
      this.dataForm.value.Appointment = null;
      this.dataForm.value.StatusId = +this.dataForm.value.StatusId;
    } else if (this.radiosel === 3) {
      this.dataForm.value.Appointment = this.dateFormat(this.dataForm.value.Appointment, 'yyyy-mm-dd HH:MM');
      this.dataForm.value.StatusId = +this.dataForm.value.StatusId;
      this.dataForm.value.Name = null;
      this.dataForm.value.AgeId = null;
      this.dataForm.value.GenderId = null;
      this.dataForm.value.CityId = null;
      this.dataForm.value.NationalityId = null;
      // this.dataForm.value.Note = null;
    } else {
      this.dataForm.value.StatusId = +this.dataForm.value.StatusId;
      this.dataForm.value.Name = null;
      this.dataForm.value.AgeId = null;
      this.dataForm.value.GenderId = null;
      this.dataForm.value.CityId = null;
      this.dataForm.value.NationalityId = null;
      // this.dataForm.value.Note = null;
      this.dataForm.value.Appointment = null;
    }
  }



  SaveAndSend() {
    this.spinner.show();
    this.nullValue();

    this.callDetalisAPI.UpdateCallData(this.callDetails.callId, this.dataForm.value).subscribe(() => {
      this.dataForm.reset();
      this.callDetails = null;
      this.quota = 0;
      this.radiosel = 0;
      this.spinner.hide();
      if (!this.break) { this.GetAParticipant(); }
    }, errorMessage => {
      this.toastaService.addToast(errorMessage);
      this.spinner.hide();
    });

  }

  startBreak() {
    this.break = !this.break;
    if (this.break) {
      this.breaktxt = 'البدأ برقم جديد';
      this.SaveAndSend();
      this.callDetails = null;
    }
    else {
      this.breaktxt = 'حفظ وايقاف';
      this.GetAParticipant();
    }
  }

  logout() {
    this.auth.logout();
  }

  enableControl() {
    if (this.radiosel === 100 || (this.radiosel === 7 && this.quota === 8)) {
      this.dataForm.controls.Name.enable();
      this.dataForm.controls.AgeId.enable();
      this.dataForm.controls.GenderId.enable();
      this.dataForm.controls.CityId.enable();
      // this.dataForm.controls.Note.enable();
      this.dataForm.controls.NationalityId.enable();
      this.dataForm.controls.Appointment.disable();
    } else if (this.radiosel === 3) {
      this.dataForm.controls.Name.disable();
      this.dataForm.controls.AgeId.disable();
      this.dataForm.controls.GenderId.disable();
      this.dataForm.controls.CityId.disable();
      this.dataForm.controls.NationalityId.disable();
      // this.dataForm.controls.Note.disable();
      this.dataForm.controls.Appointment.enable();
    } else {
      this.dataForm.controls.Name.disable();
      this.dataForm.controls.AgeId.disable();
      this.dataForm.controls.GenderId.disable();
      this.dataForm.controls.CityId.disable();
      this.dataForm.controls.NationalityId.disable();
      this.dataForm.controls.Appointment.disable();
      // this.dataForm.controls.Note.disable();
    }
  }

  callAgain() {
    this.spinner.show();
    this.callDetalisAPI.CallAgain(this.callDetails.callId).subscribe(() => {
      this.spinner.hide();
    }, errorMessage => {
      this.toastaService.addToast(errorMessage);
      this.spinner.hide();
    });
  }


  onSubmit() {
    this.SaveAndSend();
  }

  goToLink() {
    window.open(this.callDetails.link, '_blank');
  }
}

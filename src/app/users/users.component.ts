import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppUser } from '../appuser';
import { AppUserService } from '../appuser.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public appUsers: AppUser[];
  public editAppUser: AppUser;
  public deleteAppUser: AppUser;

  constructor(private appUserService: AppUserService) { }

  ngOnInit(): void {
    this.getAppUsers();
  }

  public getAppUsers(): void {
    this.appUserService.getAppUsers().subscribe(
      (response: AppUser[]) => {
        this.appUsers = response;
        console.log(this.appUsers);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddAppUser(addForm: NgForm): void {
    document.getElementById('add-appUser-form')?.click();
    this.appUserService.addAppUser(addForm.value).subscribe({
      next:(response: AppUser) => {
        console.log(response);
        this.getAppUsers();
        addForm.reset();
      },
      error:(error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    });
  }

  public onUpdateAppUser(appUser: AppUser): void {
    this.appUserService.updateAppUser(appUser).subscribe({
      next:(response: AppUser) => {
        console.log(response);
        this.getAppUsers();
      },
      error:(error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public onDeleteAppUser(appUserId: number): void {
    this.appUserService.deleteAppUser(appUserId).subscribe({
      next:(response: void) => {
        console.log(response);
        this.getAppUsers();
      },
      error:(error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public searchAppUsers(key: string): void {
    console.log(key);
    const results: AppUser[] = [];
    for (const appUser of this.appUsers) {
      if (appUser.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || appUser.prenom.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || appUser.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || appUser.appUserRole.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || appUser.tel.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(appUser);
      }
    }
    this.appUsers = results;
    if (results.length === 0 || !key) {
      this.getAppUsers();
    }
  }

  public onOpenModal(appUser: AppUser, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addAppUserModal');
    }
    if (mode === 'edit') {
      this.editAppUser = appUser;
      button.setAttribute('data-target', '#updateAppUserModal');
    }
    if (mode === 'delete') {
      this.deleteAppUser = appUser;
      button.setAttribute('data-target', '#deleteAppUserModal');
    }
    container?.appendChild(button);
    button.click();
  }

}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Projet } from '../projet';
import { ProjetService } from '../projet.service';

@Component({
  selector: 'app-projets',
  templateUrl: './projets.component.html',
  styleUrls: ['./projets.component.css']
})
export class ProjetsComponent implements OnInit {

  public projets: Projet[];
  public editProjet: Projet;
  public deleteProjet: Projet;

  constructor(private projetService: ProjetService) { }

  ngOnInit(): void {
    this.getProjets();
  }

  public getProjets(): void {
    this.projetService.getProjets().subscribe({
      next:(response: Projet[]) => {
        this.projets = response;
        console.log(this.projets);
      },
      error:(error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public onAddProjet(addForm: NgForm): void {
    document.getElementById('add-projet-form')?.click();
    this.projetService.addProjet(addForm.value).subscribe({
      next:(response: Projet) => {
        console.log(response);
        this.getProjets();
        addForm.reset();
      },
      error:(error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    });
  }

  public onUpdateprojet(projet: Projet): void {
    this.projetService.updateProjet(projet).subscribe({
      next:(response: Projet) => {
        console.log(response);
        this.getProjets();
      },
      error:(error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public onDeleteprojet(projetId: number): void {
    this.projetService.deleteProjet(projetId).subscribe({
      next:(response: void) => {
        console.log(response);
        this.getProjets();
      },
      error:(error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public searchProjets(key: string): void {
    console.log(key);
    const results: Projet[] = [];
    for (const projet of this.projets) {
      if (projet.nomProjet.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || projet.description.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || projet.etat.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(projet);
      }
    }
    this.projets = results;
    if (results.length === 0 || !key) {
      this.getProjets();
    }
  }

  public onOpenModal(projet: Projet, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addProjetModal');
    }
    if (mode === 'edit') {
      this.editProjet = projet;
      button.setAttribute('data-target', '#updateProjetModal');
    }
    if (mode === 'delete') {
      this.deleteProjet = projet;
      button.setAttribute('data-target', '#deleteProjetModal');
    }
    container?.appendChild(button);
    button.click();
  }

}

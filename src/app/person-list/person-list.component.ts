import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PersonDialogComponent } from '../person-dialog/person-dialog.component';
import { PersonService } from '../person-service.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {

  persons: any[] = [];
  displayedColumns: string[] = [ 'firstName', 'lastName','age', 'actions']; // Colonnes affichées
  constructor(private personService: PersonService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getPersons();
  }

  getPersons(): void {
    this.personService.getPersons().subscribe((data) => {
      this.persons = data;
    });
  }

  // Ouvrir un dialogue pour ajouter une personne
  addPerson(): void {
    const dialogRef = this.dialog.open(PersonDialogComponent, {
      width: '250px',
      data: { person: {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.personService.addPerson(result).subscribe(() => {
          this.getPersons(); // Rafraîchir la liste après l'ajout
        });
      }
    });
  }

  // Modifier une personne
  editPerson(person: any): void {
    const dialogRef = this.dialog.open(PersonDialogComponent, {
      width: '250px',
      data: { person: { ...person } } // Envoyer une copie de l'objet
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.personService.updatePerson(result).subscribe(() => {
          this.getPersons(); // Rafraîchir la liste après la modification
        });
      }
    });
  }

  // Supprimer une personne
  deletePerson(id: number): void {
    this.personService.deletePerson(id).subscribe(() => {
      this.getPersons(); // Rafraîchir la liste après la suppression
    });
  }
}
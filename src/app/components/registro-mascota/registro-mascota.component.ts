import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegistroMascotaService } from 'src/app/services/registro-mascota.service';

class Sexo {
  constructor(public Value: string, public Text: string) {}
}
class Tipo {
  constructor(public Value: string, public Text: string) {}
}
class RazaPerro {
  constructor(public Value: string, public Text: string) {}
}
class RazaGato {
  constructor(public Value: string, public Text: string) {}
}

@Component({
  selector: 'app-registro-mascota',
  templateUrl: './registro-mascota.component.html',
  styleUrls: ['./registro-mascota.component.css'],
})
export class RegistroMascotaComponent implements OnInit {
  accion = 'Agregar';
  mascota: any = {};
  form: FormGroup;
  _id: string | undefined;
  listMascotas: any[] = [];
  listSexo: Sexo[] = [new Sexo('Macho', 'M'), new Sexo('Hembra', 'H')];
  listTipo: Tipo[] = [new Tipo('Perro', 'Perro'), new Tipo('Gato', 'Gato')];
  listRazaPerros: RazaPerro[] = [
    new RazaPerro('Yorkie', 'Yorkie'),
    new RazaPerro('Corgi', 'Corgi'),
    new RazaPerro('Rottweiler', 'Rottweiler'),
    new RazaPerro('Beagle', 'Beagle'),
    new RazaPerro('Poodle', 'Poodle'),
    new RazaPerro('Bulldog', 'Bulldog'),
    new RazaPerro('Golden Retriever', 'Golden Retriever'),
    new RazaPerro('Pastor Alemán', 'Pastor Alemán'),
    new RazaPerro('Pug', 'Pug'),
    new RazaPerro('Zaguate', 'Zaguate'),
  ];
  ListRazaGatos: RazaGato[] = [
    new RazaGato('Persa', 'Persa'),
    new RazaGato('Siamés', 'Siamés'),
    new RazaGato('Bobtail Americano', 'Bobtail Americano'),
    new RazaGato('Somalí', 'Somalí'),
    new RazaGato('Azul Ruso', 'Azul Ruso'),
    new RazaGato('Siberiano', 'Siberiano'),
    new RazaGato('Manés', 'Manés'),
    new RazaGato('Burmés', 'Burmés'),
    new RazaGato('Ragdoll', 'Ragdoll'),
    new RazaGato('Cimarrón',     'Cimarrón'),
  ];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private mascotaService: RegistroMascotaService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      raza: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.obtenerMascotas();
  }

  obtenerMascotas() {
    this.mascotaService.getListMascotas().subscribe(
      (data) => {
        console.log(data);
        this.listMascotas = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  registrarMascota() {
    //var idUser1 = JSON.parse(localStorage.getItem('Users'))[0].correo;
    //var idUser = localStorage.getItem('Users')
    let idUserObj = null;
    const storedIdUser = localStorage.getItem('Users');
    if (storedIdUser) {
      try {
        idUserObj = JSON.parse(storedIdUser);
        var idUser = idUserObj[0].correo;
        console.log(idUser);
      } catch (e) {
        console.log('Null');
      }
    }

    const mascotaegistrada: any = {
      nombre: this.form.get('nombre')?.value,
      descripcion: this.form.get('descripcion')?.value,
      raza: this.form.get('raza')?.value,
      sexo: this.form.get('sexo')?.value,
      tipo: this.form.get('tipo')?.value,
      direccion: this.form.get('direccion')?.value,
      fotoUrl: ['dsds'],
      idUsuario: idUser,
    };

    if (this._id == undefined) {
      // Agregamos una mascota
      this.mascotaService.saveMascotas(mascotaegistrada).subscribe(
        (data) => {
          this.toastr.success(
            'El usuario fue registrado con exito',
            'Usuario registrado'
          );
        },
        (error) => {
          this.toastr.error('Ocurrió un error', 'Error');
          console.log(error);
        }
      );
    }
    console.log(this.form.value);
    this.mascota = Object.assign(this.mascota, this.form.value);
    localStorage.setItem('Mascotas', JSON.stringify(this.mascota));
  }
}

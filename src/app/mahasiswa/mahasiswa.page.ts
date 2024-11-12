// mahasiswa.page.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-mahasiswa',
  templateUrl: './mahasiswa.page.html',
  styleUrls: ['./mahasiswa.page.scss'],
})
export class MahasiswaPage implements OnInit {
  dataMahasiswa: any;
  modalTambah: any;
  id: any;
  nama: any;
  jurusan: any;
  modalEdit: any;

  constructor(
    private api: ApiService,
    private modal: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.getMahasiswa();
  }

  // Fungsi Helper untuk Menampilkan Alert
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  openModalEdit(isOpen: boolean, idget: any) {
    this.modalEdit = isOpen;
    this.id = idget;
    console.log(this.id);
    this.ambilMahasiswa(this.id);
    this.modalTambah = false;
    this.modalEdit = true;
  }

  resetModal() {
    this.id = null;
    this.nama = '';
    this.jurusan = '';
  }

  openModalTambah(isOpen: boolean) {
    this.modalTambah = isOpen;
    this.resetModal();
    this.modalTambah = true;
    this.modalEdit = false;
  }

  cancel() {
    this.modal.dismiss();
    this.modalTambah = false;
    this.modalEdit = false;
    this.resetModal();
  }

  getMahasiswa() {
    this.api.tampil('tampil.php').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.dataMahasiswa = res;
      },
      error: (err: any) => {
        console.log(err);
        this.presentAlert('Error', 'Gagal memuat data mahasiswa.');
      },
    });
  }

  tambahMahasiswa() {
    if (this.nama != '' && this.jurusan != '') {
      let data = {
        nama: this.nama,
        jurusan: this.jurusan,
      }
      this.api.tambah(data, 'tambah.php')
        .subscribe({
          next: (hasil: any) => {
            this.resetModal();
            console.log('berhasil tambah mahasiswa');
            this.getMahasiswa();
            this.modalTambah = false;
            this.modal.dismiss();
            this.presentAlert('Sukses', 'Mahasiswa berhasil ditambahkan.');
          },
          error: (err: any) => {
            console.log('gagal tambah mahasiswa');
            this.presentAlert('Error', 'Gagal menambahkan mahasiswa.');
          }
        })
    } else {
      console.log('gagal tambah mahasiswa karena masih ada data yg kosong');
      this.presentAlert('Peringatan', 'Nama dan Jurusan tidak boleh kosong.');
    }
  }

  async konfirmasiHapus(id: any) {
    const alert = await this.alertController.create({
      header: 'Konfirmasi',
      message: 'Apakah anda yakin ingin menghapus data ini?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Konfirmasi batal: blah');
          }
        }, {
          text: 'Ya',
          handler: () => {
            this.hapusMahasiswa(id);
          }
        }
      ]
    });
    await alert.present();
  }

  hapusMahasiswa(id: any) {
    this.api.hapus(id, 'hapus.php?id=').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.getMahasiswa();
        console.log('berhasil hapus data');
        this.presentAlert('Sukses', 'Mahasiswa berhasil dihapus.');
      },
      error: (error: any) => {
        console.log('gagal');
        this.presentAlert('Error', 'Gagal menghapus mahasiswa.');
      }
    })
  }

  ambilMahasiswa(id: any) {
    this.api.lihat(id, 'lihat.php?id=').subscribe({
      next: (hasil: any) => {
        console.log('sukses', hasil);
        let mahasiswa = hasil;
        this.id = mahasiswa.id;
        this.nama = mahasiswa.nama;
        this.jurusan = mahasiswa.jurusan;
      },
      error: (error: any) => {
        console.log('gagal ambil data');
        this.presentAlert('Error', 'Gagal mengambil data mahasiswa.');
      }
    })
  }

  editMahasiswa() {
    let data = {
      id: this.id,
      nama: this.nama,
      jurusan: this.jurusan
    }
    this.api.edit(data, 'edit.php')
      .subscribe({
        next: (hasil: any) => {
          console.log(hasil);
          this.resetModal();
          this.getMahasiswa();
          console.log('berhasil edit Mahasiswa');
          this.modalEdit = false;
          this.modal.dismiss();
          this.presentAlert('Sukses', 'Mahasiswa berhasil diubah.');
        },
        error: (err: any) => {
          console.log('gagal edit Mahasiswa');
          this.presentAlert('Error', 'Gagal mengubah mahasiswa.');
        }
      })
  }

}

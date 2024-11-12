# Dokumentasi CRUD Aplikasi Data Mahasiswa

Aplikasi ini memungkinkan pengguna untuk menambah, melihat, mengedit, dan menghapus data mahasiswa menggunakan teknologi Ionic dan Angular. Berikut adalah screenshots yang menggambarkan proses CRUD dalam aplikasi ini.

---

## 1. Halaman Tampil Data Mahasiswa

![Screenshot 2024-11-12 204410](https://github.com/user-attachments/assets/4fe25101-1d5b-4ffe-8b7b-b2c489882cdd)


Pada halaman ini, data mahasiswa ditampilkan dalam bentuk daftar. Setiap item mahasiswa memiliki tombol **Edit** dan **Hapus**, serta ada tombol **Tambah Mahasiswa** di bagian atas halaman untuk menambahkan data mahasiswa baru.


```html
<!-- Tombol Tambah Mahasiswa -->
<ion-button (click)="openModalTambah(true)" expand="block">
  <ion-icon slot="start" name="person-add-outline"></ion-icon>
  Tambah Mahasiswa
</ion-button>

<!-- Daftar Mahasiswa dengan Tombol Edit dan Hapus -->
<ion-card *ngFor="let item of dataMahasiswa">
  <ion-item>
    <ion-label>
      {{item.nama}}
      <p>{{item.jurusan}}</p>
    </ion-label>
    <ion-button expand="block" (click)="openModalEdit(true, item.id)">
      <ion-icon slot="start" name="create-outline"></ion-icon>
      Edit
    </ion-button>
    <ion-button color="danger" slot="end" (click)="konfirmasiHapus(item.id)">
      <ion-icon slot="start" name="trash-outline"></ion-icon>
      Hapus
    </ion-button>
  </ion-item>
</ion-card>
```

Kode di atas menampilkan daftar mahasiswa dengan opsi untuk menambah, mengedit, dan menghapus data mahasiswa.

## 2. Halaman Tambah Mahasiswa

![Screenshot 2024-11-12 204434](https://github.com/user-attachments/assets/e5359e63-4b00-437d-911d-40b025e3b21d)


Pada halaman ini, pengguna dapat memasukkan nama dan jurusan mahasiswa yang ingin ditambahkan. Setelah memasukkan data, pengguna dapat menekan tombol **Tambah Mahasiswa** untuk menyimpan data.


```html
<!-- Modal Tambah Mahasiswa -->
<ion-modal [isOpen]="modalTambah" (ionModalDidDismiss)="cancel()">
  <ng-template>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button (click)="cancel()">
            <ion-icon slot="start" name="close-circle-outline"></ion-icon>
            Batal
          </ion-button>
        </ion-buttons>
        <ion-title>Tambah Mahasiswa</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-input label="Nama Mahasiswa" labelPlacement="floating" required [(ngModel)]="nama"
          placeholder="Masukkan Nama Mahasiswa" type="text">
        </ion-input>
      </ion-item>
      <ion-item>
        <ion-input label='Jurusan Mahasiswa' labelPlacement="floating" required [(ngModel)]="jurusan"
          placeholder="Masukkan Jurusan Mahasiswa" type="text">
        </ion-input>
      </ion-item>
      <ion-row>
        <ion-col>
          <ion-button type="button" (click)="tambahMahasiswa()" color="primary" shape="full" expand="block">
            <ion-icon slot="start" name="add-circle-outline"></ion-icon>
            Tambah Mahasiswa
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-content>
  </ng-template>
</ion-modal>
```

Kode ini menampilkan modal untuk menambah data mahasiswa baru. Saat tombol **Tambah Mahasiswa** ditekan, fungsi `tambahMahasiswa()` akan dipanggil untuk menyimpan data.

---

## 3. Halaman Tampil Data Mahasiswa dengan Alert Sukses Tambah Mahasiswa

![Screenshot 2024-11-12 204439](https://github.com/user-attachments/assets/08500495-8707-41c6-9ccb-9cc8eb9b9b7c)

Setelah mahasiswa berhasil ditambahkan, muncul notifikasi atau alert yang menandakan bahwa proses penambahan data mahasiswa berhasil.


```typescript
tambahMahasiswa() {
  if (this.nama != '' && this.jurusan != '') {
    let data = {
      nama: this.nama,
      jurusan: this.jurusan,
    };
    this.api.tambah(data, 'tambah.php').subscribe({
      next: () => {
        this.resetModal();
        this.getMahasiswa();
        this.modalTambah = false;
        this.modal.dismiss();
        this.presentAlert('Sukses', 'Mahasiswa berhasil ditambahkan.');
      },
      error: () => {
        this.presentAlert('Error', 'Gagal menambahkan mahasiswa.');
      }
    });
  } else {
    this.presentAlert('Peringatan', 'Nama dan Jurusan tidak boleh kosong.');
  }
}
```

Fungsi `tambahMahasiswa()` ini melakukan validasi data, lalu mengirim permintaan ke backend untuk menyimpan data. Setelah berhasil, alert "Mahasiswa berhasil ditambahkan" ditampilkan.

---

## 4. Halaman Edit Mahasiswa

![Screenshot 2024-11-12 204454](https://github.com/user-attachments/assets/3b959ac6-bed2-43ba-9e32-97a06486c989)

Pada halaman ini, pengguna dapat mengedit data mahasiswa yang dipilih. Setelah melakukan perubahan, pengguna dapat menyimpan perubahan dengan menekan tombol **Edit Mahasiswa**.


```html
<!-- Modal Edit Mahasiswa -->
<ion-modal [isOpen]="modalEdit" (ionModalDidDismiss)="cancel()">
  <ng-template>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button (click)="cancel()">
            <ion-icon slot="start" name="close-circle-outline"></ion-icon>
            Batal
          </ion-button>
        </ion-buttons>
        <ion-title>Edit Mahasiswa</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-input label="Nama Mahasiswa" labelPlacement="floating" required [(ngModel)]="nama"
          placeholder="Masukkan Nama Mahasiswa" type="text">
        </ion-input>
      </ion-item>
      <ion-item>
        <ion-input label='Jurusan Mahasiswa' labelPlacement="floating" required [(ngModel)]="jurusan"
          placeholder="Masukkan Jurusan Mahasiswa" type="text">
        </ion-input>
      </ion-item>
      <ion-row>
        <ion-col>
          <ion-button type="button" (click)="editMahasiswa()" color="primary" shape="full" expand="block">
            <ion-icon slot="start" name="create-outline"></ion-icon>
            Edit Mahasiswa
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-content>
  </ng-template>
</ion-modal>
```

Modal ini menampilkan form untuk mengedit data mahasiswa. Setelah data diperbarui, fungsi `editMahasiswa()` akan menyimpan perubahan.

---

## 5. Halaman Tampil Data Mahasiswa dengan Alert Sukses Edit Mahasiswa

![Screenshot 2024-11-12 204458](https://github.com/user-attachments/assets/b4c574d2-9371-43cc-bd9c-6250f0b42ebc)

Setelah data mahasiswa berhasil diubah, muncul alert yang menandakan bahwa proses edit berhasil dilakukan.


```typescript
editMahasiswa() {
  let data = {
    id: this.id,
    nama: this.nama,
    jurusan: this.jurusan
  };
  this.api.edit(data, 'edit.php').subscribe({
    next: () => {
      this.resetModal();
      this.getMahasiswa();
      this.modalEdit = false;
      this.modal.dismiss();
      this.presentAlert('Sukses', 'Mahasiswa berhasil diubah.');
    },
    error: () => {
      this.presentAlert('Error', 'Gagal mengubah mahasiswa.');
    }
  });
}
```

Fungsi `editMahasiswa()` mengirim data yang diperbarui ke backend. Setelah berhasil, alert "Mahasiswa berhasil diubah" ditampilkan.

---

## 6. Halaman Tampil Data Mahasiswa dengan Konfirmasi Hapus Mahasiswa

![Screenshot 2024-11-12 204503](https://github.com/user-attachments/assets/20d0bd57-8704-4a17-9fc9-7a1970708a2f)

Saat pengguna memilih untuk menghapus mahasiswa, dialog konfirmasi ditampilkan untuk memastikan bahwa pengguna benar-benar ingin menghapus data tersebut.


```typescript
async konfirmasiHapus(id: any) {
  const alert = await this.alertController.create({
    header: 'Konfirmasi',
    message: 'Apakah anda yakin ingin menghapus data ini?',
    buttons: [
      { text: 'Batal', role: 'cancel' },
      { text: 'Ya', handler: () => { this.hapusMahasiswa(id); } }
    ]
  });
  await alert.present();
}
```

Dialog konfirmasi ini memberikan opsi kepada pengguna untuk membatalkan atau melanjutkan proses penghapusan.

---

## 7. Halaman Tampil Data Mahasiswa dengan Alert Sukses Hapus Mahasiswa

![Screenshot 2024-11-12 204508](https://github.com/user-attachments/assets/8b750a26-d946-4a26-8da9-0954875f5e64)

Setelah data mahasiswa berhasil dihapus, alert yang menandakan keberhasilan penghapusan data ditampilkan.


```typescript
hapusMahasiswa(id: any) {
  this.api.hapus(id, 'hapus.php?id=').subscribe({
    next: () => {
      this.getMahasiswa();
      this.presentAlert('Sukses', 'Mahasiswa berhasil dihapus.');
    },
    error: () =>

 {
      this.presentAlert('Error', 'Gagal menghapus mahasiswa.');
    }
  });
}
```

Fungsi `hapusMahasiswa()` memanggil API untuk menghapus data dari backend. Setelah berhasil, alert "Mahasiswa berhasil dihapus" ditampilkan.

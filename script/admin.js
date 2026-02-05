function requestNotificationPermission() {
  // Menggunakan confirm() untuk menampilkan tombol OK dan Cancel
  var konfirmasi = confirm("ini akan membawa anda ke halaman adminsitrator, apakah ingin melanjutkan?");

  // Memeriksa tombol mana yang ditekan pengguna
  if (konfirmasi) {
    // Kode ini akan dieksekusi jika pengguna menekan "OK" (Lanjutkan)
    var otew = confirm("Anda yakin ingin melanjutkan sebagai administrator?");
    // Tambahkan logika selanjutnya di sini
    if (otew) {
        // menuju halaman admin
        window.location.href = "login.html";
    }

  } else {
    // Kode ini akan dieksekusi jika pengguna menekan "Cancel" (Batalkan)
    alert("Anda memilih Batalkan. Proses dibatalkan.");
    // Tambahkan logika pembatalan di sini
    return false; // Mencegah navigasi ke halaman admin
  }
}
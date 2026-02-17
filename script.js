// Inisialisasi Supabase (ganti dengan URL dan anon key dari project Supabase Anda)
const supabaseUrl = 'https://piaycptnvkyahallyysx.supabase.co'; // Ganti dengan URL project Supabase Anda
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpYXljcHRudmt5YWhhbGx5eXN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwMTIyMzcsImV4cCI6MjA4NjU4ODIzN30.ADYwz_gLL7GzsZXOvWTSLNWyaYQurR3fGQdzl7qnEWU'; // Ganti dengan anon key dari Supabase dashboard
const supabaselokal = supabase.createClient(supabaseUrl, supabaseAnonKey);

let siswaData = []; // Array untuk menyimpan data siswa dari DB

document.addEventListener("DOMContentLoaded", async function() {
    const intro = document.getElementById('intro');
    const nav = document.getElementById('main-nav');
    const body = document.body;
    const logo = document.getElementById('logo');
    const texts = document.querySelectorAll('#text-container > div');

    // Cek sessionStorage apakah intro sudah pernah ditampilkan di sesi ini
    if (sessionStorage.getItem('introShown')) {
        intro.style.display = 'none';
        nav.style.display = 'flex';
        body.classList.add('loaded');
    } else {
        intro.style.display = 'flex';
        nav.style.display = 'none';

        anime({
            targets: logo,
            opacity: [0, 1],
            scale: [0.5, 1],
            duration: 1000,
            easing: 'easeOutExpo'
        });

        anime({
            targets: texts,
            opacity: [0, 1],
            translateY: [20, 0],
            delay: anime.stagger(300, {start: 1000}),
            duration: 800,
            easing: 'easeOutExpo'
        });

        setTimeout(function() {
            anime({
                targets: intro,
                opacity: [1, 0],
                duration: 1000,
                easing: 'easeInOutQuad',
                complete: function() {
                    intro.style.display = 'none';
                    nav.style.display = 'flex';
                    body.classList.add('loaded');
                    sessionStorage.setItem('introShown', 'true');
                }
            });
        }, 2000);
    }

    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    const navRight = document.getElementById('navRight');
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navRight.classList.toggle('show');
    });

    // Fetch data siswa dari Supabase dengan kolom baru
    try {
        const { data: siswa, error } = await supabaselokal
            .from('siswa')
            .select('id, nama_siswa, "akun IG", "akun Tiktok", "tanggal lahir", pesan')
            .order('id', { ascending: true });
        
        if (error) throw error;
        
        // Map data ke format yang diperlukan (untuk kompatibilitas dengan modal)
        siswaData = (siswa || []).map(item => ({
            nama: item.nama_siswa,
            no_urut: item.id, // Gunakan id sebagai no_urut
            pesan: item.pesan || 'Tidak ada pesan',
            tanggal_lahir: item["tanggal lahir"] || 'Tidak ada',
            instagram: item["akun IG"] || '#',
            tiktok: item["akun Tiktok"] || '#',
            foto: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png' // Placeholder
        }));
        
        renderSiswaCards();
    } catch (error) {
        console.error('Error fetching siswa data:', error);
        alert('Gagal memuat data siswa. Silakan coba lagi.');
    }

    // Fungsi untuk render card siswa
    function renderSiswaCards() {
        const grid = document.getElementById('siswaGrid');
        grid.innerHTML = ''; // Clear existing
        
        if (siswaData.length === 0) {
            grid.innerHTML = '<p>Tidak ada data siswa.</p>';
            return;
        }
        
        siswaData.forEach((siswa, index) => {
            const card = document.createElement('div');
            card.className = 'siswa-card';
            card.setAttribute('data-index', index);
            card.innerHTML = `
                <img src="${siswa.foto}" alt="${siswa.nama}">
                <h3>${siswa.nama}</h3>
            `;
            grid.appendChild(card);
        });
        
        // Tambahkan event listener untuk modal
        document.querySelectorAll('.siswa-card').forEach(card => {
            card.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                const siswa = siswaData[index];
                showModal(siswa);
            });
        });
    }

    // Fungsi untuk menampilkan modal
    function showModal(siswa) {
        const modal = document.getElementById('siswaModal');
        const modalImg = document.getElementById('modalImg');
        const modalName = document.getElementById('modalName');
        const modalNo = document.getElementById('modalNo');
        const modalDob = document.getElementById('modalDob');
        const modalIg = document.getElementById('modalIg');
        const modalTiktok = document.getElementById('modalTiktok');
        const modalPesan = document.getElementById('modalPesan');

        
        modalImg.src = siswa.foto;
        modalName.textContent = siswa.nama;
        modalNo.textContent = siswa.no_urut;
        modalDob.textContent = siswa.tanggal_lahir;
        modalIg.href = siswa.instagram.startsWith('http') ? siswa.instagram : '#';
        modalIg.textContent = siswa.instagram !== '#' ? '@' + siswa.instagram.split('/').pop() : 'Tidak ada';
        modalTiktok.href = siswa.tiktok.startsWith('http') ? siswa.tiktok : '#';
        modalTiktok.textContent = siswa.tiktok !== '#' ? '@' + siswa.tiktok.split('/').pop() : 'Tidak ada';
        modalPesan.textContent = siswa.pesan || 'Tidak ada pesan';
        
        modal.showModal();
    }

    // Tutup modal
    const closeModal = document.getElementById('closeModal');
    const modal = document.getElementById('siswaModal');
    closeModal.addEventListener('click', () => modal.close());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.close();
    });
});

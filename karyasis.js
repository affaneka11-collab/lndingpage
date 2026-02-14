        // Inisialisasi Supabase (sudah terhubung)
        const supabaseUrl = 'https://piaycptnvkyahallyysx.supabase.co';
        const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpYXljcHRudmt5YWhhbGx5eXN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwMTIyMzcsImV4cCI6MjA4NjU4ODIzN30.ADYwz_gLL7GzsZXOvWTSLNWyaYQurR3fGQdzl7qnEWU';
        const supabaselokal = supabase.createClient(supabaseUrl, supabaseAnonKey);

        async function loadKaryaSiswa() {
            try {
                console.log('Loading karya siswa...');
                const { data: karya, error } = await supabaselokal.from('karya').select('*');
                if (error) throw error;
                console.log('Karya siswa data:', karya);
                const grid = document.getElementById('prestasiGrid');
                const noPrestasi = document.getElementById('noPrestasi');
                grid.innerHTML = '';
                if (karya.length === 0) {
                    noPrestasi.style.display = 'block';
                } else {
                    noPrestasi.style.display = 'none';
                    karya.forEach((item) => {
                        const card = document.createElement('div');
                        card.className = 'prestasi-card';
                        card.innerHTML = `
                            <img src="${item.image_url}" style="width: 100%; height: auto; border-radius: 5px; margin-bottom: 10px;">
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                        `;
                        grid.appendChild(card);
                    });
                }
            } catch (error) {
                console.error('Error loading karya siswa:', error);
            }
        }

        window.onload = loadKaryaSiswa;

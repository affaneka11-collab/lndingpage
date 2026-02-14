        // Inisialisasi Supabase (sudah terhubung)
        const supabaseUrl = 'https://piaycptnvkyahallyysx.supabase.co';
        const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpYXljcHRudmt5YWhhbGx5eXN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwMTIyMzcsImV4cCI6MjA4NjU4ODIzN30.ADYwz_gLL7GzsZXOvWTSLNWyaYQurR3fGQdzl7qnEWU';
        const supabaselokal = supabase.createClient(supabaseUrl, supabaseAnonKey);

        async function loadPrestasi() {
            try {
                console.log('Loading prestasi...');
                const { data: prestasi, error } = await supabaselokal.from('prestasi').select('*');
                if (error) throw error;
                console.log('Prestasi data:', prestasi);
                const grid = document.getElementById('prestasiGrid');
                const noPrestasi = document.getElementById('noPrestasi');
                grid.innerHTML = '';
                if (prestasi.length === 0) {
                    noPrestasi.style.display = 'block';
                } else {
                    noPrestasi.style.display = 'none';
                    prestasi.forEach((item) => {
                        const card = document.createElement('div');
                        card.className = 'prestasi-card';
                        card.innerHTML = `
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                        `;
                        grid.appendChild(card);
                    });
                }
            } catch (error) {
                console.error('Error loading prestasi:', error);
            }
        }

        window.onload = loadPrestasi;
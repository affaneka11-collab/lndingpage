<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Kelas 8 Benevolent</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        .login-container { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); width: 300px; }
        input { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ccc; border-radius: 4px; }
        button { width: 100%; padding: 10px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }
        button:hover { background: #0056b3; }
        .error { color: red; font-size: 14px; }
    </style>
</head>
<body>
    <div class="login-container">
        <h2>Login</h2>
        <input type="text" id="username" placeholder="Username" required>
        <input type="password" id="password" placeholder="Password" required>
        <button onclick="login()">Login</button>
        <p id="error" class="error"></p>
    </div>

    <script>
        const API_URL = 'https://kdgjpvebpgxbtdxdsaff.supabase.co/functions/v1/accounts-api';
        const SUPABASE_ANON_KEY = 'sb_publishable_Hn-ADpLFOMImD47sSB_8wQ_OG8vuMa1';  // Ganti jika key salah

        async function login() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            if (!username || !password) {
                document.getElementById('error').textContent = 'Isi username dan password!';
                return;
            }

            try {
                const response = await fetch(`${API_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });
                const data = await response.json();
                if (data.success) {
                    localStorage.setItem('userRole', data.role);  // Simpan role untuk admin.html
                    window.location.href = 'admin.html';  // Redirect ke admin
                } else {
                    document.getElementById('error').textContent = data.message;
                }
            } catch (err) {
                document.getElementById('error').textContent = 'Error: ' + err.message;
            }
        }
    </script>
</body>
</html>

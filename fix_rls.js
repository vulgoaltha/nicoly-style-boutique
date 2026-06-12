const token = 'sbp_0f49cc286fab9d71cdacbdca3cf43299acec406b';
const query = `CREATE POLICY "user_roles_select_own" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);`;

fetch('https://api.supabase.com/v1/projects/zycwvatimjfbsfnjjvns/query', {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
}).then(r => r.json()).then(console.log).catch(console.error);

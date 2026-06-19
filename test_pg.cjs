const { Client } = require('pg');

async function test() {
    const client = new Client({
        connectionString: 'postgresql://postgres.zycwvatimjfbsfnjjvns:A1909m2610@123@aws-0-sa-east-1.pooler.supabase.com:6543/postgres'
    });
    
    try {
        await client.connect();
        const res = await client.query('SELECT 1 as num');
        console.log('Connected!', res.rows);
        
        await client.query(`CREATE POLICY "user_roles_select_own" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);`);
        console.log('Policy created!');
        
        await client.end();
    } catch (e) {
        console.error(e);
    }
}
test();

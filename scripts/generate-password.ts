import * as bcrypt from 'bcrypt';

async function hashPassword() {
  const password = 'UnifilmAdmin123'; // This will be your admin password
  const hash = await bcrypt.hash(password, 10);
  console.log('Your password hash:', hash);
}

hashPassword(); 
const bcrypt = require('bcrypt');

async function hashPassword() {
  const password = 'UnifilmAdmin123';
  try {
    const hash = await bcrypt.hash(password, 10);
    
    console.log('\n=== COPY EVERYTHING BETWEEN THESE LINES ===');
    console.log('-----------------------------------------------');
    console.log('ADMIN_EMAIL=admin@unifilm.edu.gh');
    console.log(`ADMIN_PASSWORD_HASH=${hash}`);
    console.log('-----------------------------------------------');
    console.log('\nMake sure to copy the ENTIRE hash, including the $2b$ at the start\n');
    console.log('Then use these credentials to login:');
    console.log('Email: admin@unifilm.edu.gh');
    console.log('Password: UnifilmAdmin123\n');

    // Verify the hash
    const testVerify = await bcrypt.compare(password, hash);
    console.log('Hash verification test:', testVerify ? 'PASSED ✅' : 'FAILED ❌');
  } catch (error) {
    console.error('Error:', error);
  }
}

hashPassword(); 
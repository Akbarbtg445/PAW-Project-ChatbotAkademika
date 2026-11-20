const aiml = require('../services/aiml.service');

console.log('Total AIML Rules:', aiml.getRuleCount());

const queries = [
  'halo',
  'hai',
  'bagaimana alur krs',
  'cara isi krs',
  'jadwal kuliah',
  'syarat bebas pustaka',
  'prosedur yudisium',
  'kontak baak',
  'siapa presiden indonesia' // harus fallback (null)
];

queries.forEach(q => {
  const match = aiml.findMatch(q);
  console.log(`\nQuery: "${q}"`);
  console.log(`Result: ${match ? 'MATCHED (AIML)' : 'NULL (Fallback to Gemini)'}`);
  if (match) console.log(`Response Preview: ${match.substring(0, 60)}...`);
});

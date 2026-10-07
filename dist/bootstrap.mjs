try{await import('./app.mjs');}catch{
 const status=document.getElementById('status');status.textContent='The analysis tool could not load. Please reload or try again later. No address has been sent.';status.className='error';
}

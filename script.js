window.onload = () => {
  
  const number = document.querySelector('.big-number');
  const text = document.querySelector('.text');
  
  async function loadData(param) {
    try {
      /*
        jika parameter param tidak ada isi atau tidak ada argumen
        maka, jalankan fungsi getRandomNumber(). tapi jika parameter param 
        memiliki argumen, maka pakai argumen parameter param tersebut.
      */
      const result = !param ? getRandomNumber(0, 500) : param;
      // ambil data
      const data = await fetchData(result);
      // set angka acak dan data yang didapat
      setValue(result, data);
    } catch (error) {
      /*
        jika mengalami error saat mengambil data,
        maka tampilkan errornya
      */
      // element box
      const box = number.parentElement.parentElement;
      // tampilkan error
      box.innerHTML = showError(error);
    }
  }
  
  loadData();
  
  function fetchData(param) {
    // API (application programming interface)
    return fetch(`http://numbersapi.com/` + param)
      .then(response => response.text())
      .then(response => response)
      .catch(error => {
        // jika mengalami error saat mengambil data
        throw new Error(error);
      });
  }
  
  function getRandomNumber(min, max) {
    // dapatkan angka acak
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  function showError(message) {
    return `
    <div class="col-md-6 mx-auto">
      <div class="alert alert-danger" role="alert">
        <h3 class="fw-normal mb-2">Error!</h3>
        <span class="fw-light">${message}</span>
      </div>
    </div>
    `;
  }
  
  function setValue(result, data) {
    // set value
    number.textContent = result;
    text.textContent = data;
  }
  
  // tombol generate 
  const generatsButton = document.querySelector('.btn-random');
  generatsButton.addEventListener('click', () => loadData());
  
  const input = document.querySelector('.input');
  const submitButton = document.querySelector('.btn-submit');
  submitButton.addEventListener('click', () => {
    // value input
    const value = input.value.trim();
    // validasi
    if (validate(value) == true) {
      // jalankan fungsi loadData()
      loadData(value);
      // bersihkan value input
      input.value = '';
    }
  });
  
  function validate(value) {
    // jika input kosong
    if (!value) return alert(`field is empty!`);
    // jika input berisikan huruf
    if (value.match(/[a-zA-Z]/gmi)) return alert('field just only contain numbers!');
    // jika berhasil melewati semua validasi
    return true;
  }
  
}
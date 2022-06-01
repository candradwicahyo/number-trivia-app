window.onload = () => {
  
  const number = document.querySelector('.number');
  const text = document.querySelector('.text');
  
  let url = 'http://numbersapi.com/';
  
  async function getRandomFact() {
    const limit = 300;
    const getRandomNumber = Math.floor((Math.random() * limit) + 1);
    const data = await getData(getRandomNumber);
    putValue(getRandomNumber, data);
  }
  
  getRandomFact();
  
  function getData(param) {
    return fetch(url + param)
      .then(response => response.text())
      .then(response => response)
  }
  
  function putValue(randomNumber, data) {
    number.textContent = randomNumber;
    text.textContent = data;
  }
  
  const getRandomFactButton = document.querySelector('.random');
  getRandomFactButton.addEventListener('click', getRandomFact);
  
  const input = document.querySelector('.input');
  const getFactButton = document.querySelector('.submit');
  getFactButton.addEventListener('click', async () => {
    if (validate(input.value) == true) {
      const value = input.value;
      const data = await getData(value);
      putValue(value, data);
    }
  });
  
  function validate(number) {
    if (!number) return sweetalert('error', 'Error', 'isi input terlebih dahulu!');
    if (number < 0 || number > 300) return sweetalert('error', 'Error', 'isi input antara 0 sampai 300');
    if (number.match(/[a-zA-Z]/gmi)) return sweetalert('error', 'Error', 'input hanya boleh berisikan angka saja!');
    return true;
  }
  
  function sweetalert(icon, title, text) {
    return swal.fire ({
      icon: icon,
      title: title,
      text: text
    });
  }
  
}

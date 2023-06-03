// lc wakiki smart recommender project
const apiUrl = '*****';

const compressedCss =
  '.sr-wrapper{position:relative;display:flex;flex-direction:column;margin:30px;height:400px;border:1px solid #000;z-index:999999}.sr-title{padding:10px}.sr-slider{display:flex;flex-direction:row;align-items:center;gap:20px;margin-left:10px;margin-right:10px}.arrow{font-size:40px;max-width:2.5%;min-width:2.5;cursor:pointer}.sr-items{display:flex;flex-direction:row;gap:10px;overflow:hidden}.item-card{text-align:center;position:relative;min-width:19%;max-width:20%}.item-img{max-width:100%;max-height:200px}a{text-decoration:none;color:#000}a>.item-price{color:red}@media only screen and (max-width:600px) and (min-width:400px){.sr-items{padding-right:25px;padding-left:5px}}@media only screen and (max-width:992px) and (min-width:601px){.sr-items{padding-right:25px;padding-left:5px}}';

(function build() {
  if (document.querySelector('.sr-wrapper')) {
    document.querySelector('.sr-wrapper').remove();
  }
  addCss();
  addJquery();
})();

setTimeout(() => {
  $(document).ready(() => {
    htmlBuilder();
  });

  let left_start = 1;
  $(document).on('click', '.left', () => {
    console.log(right_start, left_start);
    $('.sr-items').prepend($('.sr-items .item-card:last'));
    $("div[item-cso='" + (right_start - 1) + "']").fadeOut(250);
    $('.sr-items .item-card:first').fadeIn(250);

    right_start--;
    left_start--;
    if (right_start < 1) right_start = 10;
    if (left_start < 1) left_start = 10;
  });

  let right_start = 6;
  $(document).on('click', '.right', () => {
    console.log(right_start, left_start);
    $("div[item-cso='" + right_start + "']").fadeIn(250);
    $("div[item-cso='" + left_start + "']").fadeOut(250);
    $('.sr-items').append($("div[item-cso='" + left_start + "']"));

    left_start++;
    right_start++;
    if (right_start > 10) right_start = 1;
    if (left_start > 10) left_start = 1;
  });
}, 200);

function addCss() {
  if (!document.querySelector('#addCss')) {
    const style = document.createElement('style');
    style.id = 'addCss';
    style.innerText = compressedCss;
    document.getElementsByTagName('head')[0].appendChild(style);
  }
}

function addJquery() {
  if (!document.querySelector('#addJquery')) {
    const jQuery = document.createElement('script');
    jQuery.id = 'addJquery';
    jQuery.src = 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js';
    document.getElementsByTagName('head')[0].appendChild(jQuery);
  }
}

async function getItems() {
  const response = await fetch(apiUrl);
  return await response.json();
}

async function htmlBuilder() {
  const products = await getItems();

  let html =
    '<div class="sr-wrapper">' +
    '<h3 class="sr-title">You Might Also Like</h3>' +
    '<div class="sr-slider">' +
    '<div class="arrow left">&lt;</div>' +
    '<div class="sr-items">';

  products.forEach((product) => {
    html +=
      `<div class="item-card" item-cso=${product.id}>` +
      `<a href=${product.url} target="_blank">` +
      `<img class="item-img" src="${product.img}" alt=""/>` +
      `<p class="item-name">${product.name}</p>` +
      ` <p class="item-price">${product.price == undefined ? '' : product.price + ' TL'}</p>` +
      ' </a>' +
      '</div>';
  });

  html += '</div>' + '<div class="arrow right">&gt;</div>' + '</div>' + '</div>' + '</div>';
  document.querySelector('.footer-content').innerHTML += html;

  $("div[item-cso='6']").hide();
  $("div[item-cso='7']").hide();
  $("div[item-cso='8']").hide();
  $("div[item-cso='9']").hide();
  $("div[item-cso='10']").hide();
}

// Add to Cart Button Animation
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    button.textContent = 'Added!';
    button.classList.add('btn-success');
    setTimeout(() => {
      button.textContent = 'Add to Cart';
      button.classList.remove('btn-success');
    }, 2000);
  });
});
// Add this to script.js
$('.order').click(function (e) {
  let button = $(this);
  if (!button.hasClass('animate')) {
    button.addClass('animate');
    setTimeout(() => {
      button.removeClass('animate');
    }, 10000);
  }
});

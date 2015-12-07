$j = jQuery.noConflict();
$j(document).ready(function() {

  $j('.tabs li').each(function() {
    $j(this).mouseenter(function (e) {
      $j(e.target).closest('li').addClass('open');
    })
  });
  
  $j('.tabs li').each(function() {
    $j(this).mouseleave(function (e) {
      $j(e.target).closest('li').removeClass('open');
    })
  });
  
  $j('.accordion ul li h3 a.toggle').not('.accordion ul li ul li h3 a.toggle').click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    $j(this).closest('li').find('ul').first().toggle('fast');
    $j(this).closest('li').toggleClass('sidenavopen');
  }).closest('li').find('ul').not('ul.display').hide();
  $j('ul.display').closest('li').addClass('sidenavopen');
  
})
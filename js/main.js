$(function () {

  calculate();
  sort();
  $(".show-all").hide();
  $(".hide").hide();
  $('form')[0].reset();


  $(".header__menu-btn").on("click", function () {
    if (window.matchMedia('(max-width: 550px)').matches) {
      $(".menu-popup").css("width", "100%");
    } else if (window.matchMedia('(max-width: 1165px)').matches) {
      $(".menu-popup").css("width", "50%");
    } else {
      $(".menu-popup").css("width", "33%");
    }
  })

  $(".close-btn").on("click", function () {
    $(".menu-popup").css("width", "0");
  })

  /* Calculator */

  $(".radio__real, .package-button__real").on("change", calculate);

  function calculate() {
    let averagePerMeter = 4850,
      area = $(".radio__real:checked").val(),
      package = $(".package-button__real:checked").val(),
      price = area * averagePerMeter * package,
      priceFormatted = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),
      averagePerMeterFormatted = averagePerMeter.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),
      areaFormatted = area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),
      areaText = areaFormatted + "м<sup>2<sup>",
      averageText = averagePerMeterFormatted + " тг.",
      priceText = priceFormatted + " тг.";


    $("#area-size").html(areaText);

    $("#average-cost").html(averageText);

    $("#total-cost").html(priceText);

  }

  /* portfolio filter */
  function sort() {
    let ID = $(".portfolio__button--active").attr('id');
    $(".card").hide();
    if (window.matchMedia('(max-width: 759px)').matches) {
      $("." + ID + ":lt(2)").show(400);
    } else if (window.matchMedia('(max-width: 1129px)').matches) {
      $("." + ID + ":lt(4)").show(400);
    } else {
      $("." + ID + ":lt(6)").show(400);
    }
    let allCards = $("." + ID).length;
    let cardsShown = $("." + ID + ":visible").length;
    if (allCards > cardsShown) {
      $(".show-all").show();
      $(".portfolio").css("min-height", "auto");
    }
  }

  $(".portfolio__button").on("click", function (event) {
    $(".show-all").hide();
    $(".hide").hide();
    $(".portfolio__button").removeClass('portfolio__button--active');
    $target = $(event.target);
    let targetID = $(this).attr("id");

    $target.addClass('portfolio__button--active');

    $(".card").hide();
    if (window.matchMedia('(max-width: 759px)').matches) {
      $("." + targetID + ":lt(2)").show();
    } else if (window.matchMedia('(max-width: 1129px)').matches) {
      $("." + targetID + ":lt(4)").show();
    } else {
      $("." + targetID + ":lt(6)").show(400);
    }
    let allCards = $("." + targetID).length;
    let cardsShown = $("." + targetID + ":visible").length;
    if (allCards > cardsShown) {
      $(".show-all").show();
      $(".portfolio").css("min-height", "auto");
    }
  })



  /* show/hide buttons */

  let ID = $(".portfolio__button--active").attr('id');
  let allCards = $("." + ID).length;
  let cardsShown = $("." + ID + ":visible").length;
  if (allCards > cardsShown) {
    $(".show-all").show();
    $(".portfolio").css("min-height", "auto");
  }

  $(".show-all").on("click", function () {
    $(".card").hide();
    let ID = $(".portfolio__button--active").attr('id');
    let allCards = $("." + ID).length;
    let cardsShown = $("." + ID + ":visible").length;
    $("." + ID).show();
    $(".show-all").hide();
    $(".hide").show();
  })

  $(".hide").on("click", function () {
    $(".card").hide();
    if (window.matchMedia('(max-width: 759px)').matches) {
      $("." + ID + ":lt(2)").show();
    } else if (window.matchMedia('(max-width: 1129px)').matches) {
      $("." + ID + ":lt(4)").show();
    } else {
      $("." + ID + ":lt(6)").show();
    }
    let scrollAid = $(".portfolio");
    $('html,body').scrollTop(scrollAid.offset().top - 200);
    $(".hide").hide();
    $(".show-all").show();
  })

  /* custom scrollbar */

  let ps = new PerfectScrollbar("#scrollbar", {
    maxScrollbarLength: 30
  });

  ps.update();


  /* form validator */

  $('#header-form').validate({
    messages: {
      headerName: "Введите Ваше имя",
      headerPhone: {
        required: "Введите Ваш номер телефона",
        minlength: "Номер должен содержать 11 цифр"
      },
      headerMail: "Введите e-mail"
    },
  });

  $('#footer-form').validate({
    messages: {
      footerName: "Введите Ваше имя",
      footerPhone: {
        required: "Введите Ваш номер телефона",
        minlength: "Номер должен содержать 11 цифр"
      },
      footerMail: "Введите e-mail",
      footerText: {
        required: "Введите сообщение",
        minlength: "Сообщение должно содержать минимум 10 символов"
      }
    },
  });


  /* popup windows */

  $('.btn__submit-form--header').on("click", function (e) {
    e.preventDefault();
    if ($('#header-form').valid()) {
      $('.btn__submit-form--header').magnificPopup({
        type: 'inline',

        fixedContentPos: true,
        fixedBgPos: true,

        overflowY: 'auto',

        closeBtnInside: true,
        preloader: false,

        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-zoom-in',
        callbacks: {
          close: function () {
            location.reload();
          }
        }
      });
      $(this).magnificPopup("open");
      $('#header-form')[0].reset();
    }
  })

  $('.btn__submit-form--footer').on("click", function (e) {
    e.preventDefault();
    if ($('#footer-form').valid()) {
      $('.btn__submit-form--footer').magnificPopup({
        type: 'inline',

        fixedContentPos: true,
        fixedBgPos: true,

        overflowY: 'auto',

        closeBtnInside: true,
        preloader: false,

        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-zoom-in',
        callbacks: {
          close: function () {
            location.reload();
          }
        }
      });
      $(this).magnificPopup("open");
      $('#footer-form')[0].reset();

    }
  })




});
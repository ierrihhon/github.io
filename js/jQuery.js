// -------------------------------------------------- Кнопка-бургер

$(".header_hamgurgerMenu").on("click", function() {
    $(this).closest(".container-header").find(".burger-menu").addClass("active");
});

$(".close-burger-button").on("click", function() {
    $(".burger-menu").removeClass("active");
});

$(".site-chapter").on("click", function() {
    $(".burger-menu").removeClass("active");
    var _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top}, 1200);
    return false;
});

// -------------------------------------------------- Слайдер

$(".settings_button").on("click", function() {
    if ($(".settings_featuresContainer").hasClass("active")) {
        $(".settings_featuresContainer").removeClass("active");
    }
    else {
        $(this).closest(".slider_item-desc").find(".settings_featuresContainer").addClass("active");
    }
});

// -------------------------------------------------- Секция team

$(".teamate_name").on("click", function() {
    $(".teamList_item").removeClass("active");
    $(event.target).closest(".teamList_item").addClass("active");
});

// -------------------------------------------------- Отзывы

$(".reviews_switcher-item").on("click", function() {
    $(".reviews_switcher-item").removeClass("clickable_avatar-active");
    $(this).addClass("clickable_avatar-active");
});

$("#4").on("click", function() {
    $(".reviews_item").removeClass("active");
    $("#1").addClass("active");
});

$("#5").on("click", function() {
    $(".reviews_item").removeClass("active");
    $("#2").addClass("active");
});

$("#6").on("click", function() {
    $(".reviews_item").removeClass("active");
    $("#3").addClass("active");
});


// -------------------------------------------------- Меню-аккордеон

const mesureWidth = item => {
    let reqItemWidth = 0;

    const screenWidth = $(window).width();
    const container = item.closest(".products_menu");
    const titlesBlocks = container.find(".product_menu-title");
    const titlesWidth = titlesBlocks.width() * titlesBlocks.length;

    const textContainer = item.find(".product_menu-container");
    const paddingLeft = parseInt(textContainer.css("padding-left"));
    const paddingRight = parseInt(textContainer.css("padding-right"));

    const lowMobile = window.matchMedia("(max-width: 540px)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (lowMobile) {
        reqItemWidth = screenWidth - titlesWidth;
    }
    else if (isMobile) {
        reqItemWidth = screenWidth - titlesWidth;
    }
    else {
        reqItemWidth = 500;
    }

    return {
        container: reqItemWidth,
        textContainer: reqItemWidth - paddingLeft - paddingRight
    }
}

const closeEveryItemInContainer = container => {
    const items = container.find(".product_menu-item");
    const content = container.find(".product_menu-content");

    items.removeClass("active");
    content.width(0);
}

const openItem = (item) => {
    const hiddenContent = item.find(".product_menu-content");
    const requiredWidth = mesureWidth(item);
    const textBlock = item.find(".product_menu-container");

    item.addClass("active");
    hiddenContent.width(requiredWidth.container);
    textBlock.width(requiredWidth.textContainer);
}

$(".product_menu-title").on("click", e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const item = $this.closest(".product_menu-item");
    const itemOpened = item.hasClass("active");
    const container = $this.closest(".products_menu");

    if (itemOpened) {
        closeEveryItemInContainer(container)
    }
    else {
        closeEveryItemInContainer(container)
        openItem(item);
    }
});

$(".color_menu-title").on("click", e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const item = $this.closest(".color_menu-item");
    $(".color_menu-item").removeClass("active").addClass("hidden");
    item.removeClass("hidden").addClass("active");
});

$(".color_menu-content").on("click", e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    $this.closest(".color_menu-item").removeClass("active");
    $(".color_menu-item").removeClass("hidden");
});

// -------------------------------------------------- Карта

let myMap; 

    const init = () => {
        myMap = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 13,
            controls: []
        });

        const coords = [
            [55.746109, 37.582333],
            [55.759148, 37.580853],
            [55.750835, 37.599603],
            [55.760178, 37.618574]
        ];

        const myCollection = new ymaps.GeoObjectCollection({}, {
            draggable: false,
            iconLayout: 'default#image',
            iconImageHref: "./img/map/map-marker.svg",
            iconImageSize: [46, 57],
            iconImageOffset: [-35, -52]
        });

        coords.forEach(coord => {
            myCollection.add(new ymaps.Placemark(coord));
        });

        myMap.geoObjects.add(myCollection);
        myMap.behaviors.disable("scrollZoom");
    }

ymaps.ready(init);

// -------------------------------------------------- One-page-scroll

const sections = $("section");
const display = $(".main_page")
const sideMenu = $(".navigation-dots");

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

let inScroll = false;

sections.first().addClass("current");

const countSectionPosition = sectionEq => {

    const position = sectionEq * -100;

    if (isNaN(position)) {
        console.error("Неверное значение в countSectionPosition.")
        return 0;
    }

    return position;
};

const changeMenuThemeForSection = (sectionEq) => {
    const currentSection = sections.eq(sectionEq);
    const menuTheme = currentSection.attr("data-sidemenu-theme");
    const activeClassShadow = "navigation-dots--shadowed";
    const activeClassClarified = "navigation-dots--clarified";

    if (menuTheme == "black") {
        sideMenu.removeClass(activeClassShadow);
        sideMenu.removeClass(activeClassClarified);
        sideMenu.addClass(activeClassShadow);
    }
    else {
        sideMenu.removeClass(activeClassShadow);
        sideMenu.removeClass(activeClassClarified);
        sideMenu.addClass(activeClassClarified);
    }
};

const performTransition = sectionEq => {
    if (inScroll) return;

    const transitionOver = 1000;
    const mouseIterationOver = 300;

    inScroll = true;

    const position = countSectionPosition(sectionEq);

    changeMenuThemeForSection(sectionEq);

    display.css({
        transform: `translateY(${position}%)`,
    });

    sections.eq(sectionEq).addClass("current").siblings().removeClass("current");

    setTimeout(() => {
        inScroll = false;
        sideMenu.find(".nav_dot-item").eq(sectionEq).addClass("nav_dot-item--active").siblings().removeClass("nav_dot-item--active");
    }, transitionOver + mouseIterationOver);
};

const ViewportScroller = () => {

    const currentSection = sections.filter(".current");
    const nextSection = currentSection.next();
    const prevSection = currentSection.prev();

    return {
        next() {
            if (nextSection.length) {
                performTransition(nextSection.index())
            }
        },

        prev() {
            if (prevSection.length) {
                performTransition(prevSection.index())
            }
        },
    };
};

$(window).on("wheel", e => {
    const deltaY = e.originalEvent.deltaY;
    const scroller = ViewportScroller();

    if (deltaY > 0) {
        scroller.next();
    }
    if (deltaY < 0) {
        scroller.prev();
    }
});

$(window).on("keydown", e => {

    const targetName = e.target.tagName.toLowerCase();
    const userTypingInInputs = targetName == "input" || targetName == "textarea";
    const scroller = ViewportScroller();

    if (userTypingInInputs) return; 

    switch (e.keyCode) {
        case 38:
            scroller.prev();
        break;

        case 40:
            scroller.next();
        break;
    }
});

$(".wrapper").on("touchmove", e => e.preventDefault());

$("[data-scroll-to]").click(e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr("data-scroll-to");
    const reqSection = $(`[data-section-id=${target}]`);

    console.log(reqSection.index());

    performTransition(reqSection.index());
});

// библиотека для работы листания секций свайпом на мобиле
// https://github.com/mattbryson/TouchSwipe-Jquery-Plugin

if (isMobile) {
    $("body").swipe({
        swipe: function (
            event, 
            direction
        ) {
            const scroller = ViewportScroller();
            let scrollDirection = "";
    
            if (direction = "up") scrollDirection = "next";
            if (direction = "down") scrollDirection = "prev";
    
          scroller[scrollDirection]();
        },
    });
    
    $("body").swipe( {
        swipeUp: function (
            event, 
            direction
        ) {
            const scroller = ViewportScroller();
            let scrollDirection = "";
    
            if (direction = "up") scrollDirection = "next";
    
          scroller[scrollDirection]();
        },
    });

    $("body").swipe( {
        swipeUp: function (
            event, 
            direction
        ) {
            const scroller = ViewportScroller();
            let scrollDirection = "";
    
            if (direction = "up") scrollDirection = "next";
    
          scroller[scrollDirection]();
        },

        swipeDown: function (
            event, 
            direction
        ) {
            const scroller = ViewportScroller();
            let scrollDirection = "";
    
            if (direction = "down") scrollDirection = "prev";
    
          scroller[scrollDirection]();
        }
    });
}

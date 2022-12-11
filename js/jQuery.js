// -------------------------------------------------- Слайдер

$(".settings_button").on("click", function() {
    if ($(".settings_featuresContainer").hasClass("active"))
    {
        $(".settings_featuresContainer").removeClass("active");
    }
    else
    {
        $(".settings_featuresContainer").addClass("active");
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

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
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

// -------------------------------------------------- Карта

let myMap; 

    const init = () => {
        myMap = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 7
        });
    }

ymaps.ready(init);
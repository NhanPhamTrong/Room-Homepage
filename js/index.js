const headingText = $("#heading-content p");
const headingTitle = $("#heading-content h1");
const heroImage = $("#hero-image img");
const menu = $("#menu");
const menuToggler = $(".menu-toggler");
const nextImageBtn = $(".next");
const previousImageBtn = $(".previous");

let headingTextList = [];
let headingTitleList = [];
let heroImageList = [];

function ChangeScreenWidth() {
    if ($(window).width() < 992) {
        menuToggler.removeClass("active");
        menu.hide();
    }
    else {
        menuToggler.addClass("active");
        menu.show();
    }
}

menu.hide();

ChangeScreenWidth();
$(window).resize(ChangeScreenWidth);

$("a").click(function(event) {
    event.preventDefault();
});

$(document).ready(function() {
    menuToggler.on('click', function() {
        if (menu.is(":hidden")) {
            menuToggler.addClass("active");
            menu.show();
        }
        else {
            menuToggler.removeClass("active");
            menu.hide();
        }
    });
    
    // Close modal on click outside at anywhere (outside of menu-inner)
    $(document).on('click',function(e) {
        if ((!(($(e.target).closest(".menu-inner").length > 0) || ($(e.target).closest(".menu-toggler").length > 0)))) {
            ChangeScreenWidth();
        }
    });
});

$(function() {
    $.getJSON("data.json", function(data) {
        $.each(data.heading, function(i, f) {
            headingTextList.push(f.text);
            headingTitleList.push(f.title);
            heroImageList.push(f.img);
        });
        
        let count = 0;

        function GetHeading() {
            headingText.text(headingTextList[count]);
            headingTitle.text(headingTitleList[count]);
            heroImage.attr("src", heroImageList[count]);
        }

        function PreviousImage() {
            if (count > 0) {
                count -= 1;
            }
            else {
                count = headingTextList.length - 1;
            }
            GetHeading();
        }

        function NextImage() {
            if (count < headingTextList.length - 1) {
                count += 1;
            }
            else {
                count = 0;
            }
            GetHeading();
        }

        GetHeading();
        nextImageBtn.click(NextImage);
        previousImageBtn.click(PreviousImage);
    });
});
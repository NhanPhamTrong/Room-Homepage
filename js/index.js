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

$("a").click(function(event) {
    event.preventDefault();
});

$(document).ready(function() {
    menuToggler.on('click', function() {
        if (menu.is(":hidden")) {
            menuToggler.addClass("active");
            menu.addClass("active");
        }
        else {
            menuToggler.removeClass("active");
            menu.removeClass("active");
        }
    });
    
    // Close modal on click outside at anywhere (outside of menu-inner)
    $(document).on('click',function(e) {
        if ((!(($(e.target).closest(".menu-inner").length > 0) || ($(e.target).closest(".menu-toggler").length > 0)))) {
            menuToggler.removeClass("active");
            menu.removeClass("active");
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
            heroImage.fadeOut(750);

            setTimeout(function() {
                headingText.text(headingTextList[count]);
                headingTitle.text(headingTitleList[count]);
                heroImage.attr("src", heroImageList[count]);
            }, 750);

            heroImage.fadeIn(750);
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

        headingText.text(headingTextList[count]);
        headingTitle.text(headingTitleList[count]);
        heroImage.attr("src", heroImageList[count]);

        nextImageBtn.click(function() {
            NextImage();
            nextImageBtn.attr("disabled", true);
            setTimeout(function() {
                nextImageBtn.attr("disabled", false);
            }, 1500);
        });

        previousImageBtn.click(function() {
            PreviousImage();
            previousImageBtn.attr("disabled", true);
            setTimeout(function() {
                previousImageBtn.attr("disabled", false);
            }, 1500);
        });
    });
});
let galleryImages = document.querySelectorAll(".gallery-img");
let getLatestOpenedImg;
let windowWidth = window.innerWidth;

if(galleryImages){
    galleryImages.forEach(function(image, index){ /*To track which image that we click on(img1,img2,img3,...)*/
        image.onclick = function(){
            let getElementCss = window.getComputedStyle(image); /*Gets all the properties and values of the specific element.*/

            let getFullImgUrl = getElementCss.getPropertyValue("background-image"); /*Get the value of background-image which is a long URL*/

            let getImgUrlPosition = getFullImgUrl.split("/thumbnail/"); /*'.split()' method will split the values of the property and store them into an array.*/
            let setNewImgUrlPosition = getImgUrlPosition[1].replace('")',''); /*To replace the redundant '")' symbols behind the url*/

            getLatestOpenedImg = index + 1; /*Indicates n-th imgaes we just opened*/


            /*To create new element which contains the expanded image*/
            let container = document.body;
            let newImgWindow = document.createElement("div");
            container.appendChild(newImgWindow); /*Appending the div element into the document(become part of the document)*/

            /*Set two attributes which are 'class' and 'onclick' event handler*/
            newImgWindow.setAttribute("class","img-window"); /*use to style the div tag.*/
            newImgWindow.setAttribute("onclick","closeImg()"); /*use to run the js function in order to close the image.*/


            /*Create childNodes 'img' for the 'newImgWindow' */
            let newImg = document.createElement("img");
            newImgWindow.appendChild(newImg);
            newImg.setAttribute("src", "img/"+setNewImgUrlPosition);
            newImg.setAttribute("id", "current-img");


            newImg.onload = function(){
                let imgWidth = this.width;
                let calcImgToEdge = ((windowWidth - imgWidth)/2)-80;

                let newNextBtn = document.createElement("a");
                let btnNextText = document.createTextNode("Next");
                newNextBtn.appendChild(btnNextText);
                container.appendChild(newNextBtn);
                newNextBtn.setAttribute("class","img-btn-next");
                newNextBtn.setAttribute("onclick","changeImg(1)"); /*Passing 1 as argument to the function to indicate 'next'*/
                newNextBtn.style.cssText = "right: "+calcImgToEdge+"px;";

                let newPrevBtn = document.createElement("a");
                let btnPrevText = document.createTextNode("Prev");
                newPrevBtn.appendChild(btnPrevText);
                container.appendChild(newPrevBtn);
                newPrevBtn.setAttribute("class","img-btn-prev");
                newPrevBtn.setAttribute("onclick","changeImg(0)");
                newPrevBtn.style.cssText = "left: "+calcImgToEdge+"px;";
            }

        }

    });

    /* Create a closeImg() function to close the pop-out images */
    function closeImg(){
        document.querySelector(".img-window").remove(); /* Remove all the nodes inside the 'img-window' elements(div, img) */
        document.querySelector(".img-btn-prev").remove(); /* Remove all the nodes inside the 'img-window' elements(div, img) */
        document.querySelector(".img-btn-next").remove(); /* Remove all the nodes inside the 'img-window' elements(div, img) */
    }

    function changeImg(changeDir){
        document.querySelector("#current-img").remove(); /*Delete the current pop-out image*/

        /*Adding new image into the window'<div>'*/
        let getImgWindow = document.querySelector(".img-window");
        let newImg = document.createElement("img");
        getImgWindow.appendChild(newImg);

        let calcNewImg;
        if(changeDir === 1){
            calcNewImg = getLatestOpenedImg + 1;

            if(calcNewImg > galleryImages.length){
                calcNewImg = 1;
            }
        }else if (changeDir === 0){
            calcNewImg = getLatestOpenedImg - 1;

            if(calcNewImg < 1){
                calcNewImg = galleryImages.length;
            }
        }

        newImg.setAttribute("src","img/img"+calcNewImg+".jpg");
        newImg.setAttribute("id","current-img"); 

        getLatestOpenedImg = calcNewImg; /*Updating the current pop-out image.(IMPORTANT)*/

        newImg.onload = function(){
            let imgWidth = this.width;
            let calcImgToEdge = ((windowWidth - imgWidth)/2) - 80;

            /* Adjust the position of the buttons */
            let nextBtn = document.querySelector(".img-btn-next");
            nextBtn.style.cssText = " right: "+calcImgToEdge+"px; ";

            let prevBtn = document.querySelector(".img-btn-prev");
            prevBtn.style.cssText = " left: "+calcImgToEdge+"px; ";

        }

    }

}


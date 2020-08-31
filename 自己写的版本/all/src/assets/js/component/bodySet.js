var bodySet = function(value){
    var body = document.getElementsByClassName('body')[0];
    var main = document.getElementsByClassName('trueBody')[0];

    body.style.background = value.bodyColor;

    main.style.background = value.mainColor;
    main.style.width = value.width;
    main.style.height = value.height;

    console.log(value);
}

export default bodySet;
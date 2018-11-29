$(document).ready(function () {
    var screen = $("#quizScreen");
    var titleLogo = $("<img>").attr("src", "./assets/images/trivia.png").css("margin", "100px 0 40px");
    var startBtn = $("<button type='button' class='btn btn-danger hvr-pulse-grow'>CLICK HERE TO START</button>");
    screen.append(titleLogo,startBtn);
    
});
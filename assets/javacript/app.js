$(document).ready(function () {
    var counter = $(".round");
    var timer = $(".item");
    var screen = $("#quizScreen");
    var titleLogo = $("<img>").attr("src", "./assets/images/trivia.png").css("margin", "100px 0 40px");
    var startBtn = $("<button type='button' id='start' class='btn btn-danger hvr-pulse-grow'>CLICK HERE TO START</button>");
    screen.html(titleLogo).append(startBtn);

    var initialOffset = 314;
    var interval, interval2;
    var clockRunning = false;
    var correct = 0;
    var wrong = 0;
    var q; // question
    var a; // answer
    var qlist = [];
    var qNum = 0;
    var qEnd = 10;
    var qa = [
        ["ONE JUMP AHEAD OF THE __________,<br>ONE SKIP AHEAD OF MY DOOM", "Law-men", "Slowpokes", "Bread line", "Flock", 2],
        ["I KNOW YOU, THE GLEAM IN YOUR EYES<br>IS SO FAMILIAR A __________", "Stream", "Beam", "Dream", "Gleam", 4],
        ["I WANNA KNOW, CAN YOU ________ ME,<br>I WANNA KNOW ABOUT THESE STRANGERS LIKE ME", "Tell", "Take", "Show", "Bring", 3],
        ["WHY IS MY REFLECTION SOMEONE<br>I _________ __________", "Can't hide", "Won't be", "Can't see", "Don't know", 4],
        ["JUST AROUND THE RIVERBEND, BEYOND THE SHORE,<br>WHERE THE _________ FLY FREE", "Gulls", "Birds", "Fish", "Waves", 1],
        ["BUT NOW HE'S _________, AND SO UNSURE,<br>I WONDER WHY I DIDN'T SEE IT THERE BEFORE", "Kind", "Nice", "Dear", "Here", 3],
        ["SHA LA LA LA LA LA, DON'T BE SCARED,<br>YOU GOT __________ _________ PREPARED", "The mood", "It all", "Her heart", "This thing", 1],
        ["NOW I'M THE KING OF THE _________<br>OH, THE JUNGLE VIP", "Forest", "Swingers", "Jungle", "Dancers", 2],
        ["LIKE A __________ IN THE SKY,<br>YOU CAN FLY! YOU CAN FLY! YOU CAN FLY!", "Rainbow", "Eagle", "Reindeer", "Fairy", 3],
        ["IT AIN'T NO TRICK TO GET RICH QUICK IF YOU<br>__________ __________ _________ WITH A SHOVEL OR A PICK", "Work work work", "Dig dig dig", "Good good good", "Quick quick quick", 2],
        ["SO SHE'S A BIT OF A FIXER-UPPER,<br>HER BRAIN'S A BIT __________", "Below", "Amidst", "Betwixt", "Between", 3],
        ["WINNIE THE POOH, WINNIE THE POOH,<br>CHUBBY LITTLE _________ ALL STUFFED WITH FLUFF", "Cubby", "Teddy", "Buddy", "Tubby", 1],
        ["HE SHOWED THE __________, BRAINS, AND SPUNK,<br>FROM ZERO TO HERO, A MAJOR HUNK", "Bravery", "Moxie", "Courage", "Gusto", 2],
        ["I'VE SEEN A FRONT PORCH SWING, HEARD A DIAMOND RING, I'VE SEEN A __________ __________ RAILROAD TIE", "Zig zag", "20 cent", "Bright blue", "Polka dot", 4],
        ["CAN YOU FEEL THE LOVE TONIGHT,<br>THE __________ THE EVENING BRINGS", "Peace", "Joy", "Rest", "Calm", 1]
    ];

    // Ramdomize questions' order
    for (var i = 0; i < qEnd; i++) {
        do {
            var num = Math.floor(Math.random() * 15);
        }
        while (qlist.includes(num));
        qlist.push(num);
    }

    // Game timer
    var stopwatch = {
        time: 0,
        endTime: 7,
        qi: 0,
        reset: function () {
            clearInterval(interval2);
            screen.empty();
            q = qlist[qNum];
            a = qa[q][5];
            $('#timeNum').text(stopwatch.endTime);
            var picture = $("<img>").attr({ "src": "./assets/images/" + q + ".jpeg" });
            var question = $("<h5>").addClass("quiz bg-danger text-white ml-2 mr-2 p-3").html("♫ " + qa[q][0] + " ♫");
            screen.append(picture, question);
            for (var i = 1; i <= 4; i++) {
                var answer = $("<button>").attr("id", "answer" + i).addClass("btn btn-outline-dark m-2 p-0 choices").css({ width: 132, height: 132 }).text(qa[q][i]).val(i);
                screen.append(answer);
            };
        },
        start: function () {
            stopwatch.reset();
            $('.circle_animation2').css('stroke-dashoffset', initialOffset - ((qNum + 1) * (initialOffset / qEnd)));
            $('#roundNum').text(qNum + 1);
            stopwatch.qi = 0;
            stopwatch.time = 1;
            if (!clockRunning) {
                interval = setInterval(stopwatch.count, 1000);
                clockRunning = true;
            }
        },
        count: function () {
            $('#timeNum').text(stopwatch.endTime - stopwatch.qi);
            if (stopwatch.qi === stopwatch.endTime) {
                stopwatch.stop(-1);
                return;
            };
            $('.circle_animation').css('stroke-dashoffset', initialOffset - ((stopwatch.qi + 1) * (initialOffset / stopwatch.endTime)));
            stopwatch.qi++;
        },
        stop: function (answer) {
            $('.circle_animation').css('stroke-dashoffset', initialOffset);
            clearInterval(interval);
            clockRunning = false;
            if (answer === 1) {
                // Correct answer
                correct++;
                $("#answer" + a).css({ "background-color": "#60bb60", color: "white" });
            } else {
                wrong++;
                if (answer === 0) {
                    // Wrong answer
                    $("#answer" + a).css({ "background-color": "#d93749", color: "white" });
                } else {
                    // Time's up
                    wrong++;
                    $("#answer" + a).css({ "background-color": "#d93749", color: "white" });
                };
            };
            if (++qNum < qEnd) {
                interval2 = setInterval(stopwatch.start, 2500);
            }
        }
    };

    // if the start game button is clicked..
    startBtn.on("click", function () {
        counter.css("display", "block");
        timer.css("display", "block");
        $('.circle_animation').css('stroke-dashoffset', initialOffset);
        stopwatch.start();
    });

    // if the answer button is clicked..
    $(document).on("click", ".choices", function () {
        if (clockRunning) {
            var choice = Number($(this).val());
            if (a === choice) {
                stopwatch.stop(1);
            } else {
                stopwatch.stop(0);;
            };
        };
    });
});
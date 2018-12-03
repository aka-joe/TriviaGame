$(document).ready(function () {
    // Create DIV, IMG, BUTTONs for display
    var counter = $(".round");
    var timer = $(".item");
    var screen = $("#quizScreen");
    var titleLogo = $("<img>").attr({ "src": "./assets/images/trivia.png", "id": "logo" }).css("margin", "90px 0 40px");
    var startBtn = $("<button type='button' id='start' class='btn btn-danger hvr-pulse-grow'>CLICK HERE TO START</button>");
    var result = $("<div id='result'>");
    var score = $("<div id='score'>");
    screen.html(titleLogo).append(startBtn);

    // Initialize sounds
    var correctSFX = document.createElement('audio');
    var wrongSFX = document.createElement('audio');
    var tickSFX = document.createElement('audio');
    var endSFX = document.createElement('audio');
    var music = document.createElement('audio');
    correctSFX.setAttribute('src', './assets/sounds/correct.mp3');
    wrongSFX.setAttribute('src', './assets/sounds/wrong.mp3');
    tickSFX.setAttribute('src', './assets/sounds/ticking.mp3');
    endSFX.setAttribute('src', './assets/sounds/end.mp3');

    // Initialize variables
    var initialOffset = 314;
    var clockRunning = false;
    var interval, interval2, correct, wrong, timeout, q, a, qlist, qNum;
    var qEnd = 10; // # of Questions

    // Questions array
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

    function resetGame() {
        // Reset variables;
        correct = 0;
        wrong = 0;
        timeout = 0;
        qNum = 0;
        qlist = [];

        // Ramdomize questions' order
        for (var i = 0; i < qEnd; i++) {
            do {
                var num = Math.floor(Math.random() * qa.length);
            }
            while (qlist.includes(num));
            qlist.push(num);
        }
    };
    resetGame();

    // Game timer
    var stopwatch = {
        time: 0,
        endTime: 10,
        qi: 0,
        // Reset game timer and screen
        reset: function () {
            clearInterval(interval2);
            tickSFX.currentTime = 0;
            tickSFX.play();
            endSFX.pause();
            screen.empty();
            q = qlist[qNum];
            a = qa[q][5];
            $('#timeNum').text(stopwatch.endTime);
            var picture = $("<img>").attr({ "src": "./assets/images/" + q + ".jpeg", "id": "quizPic" });
            var question = $("<h5>").addClass("quiz bg-danger text-white ml-2 mr-2 p-3").html("♫ " + qa[q][0] + " ♫");
            screen.append(picture, question);
            for (var i = 1; i <= 4; i++) {
                var answer = $("<button>").attr("id", "answer" + i).addClass("btn btn-outline-dark m-2 p-0 choices").css({ width: 132, height: 132 }).text(qa[q][i]).val(i);
                screen.append(answer);
            };
        },
        // Start game timer
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
        // Countdown game timer
        count: function () {
            $('#timeNum').text(stopwatch.endTime - stopwatch.qi);
            if (stopwatch.qi === stopwatch.endTime) {
                stopwatch.stop(-1);
                return;
            };
            $('.circle_animation').css('stroke-dashoffset', initialOffset - ((stopwatch.qi + 1) * (initialOffset / stopwatch.endTime)));
            stopwatch.qi++;
        },
        // Stop game timer and report
        stop: function (answer) {
            tickSFX.pause();
            $('.circle_animation').css('stroke-dashoffset', initialOffset);
            $("#quizPic").css("opacity", 0.2);
            clearInterval(interval);
            clockRunning = false;
            if (answer === 1) {
                // Correct answer
                correct++;
                correctSFX.play();
                result.text("Correct!").css("color", "#209020");
                $("#answer" + a).css({ "background-color": "#60bb60", color: "white" });
            } else if (answer === 0) {
                // Wrong answer
                wrong++;
                wrongSFX.play();
                result.text("Incorrect!").css("color", "#804040");
                $("#answer" + a).css({ "background-color": "#d93749", color: "white" });
            } else {
                // Time's up
                timeout++;
                wrongSFX.play();
                result.text("Time's up!").css("color", "#804040");
                $("#answer" + a).css({ "background-color": "#d93749", color: "white" });
            };
            music.setAttribute('src', './assets/sounds/' + qlist[qNum] + '.mp3');
            music.play();
            screen.append(result);
            if (++qNum < qEnd) {
                // Next question
                interval2 = setInterval(stopwatch.start, 5500);
            } else {
                // End game
                endSFX.currentTime = 0;
                endSFX.play();
                interval2 = setInterval(stopwatch.end, 5500);
            }
        },
        // End game
        end: function () {
            var endMsg = $("<h1>ALL DONE!</h1><h2>HERE'S HOW YOU DID IT!</h2>");
            var cScore = $("<h3>").text("Correct answer : " + correct);
            var iScore = $("<h3>").text("Incorrect answer : " + wrong);
            var uScore = $("<h3>").text("Unanswered : " + timeout);
            // Clear screen & reset the game
            counter.fadeOut();
            timer.fadeOut();
            screen.empty();
            screen.append(endMsg, cScore, iScore, uScore, startBtn);
        }
    };

    // if the start game button is clicked..
    $(document).on("click", "#start", function () {
        $('.circle_animation').css('stroke-dashoffset', initialOffset);
        resetGame();
        counter.fadeIn(1000);
        timer.fadeIn(1000);
        stopwatch.start();
    });

    // if the answer button is clicked..
    $(document).on("click", ".choices", function () {
        if (clockRunning) {
            var choice = Number($(this).val());
            if (a === choice) {
                stopwatch.stop(1); // The answer is correct
            } else {
                stopwatch.stop(0);; // The answer is incorrect
            };
        };
    });
});

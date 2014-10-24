var stage;
var queue;
var game;
var outcome;

var blastoise_img, rattata_img, mewtwo_img, mew_img, charizard_img, pidgey_img;
var reels = [];
    
function showStats()
{
    $("#jackpot").html(game.jackpot);
    $("#player_money").html(game.player_money);
    $("#turn").html(game.turn);
    $("#wins").html(game.wins);
    $("#losses").html(game.turn - game.wins);
    if(game.turn > 0)
        $("#win_ratio").html("" + ((game.wins / game.turn) * 100) + "%" );
    else
        $("#win_ratio").html("0%" );
}

function spin()
{
    game.bet = $("#place_bet").val();

    if(game.bet > game.player_money)        
        alert("You too broke for this game son!");                                
    else if(!(game.bet > 0))        
        alert("You need to specify a valid bet amount");        
    else
    {
        outcome.reset();
        game.winnings = 0;
        game.player_money -= game.bet;
        game.turn++;

        var spins = [];
        var result = [];

        for(var i = 0; i < 5; i++)
        {
            spins[i] = Math.floor((Math.random() * 100) + 1);

            switch(spins[i])
            {
                case checkRange(spins[i], 1, 40):
                    result[i] = "Rattata";
                    outcome.rattata++;
                    break;

                case checkRange(spins[i], 41, 60):
                    result[i] = "Pidgey";
                    outcome.pidgey++;
                    break;

                case checkRange(spins[i], 61, 75):
                    result[i] = "Golem";
                    outcome.golem++;
                    break;

                case checkRange(spins[i], 76, 85):
                    result[i] = "Charizard";
                    outcome.charizard++;
                    break;

                case checkRange(spins[i], 86, 93):
                    result[i] = "Blastoise";
                    outcome.blastoise++;
                    break;

                case checkRange(spins[i], 94, 97):
                    result[i] = "Mewtwo";
                    outcome.mewtwo++;
                    break;

                case checkRange(spins[i], 98, 100):
                    result[i] = "Mew";
                    outcome.mew++;
                    break;
            }
        }

        checkWinnings();
        showResults(result);
        showStats();
    }
}

function checkWinnings()
{
    if(outcome.rattata === 0)
    {
        game.wins++;

        if(outcome.pidgey === 3)
            game.winnings += game.bet * 10;

        if(outcome.blastoise === 3 || outcome.charizard === 3)
            game.winnings += game.bet * 20;

        if(outcome.mew === 3 || outcome.mewtwo === 3)
            game.winnings += game.bet * 30;

        if(outcome.mew === 4 || outcome.mewtwo === 4)
            game.winnings += game.bet * 40;

        if(outcome.mew === 5)
            game.winnings += game.bet * 100;

        game.player_money += game.winnings;
        checkJackpot();
    }
}

function checkJackpot()
{
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry === jackPotWin) {
        alert("You Won the $" + game.jackpot + " Jackpot!!");
        game.player_money += game.jackpot;
        game.jackpot = 1000;
    }
}

function showResults(result)
{
    var result_str = "";

    for(var i = 0; i < result.length; i++)
    {
        result_str += result[i];
        if(i+1 < result.length)
            result_str += " - ";
    }        
    $("#result").html(result_str);
}

function reset()
{    
    stage.removeChild(blastoise_img);    
    outcome.reset();
    game.reset();
    $("#result").empty();
    showStats();
}

function quit()
{
   window.close();
}

function checkRange(roll, min, max)
{        
    return (roll >= min && roll <= max) ? roll : !roll;
}



function preload() {
    queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);
    queue.addEventListener("complete", init);
    queue.loadManifest([        
        { id: "slot_machine", src: "images/slots.png"},
        { id: "blastoise", src: "images/blastoise.png"},
        { id: "blastoise", src: "images/blastoise.png"},
        { id: "blastoise", src: "images/blastoise.png"},
        { id: "blastoise", src: "images/blastoise.png"},
        { id: "blastoise", src: "images/blastoise.png"},
        { id: "blastoise", src: "images/blastoise.png"},
        { id: "yay", src: "sounds/yay.ogg" }
    ]);
}

function init() {
    stage = new createjs.Stage(document.getElementById("canvas"));
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", handleTick);
    setup();
    gameStart();
}

function handleTick(event) {
    stage.update();
}

function setup()
{
    game = {
        jackpot: 500,
        player_money: 1000,
        winnings: 0,
        bet: 0,
        turn: 0,
        wins: 0,
        reset: function()
        {
            this.jackpot = 500;
            this.player_money = 1000;
            this.winnings = 0;
            this.bet = 0;
            this.turn = 0;
            this.wins = 0;
        }
    };
    
    outcome = {
            rattata: 0,
            pidgey: 0,
            golem: 0,
            charizard: 0,
            blastoise: 0,
            mewtwo: 0,
            mew: 0,
            reset: function(){
                this.rattata = 0;
                this.pidgey = 0;
                this.golem = 0;
                this.charizard = 0;
                this.blastoise = 0;
                this.mew = 0;
                this.mewtwo = 0;
            }
        };    
        
    $("#spin_button").click(function(){ spin();});
    $("#reset_button").click(function(){reset();});
    $("#quit_button").click(function(){quit();});
    
    blastoise_img = new createjs.Bitmap(queue.getResult('blastoise'));
    blastoise_img.regX = blastoise_img.image.width / 2;
    blastoise_img.regY = blastoise_img.image.height / 2;
    blastoise_img.x = stage.canvas.width / 2;
    blastoise_img.y = stage.canvas.height / 2;                
    stage.addChild(blastoise_img);    

    showStats();        
}

function gameStart() {
    // Add code here
    // Some example code here - to be replaced
    var slot_machine_background = new createjs.Bitmap(queue.getResult('slot_machine'));
    slot_machine_background.regX = slot_machine_background.image.width / 2;
    slot_machine_background.regY = slot_machine_background.image.height / 2;
    slot_machine_background.x = stage.canvas.width / 2;
    slot_machine_background.y = stage.canvas.height / 2;                
    stage.addChild(slot_machine_background);
    createjs.Sound.play("yay");
}
//# sourceMappingURL=game.js.map

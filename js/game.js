var stage;
var queue;
var game;
var outcome;

var reels = [
    ['blastoise', 'mew', 'pidgey', 'rattata', 'charizard', 'mewtwo'],
    ['mew', 'rattata', 'blastoise', 'mewtwo', 'pidgey', 'charizard'],
    ['charizard', 'mewtwo', 'mew', 'blastoise', 'rattata', 'pidgey'],
    ['rattata', 'charizard', 'blastoise', 'mew', 'pidgey', 'mewtwo'],
    ['mewtwo', 'blastoise', 'mew', 'pidgey', 'charizard', 'rattata']
];

var reel_images = [];
    
 var y_offset = 110;  
 var reel_start_y = 100;
 
 var x_offset = 115;
 var reel_start_x = 170;
    
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
        clearReel();
        outcome.reset();
        game.winnings = 0;
        game.player_money -= game.bet;
        game.turn++;

        var spins = [];
        var result = [];

        for(var i = 0; i < 5; i++)
        {
            spins[i] = Math.floor((Math.random() * 6));                        
            result[i] = reels[i][spins[i]];   
            
            if(result[i] === "blastoise")
            {
                outcome.blastoise++;
            }
            else if(result [i] === "charizard")
            {
                outcome.charizard++;
            }
            else if(result [i] === "mewtwo")
            {
                outcome.mewtwo++;
            }
            else if(result [i] === "mew")
            {
                outcome.mew++;
            }
            else if(result[i] === "pidgey")
            {
               outcome.pidgey++; 
            }
            else
            {
                outcome.rattata++;
            }
        }

        checkWinnings();
        showResults(spins);
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

function showResults(spins)
{
    var index = 0;
    for(var i = 0; i < reels.length; i++)
    {                
        for(var x = spins[i]-1, count = 0; count < 3; x++, count++)
        {            
            if(x < 0)
                x = reels[i].length-1;
            else if(x > reels[i].length-1)
                x = 0;
            
            reel_images[index] = new createjs.Bitmap(queue.getResult(reels[i][x]));
            reel_images[index].regX = reel_images[index].image.width / 2;
            reel_images[index].regY = reel_images[index].image.height / 2;
            reel_images[index].x = reel_start_x + (i * x_offset);
            reel_images[index].y = reel_start_y + (count * y_offset);                
            stage.addChild(reel_images[index]);                          
            index++;
        }
    }   
}

function reset()
{          
    outcome.reset();
    game.reset();
    $("#result").empty();
    showStats();
}

function clearReel()
{
    for(var i = 0; i < reel_images.length; i++)
        stage.removeChild(reel_images[i]);
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
        { id: "charizard", src: "images/charizard.png"},
        { id: "pidgey", src: "images/pidgey.png"},
        { id: "mewtwo", src: "images/mewtwo.png"},
        { id: "mew", src: "images/mew.png"},
        { id: "rattata", src: "images/rattata.png"},
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

$(document).ready(function(){
    
    var game = {
        jackpot: 500,
        player_money: 1000,
        winnings: 0,
        bet: 0,
        turn: 0,
        wins: 0        
    };
    
    var outcome = {
        rattata: 0,
        pidgey: 0,
        golem: 0,
        charizard: 0,
        blastoise: 0,
        mewtwo: 0,
        mew: 0
    };
    
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
        
        console.log(game.winnings);
        console.log(outcome);
        game.player_money += game.winnings;
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
        console.log(result_str);
        $("#result").html(result_str);
    }
    
    function checkRange(roll, min, max)
    {        
        return (roll >= min && roll <= max) ? roll : !roll;
    }
    
    $("#spin_button").click(function(){ spin();});
    
    
    showStats();
});


/*
 * 1 - 40 = Rattata
 * 41 - 60 = Pidgey
 * 61 - 75 = Golem
 * 76 - 85 = Charizard
 * 86 - 93 = Blastoise
 * 94 - 97 = Mewtwo
 * 98-100 = Mew
 */
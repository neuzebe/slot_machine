$(document).ready(function(){
    
    var game = {
        jackpot: 500,
        player_money: 1000,
        turn: 0,
        wins: 0        
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
        var spins = [];
        var result = [];
        
        for(var i = 0; i < 5; i++)
        {
            spins[i] = Math.floor((Math.random() * 100) + 1);
            
            switch(spins[i])
            {
                case checkRange(spins[i], 1, 40):
                    result[i] = "Rattata";
                    break;
                
                case checkRange(spins[i], 41, 60):
                    result[i] = "Pidgey";
                    break;
                
                case checkRange(spins[i], 61, 75):
                    result[i] = "Golem";
                    break;
                    
                case checkRange(spins[i], 76, 85):
                    result[i] = "Charizard";
                    break;
                
                case checkRange(spins[i], 86, 93):
                    result[i] = "Blastoise";
                    break;
                    
                case checkRange(spins[i], 94, 97):
                    result[i] = "Mewtwo";
                    break;
                
                case checkRange(spins[i], 98, 100):
                    result[i] = "Mew";
                    break;
            }
        }
        
        console.log(result);
    }
    
    function checkRange(roll, min, max)
    {
        //console.log(roll, min, max);
        return (roll >= min && roll <= max) ? roll : !roll;
    }
    
    spin();
    showStats();
});


/*
 * 1 - 40 = Rattata
 * 41 - 60 = Pidgey
 * 61 - 75 = Blastoise
 * 76 - 85 = Golem
 * 86 - 93 = Charizard
 * 94 - 97 = Mewtwo
 * 98-100 = Mew
 */
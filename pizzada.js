var time = 0, point = 0, score = 0, miss =  0;
var targets = [];
var ranking = new Array();

class Pizzada{
    constructor(string){
        this.target = string;
        this.count = 0;
    }
    static section( str ){
        $("section").hide();
        $("#"+str).show();
        score = 0;
    }
    static pizza(){
        //END
        if( point == 0 ){
            $("#pizzada-times").html("<div>0</div>");
            time = 0;
        }
        else if( point == 3 ){
            ranking.push(Math.floor(time));
            Pizzada.section("pizzada-result");
            $("#pizzada-time").text(Math.floor(time));
            $("#pizzada-miss").html(`タイプミス:${miss}回`);
            $("#pizzada-times").text("");
            //Sort Ranking
            ranking.sort((a,b)=>{return b-a});
            localStorage.setItem("pizzada-ranking", ranking);
            //Display Ranking
            $("#pizzada-ranklist").empty();
            for( let i of ranking ) $("#pizzada-ranklist").append("<div class='kit-box'>" +i+ "</div>")
            point = 0;
            miss = 0;
            return time;
        }
        var p;
        Pizzada.section("pizzada-game");
        //START
        let start = Date.now();
        let ran = Math.floor(Math.random() * Math.floor(targets.length));
        p = new Pizzada( targets[ran] );
        $("#pizzada-target").text( p.target );
        $("#pizzada-enter").text("");
        $("#pizzada-wrong").empty();
        //BIND
        $(document).on("keydown", (event) => {
            event.preventDefault();
            if( p.target[p.count] == event.key ){
                p.count++;
                $("#pizzada-enter").text( p.target.substr(0, p.count) );
            }
            else {
                if( event.key != 'Shift' ){
                    $("#pizzada-wrong").append(`<span>${p.target.substr(0, p.count)}<i>${event.key}</i></span>`);
                    miss ++;
                }
            }
            if( p.count == p.target.length ){
                time += p.target.length / Number( Date.now() - start ) * 100000;
                $("#pizzada-times").html("<div>"+Math.floor(time)+"</div>");
                score += time;
                point++;
                $(document).off();
                Pizzada.pizza();
            }
        });
    }
    static end(){
        $("section").hide();
        $("#pizzada-title").show();
        time = 0;
        point = 0;
        score = 0;
        miss = 0;
    }
}
$(function(){
    $.getJSON("targets.json", (data)=>{ targets = data; });
    if( localStorage.getItem("pizzada-ranking") ) ranking = localStorage.getItem("pizzada-ranking").split(",");
    for( let i of ranking ) $("#pizzada-ranklist").append("<div class='kit-box'>" +i+ "</div>")
    Pizzada.section("pizzada-title");
});
var time = 0, point = 0, score = 0, miss =  0;
var targets = [];

class Pizzada{
    constructor(string){
        this.target = string;
        this.count = 0;
    }
    static section( str ){
        $("section").hide();
        $("#"+str).show();
    }
    static pizza(){
        //END
        if( point == 0 ) time = 0;
        else if( point == 3 ){
            Pizzada.section("pizzada-result");
            $("#pizzada-time").text(Math.floor(time));
            $("#pizzada-times").text("");
            point = 0;
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
        //BIND
        $(document).on("keydown", (event) => {
            if( p.target[p.count] == event.key ){
                $("#pizzada-enter").append( event.key );
                p.count++;
            }
            if( p.count == p.target.length ){
                time += p.target.length / Number( Date.now() - start ) * 100000;
                $("#pizzada-times").html("<div>"+Math.floor(time)+"</div>");
                score += time;
                point++;
                $(document).off();
                Pizzada.pizza();
            }
        })
    }
}
$(function(){
    $.getJSON("targets.json", (data)=>{ targets = data; });
    Pizzada.section("pizzada-title");
});
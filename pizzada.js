var time = 0, point = 0;
var targets = ["pizza", "class", "constructor", "document", "location", "var", "const", "getElementById", "function()"];

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
        if( point == 3 ){
            Pizzada.section("pizzada-result");
            $("#pizzada-time").text(time);
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
                time += Number( Date.now() - start );
                $("#pizzada-times").html("<div>"+time+"</div>");
                point++;
                $(document).off();
                Pizzada.pizza();
            }
        })
    }
}
$(function(){
    Pizzada.section("pizzada-title");
});
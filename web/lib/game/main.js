ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	
	'game.entities.player',
	'game.entities.spike',
        
	'game.levels.test'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	gravity: 300, // All entities are affected by this
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	
	init: function() {
		// Bind keys
//                $(function() { $.fancybox('<div>instrucciones</div>', {padding: 20}); });
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
                ig.input.bind( ig.KEY.UP_ARROW, 'up' );
		ig.input.bind( ig.KEY.X, 'jump' );
		ig.input.bind( ig.KEY.C, 'shoot' );
		ig.input.bind( ig.KEY.L, 'latir' );
		// Load the LevelTest as required above ('game.level.test')
                ig.music.add( 'media/corazon_german_mezcla.ogg' ),
                ig.music.volume = 0.8;
                ig.music.loop = true;
                //ig.music.play();
		this.loadLevel( LevelTest );
                
	},
	
	update: function() {		
		// Update all entities and BackgroundMaps
		this.parent();
		
		// screen follows the player
		var player = this.getEntitiesByType( EntityPlayer )[0];
		if( player ) {
			this.screen.x = player.pos.x - ig.system.width/2;
			this.screen.y = player.pos.y - ig.system.height/2;
                        console.log("El player tiene:"+parseInt(player.pos.x/100));
                        if(parseInt(player.pos.x/100)=="38"){
                	//ACA SALE GANASTE!!! en 3848
                           player.kill();
                       $(function() { 
                           
                           $.fancybox("<div style='width:400px;height:200px;'><h2>Ganaste</h2><p>Salvaste a tu amigo! ahora cuentale de tu valiente lucha!</p><a style='float:right;' class='boton' onclick='publicar_fb();return false;' href=''>Publicar ahora</a></div>", {padding: 20}); });
                        
                    }
                        
		}
                
                
                
                
                
	},
	
	draw: function() {
		// Draw all entities and BackgroundMaps
		this.parent();
		
		this.font.draw( 'Arrow Keys, X, C', 2, 2 );
	}
});


// Start the Game with 60fps, a resolution of 240x160, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 480, 320, 1  );

});

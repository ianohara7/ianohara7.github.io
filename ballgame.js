 
   var config = {
        type: Phaser.AUTO,
        width:800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 200 }
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    var game = new Phaser.Game(config);
    var player;
    var platforms;
    var KeyA;
    var KeyD;

    function preload ()
    {
        this.load.image('player', 'assets/sprites/player.png')
        this.load.image('sky', 'https://labs.phaser.io/assets/skies/space3.png');
        this.load.image('ground', 'https://labs.phaser.io/assets/sprites/platform.png');
        this.load.image('red', 'https://labs.phaser.io/assets/particles/blue.png');

    }

    function create ()
    {
       

        KeyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        KeyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);


        this.add.image(400, 300, 'sky');
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        var particles = this.add.particles('red');
        var emitter = particles.createEmitter({
            speed: 25,
            scale: { start: 0.3, end: 0 },
            blendMode: 'ADD'
        });

        player = this.physics.add.image(400, 200, 'player');
        this.physics.add.collider(player, platforms);


        player.setVelocity(100, 200);
        player.setBounce(1, 1);
        player.setCollideWorldBounds(true);

        emitter.startFollow(player);


    }
    function update (){
      //this.cursors.up.isDown || game.input.keyboard.isUp(Phaser.Keyboard.A)
      if (KeyA.isDown) {
       player.body.velocity.x = -300;
      }
      else if (KeyD.isDown){
      player.body.velocity.x = 300;
      }
    }
    
 
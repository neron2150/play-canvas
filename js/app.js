this.view = new View();
this.control = new Control();
this.game = new Game();
loop(this.view.render.bind(view), 10);
loop(this.game.gameStep.bind(game), 5);
   // initGame();
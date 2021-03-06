"use strict";

let _gfx;
let _game;
let _editor;
let _zoom = 1.0;// should be multiples of 0.2
let _padX = 0; // pixels
let _padY = 0; // pixels
let _canvasWidth = 1200;
let _canvasHeight = 900;

let _wallFrontCtx;
let _wallBackCtx;
let _transitionCtx;

function startEditor(obj)
{
	obj.parentNode.removeChild(obj);
	
	if (_editor)
	{
		return;
	}
	
	_editor = new Editor();
	_editor.init();
}

function init()
{
	inputInit();
	
	_gfx = new Gfx();
	
	_game = new Game();
	_game.init();
	_game.transitionTicksLeft = 30;
	// _game.loadLevel(_levels[0]);
}

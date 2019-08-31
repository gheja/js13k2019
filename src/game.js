"use strict";

// TODO: optimization for size: use globals instead of properties of
// Game - only one instance will be used anyways

class Game
{
	constructor()
	{
		this.level = null;
		this.objects = [];
		this.activeRoomIndex = -1;
		this.highlightedRoomIndex = 0;
		this.roomCount = 2;
		this.mode = GAME_MODE_ROOM_SELECT;
		this.ticks = 0;
	}
	
	loadLevel(data)
	{
		let x, y, a, room;
		
		this.level = data;
		this.objects = [];
		
		for (y=0; y<this.level.height; y++)
		{
			for (x=0; x<this.level.width; x++)
			{
				if (this.level.walls[y * this.level.width + x] == 1)
				{
					this.objects.push(new GameObjectWall(x, y));
				}
			}
		}
		
		for (a of this.level.objects)
		{
			// look up room by coordinates
			room = this.level.roomMap[ a[2] * this.level.width + a[1] ];
			
			if (a[0] == OBJ_STARTPOINT)
			{
				this.objects.push(new GameObjectPlayer(a[1], a[2], room));
			}
		}
		
		
		for (a of this.objects)
		{
			a.reset();
		}
	}
	
	handleRoomSelectInput()
	{
		if ((_inputControls[CONTROL_UP][INPUT_KEY_STATE] && _inputControls[CONTROL_UP][INPUT_KEY_CHANGED]) || (_inputControls[CONTROL_LEFT][INPUT_KEY_STATE] && _inputControls[CONTROL_LEFT][INPUT_KEY_CHANGED]))
		{
			this.highlightedRoomIndex = (this.highlightedRoomIndex + this.roomCount - 1) % this.roomCount;
		}
		
		if ((_inputControls[CONTROL_DOWN][INPUT_KEY_STATE] && _inputControls[CONTROL_DOWN][INPUT_KEY_CHANGED]) || (_inputControls[CONTROL_RIGHT][INPUT_KEY_STATE] && _inputControls[CONTROL_RIGHT][INPUT_KEY_CHANGED]))
		{
			this.highlightedRoomIndex = (this.highlightedRoomIndex + 1) % this.roomCount;
		}
		
		if ((_inputControls[CONTROL_ACTION_1][INPUT_KEY_STATE] && _inputControls[CONTROL_ACTION_1][INPUT_KEY_CHANGED]))
		{
			this.mode = GAME_MODE_ROOM_WAITING;
			this.activeRoomIndex = this.highlightedRoomIndex;
		}
	}
	
	drawRoomHighlights()
	{
		let x, y, a, room;
		
		for (y=0; y<this.level.height; y++)
		{
			for (x=0; x<this.level.width; x++)
			{
				if (this.level.roomMap[y * this.level.width + x] == this.activeRoomIndex)
				{
					_gfx.drawDebugRectangle(x * GAME_OBJECT_COORDINATE_SCALE, y * GAME_OBJECT_COORDINATE_SCALE, 1 * GAME_OBJECT_COORDINATE_SCALE, 1 * GAME_OBJECT_COORDINATE_SCALE, "rgba(255,255,0,0.2)");
				}
				else if (this.level.roomMap[y * this.level.width + x] == this.highlightedRoomIndex)
				{
					_gfx.drawDebugRectangle(x * GAME_OBJECT_COORDINATE_SCALE, y * GAME_OBJECT_COORDINATE_SCALE, 1 * GAME_OBJECT_COORDINATE_SCALE, 1 * GAME_OBJECT_COORDINATE_SCALE, "rgba(255,255,255,0.1)");
				}
			}
		}
	}
	
	resetRoom(index)
	{
		let a;
		
		if (this.activeRoomIndex == index)
		{
			if (this.mode == GAME_MODE_ROOM_WAITING)
			{
				this.mode = GAME_MODE_ROOM_PLAYING;
			}
			else if (this.mode == GAME_MODE_ROOM_PLAYING)
			{
				this.activeRoomIndex = -1;
				this.mode = GAME_MODE_ROOM_SELECT;
			}
		}
		
		for (a of this.objects)
		{
			if (a.room == index)
			{
				a.reset();
				
				if (this.activeRoomIndex == index)
				{
					if (a instanceof GameObjectPlayer)
					{
						a.recording = true;
					}
				}
			}
		}
	}
	
	tick()
	{
		let a;
		
		this.ticks++;
		
		for (a of this.objects)
		{
			a.tick();
		}
		
		if (this.mode == GAME_MODE_ROOM_SELECT)
		{
			this.handleRoomSelectInput();
		}
		
		inputAcknowledge();
		
		for (a in this.level.times)
		{
			if (this.ticks % this.level.times[a][0] == this.level.times[a][1])
			{
				this.resetRoom(a);
			}
		}
	}
	
	renderFrame()
	{
		let a;
		
		if (DEBUG)
		{
			_gfx.clear();
		}
		
		for (a of this.objects)
		{
			a.draw();
		}
		
		this.drawRoomHighlights();
	}
	
	frame()
	{
		this.tick();
		this.renderFrame();
		
		_raf(this.frame.bind(this));
	}
	
	init()
	{
		_raf(this.frame.bind(this));
	}
}

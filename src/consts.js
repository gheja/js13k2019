"use strict";

const DEBUG = 1;

const OBJ_STARTPOINT = 0;
const OBJ_DOOR = 1;
const OBJ_SWITCH = 2;
const OBJ_GOAL = 3;
// const OBJ_WALL = n + 1;

const GAME_OBJECT_COORDINATE_SCALE = 50;

const DIRECTION_UP = 0;
const DIRECTION_RIGHT = 1;
const DIRECTION_DOWN = 2;
const DIRECTION_LEFT = 3;

const CONTROL_UP = 0;
const CONTROL_RIGHT = 1;
const CONTROL_DOWN = 2;
const CONTROL_LEFT = 3;
const CONTROL_ACTION_1 = 4;
const CONTROL_ACTION_2 = 5;

const INPUT_KEY_STATE = 0;
const INPUT_KEY_CHANGED = 1;
const INPUT_KEY_EVENTS = 2;

const GAME_MODE_ROOM_SELECT = 0;
const GAME_MODE_ROOM_WAITING = 1;
const GAME_MODE_ROOM_PLAYING = 2;

// TODO: clean this up
const SHAPE_STAR = 0;
// 1: body front
// 2: body front v2
// 3: eye
// 4: eye
// 5: eye anim 1
// 6: eye anim 2
// 7: mouth
// 8: leg front
// 9: leg anim 1
// 10: leg anim 2
// 11: leg anim 3
// 12: body left

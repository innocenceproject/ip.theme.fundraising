/*
   Milonic Flash Activation Script - insert_active_flash.js version 1.0 - May 4 2006

   Copyright 2005 (c) Milonic Solutions Limited. All Rights Reserved.
   This is a commercial software product, please visit http://www.milonic.com/ for more information.
*/

function commitFlashObject(_obj, _container){
	_output=""
	_paramoutput=""
	_src=""
	_ver=""
	for(_cO in _obj){
		_output+=_cO+"=\""+_obj[_cO]+"\" "
		_paramoutput+="<param name="+_cO+" value=\""+_obj[_cO]+"\">";
		if(_cO=="movie")_src="src=\""+_obj[_cO]+"\"";
		if(_cO=="version")_ver=_obj[_cO];
	}
	if(_ver=="")_ver="8,0,0,0"
	ihtm="<object classid=clsid:D27CDB6E-AE6D-11cf-96B8-444553540000 codebase=http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version="+_ver+" "+_output+">\n"
	ihtm+=_paramoutput+"\n"
	ihtm+="<embed "+_src+" pluginspage=http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash type=application/x-shockwave-flash "+_output+">\n";
	ihtm+="</embed>\n";
	ihtm+="</object>\n";
	document.getElementById(_container).innerHTML=ihtm	
}
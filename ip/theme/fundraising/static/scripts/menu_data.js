fixMozillaZIndex=true; //Fixes Z-Index problem  with Mozilla browsers but causes odd scrolling problem, toggle to see if it helps
_menuCloseDelay=100;
_menuOpenDelay=150;
_subOffsetTop=20;
_subOffsetLeft=-10;

with(menuStyle=new mm_style()){
bordercolor="#993300";
borderstyle="solid";
borderwidth=0;
fontfamily="Arial, Verdana, Tahoma";
fontsize="75%";
fontstyle="normal";
headerbgcolor="#993300";
headercolor="#993300";
offbgcolor="#993300";
offcolor="#993300";
onbgcolor="#993300";
oncolor="#993300";
padding=5;
pagebgcolor="#993300";
pagecolor="#999999";
separatorcolor="#993300";
separatorsize=10;
}

with(menuStyle7=new mm_style()){
bordercolor="#993300";
borderstyle="solid";
borderwidth=5;
fontfamily="Arial, Verdana, Tahoma";
fontsize="85%";
fontstyle="normal";
headerbgcolor="#993300";
headercolor="#000000";
offbgcolor="#993300";
offcolor="#FFFFFF";
onbgcolor="#993300";
oncolor="#999999";
rawcss="padding-left:10px;padding-right:10px";
padding=4;
pagebgcolor="#993300";
pagecolor="#999999";
separatorcolor="#993300";
separatorsize=10;
}

with(menuStyle2=new mm_style()){
bordercolor="#993300";
borderstyle="solid";
borderwidth=0;
fontfamily="Arial, Verdana, Tahoma";
fontsize="85%";
fontstyle="normal";
headerbgcolor="#993300";
headercolor="#000000";
offbgcolor="#993300";
offcolor="#FFFFFF";
onbgcolor="#993300";
oncolor="#999999";
rawcss="padding-left:6px;padding-right:10px";
padding=4;
pagebgcolor="#993300";
pagecolor="#999999";
separatorcolor="#993300";
separatorsize=1;
}

with(menuStyleSub=new mm_style()){
bordercolor="#993300";
borderstyle="solid";
borderwidth=0;
fontfamily="Arial, Verdana, Tahoma";
fontsize="85%";
fontstyle="normal";
headerbgcolor="#993300";
headercolor="#000000";
offbgcolor="#993300";
offcolor="#FFFFFF";
onbgcolor="#993300";
oncolor="#999999";
padding=2;
rawcss="padding-left:6px;padding-right:10px";
pagebgcolor="#993300";
pagecolor="#999999";
separatorcolor="#993300";
separatorsize=1;
}

with(milonic=new menuname("Learn")){
style=menuStyle2;
left="offset=-3";
aI("offfunction=on();onfunction=off();text=BROWSE PROFILES;url=http://www.innocenceproject.org/know/Browse-Profiles.php;");
aI("offfunction=on();onfunction=off();text=SEARCH PROFILES;url=http://www.innocenceproject.org/know/Search-Profiles.php;");
aI("offfunction=on();onfunction=off();text=CONVICTION MOVIE;url=http://www.innocenceproject.org/know/conviction/;");
aI("offfunction=on();onfunction=off();text=NON-DNA EXONERATIONS;url=http://www.innocenceproject.org/know/non-dna-exonerations.php;");
aI("offfunction=on();onfunction=off();text=AFTER EXONERATION<br><br>;url=http://www.innocenceproject.org/know/After-Exoneration.php;");
}

with(milonic=new menuname("Understand")){
style=menuStyle2;
left="offset=-10";
aI("offfunction=on();onfunction=off();text=EYEWITNESS MISIDENTIFICATION;url=http://www.innocenceproject.org/understand/Eyewitness-Misidentification.php;");
aI("offfunction=on();onfunction=off();text=UNVALIDATED OR IMPROPER FORENSIC SCIENCE;url=http://www.innocenceproject.org/understand/Unreliable-Limited-Science.php;");
aI("offfunction=on();onfunction=off();text=FALSE CONFESSIONS / ADMISSIONS;url=http://www.innocenceproject.org/understand/False-Confessions.php;");
aI("offfunction=on();onfunction=off();text=GOVERNMENT MISCONDUCT;url=http://www.innocenceproject.org/understand/Government-Misconduct.php;");
aI("offfunction=on();onfunction=off();text=INFORMANTS;url=http://www.innocenceproject.org/understand/Snitches-Informants.php;");
aI("offfunction=on();onfunction=off();text=BAD LAWYERING<br><br>;url=http://www.innocenceproject.org/understand/Bad-Lawyering.php;");
}

with(milonic=new menuname("Fix")){
style=menuStyle2;
left="offset=-10";
aI("showmenu=_Priority;text=PRIORITY ISSUES &raquo;;url=http://www.innocenceproject.org/fix/Priority-Issues.php;");
aI("offfunction=on();onfunction=off();text=MODEL LEGISLATION;url=http://www.innocenceproject.org/fix/Model-Legislation.php;");
aI("offfunction=on();onfunction=off();text=FEDERAL LEGISLATION;url=http://www.innocenceproject.org/fix/Federal-Legislation.php;");
aI("offfunction=on();onfunction=off();text=RELATED ISSUES;url=http://www.innocenceproject.org/fix/Related-Issues.php;");
aI("offfunction=on();onfunction=off();text=WHAT CAN I DO?;url=http://www.innocenceproject.org/fix/What-can-I-do.php;");
aI("offfunction=on();onfunction=off();text=YOUTH TAKE ACTION<br><br>;url=http://www.innocenceproject.org/fix/947/;");
}

with(milonic=new menuname("_Priority")){
style=menuStyleSub;
left="offset=10";
top="offset=-20";
aI("offfunction=on();onfunction=off();text=<div class=\"smallspace\"></div>Eyewitness Identification;url=http://www.innocenceproject.org/fix/Eyewitness-Identification.php;");
aI("offfunction=on();onfunction=off();text=Forensic Oversight;url=http://www.innocenceproject.org/fix/Crime-Lab-Oversight.php;");
aI("offfunction=on();onfunction=off();text=DNA Testing Access;url=http://www.innocenceproject.org/fix/DNA-Testing-Access.php;");
aI("offfunction=on();onfunction=off();text=Exoneree Compensation;url=http://www.innocenceproject.org/fix/Compensation.php;");
aI("offfunction=on();onfunction=off();text=Evidence Preservation;url=http://www.innocenceproject.org/fix/Evidence-Handling.php;");
aI("offfunction=on();onfunction=off();text=Innocence Commissions;url=http://www.innocenceproject.org/fix/Innocence-Commissions.php;");
aI("offfunction=on();onfunction=off();text=False Confessions<br><div class=\"smallspace\"></div>;url=http://www.innocenceproject.org/fix/False-Confessions.php;");
}








drawMenus();

fixMozillaZIndex=true; //Fixes Z-Index problem  with Mozilla browsers but causes odd scrolling problem, toggle to see if it helps
_menuCloseDelay=100;
_menuOpenDelay=150;


with(menuStyle4=new mm_style()){
bordercolor="#CC9900";
borderstyle="solid";
borderwidth=0;
fontfamily="Arial, Verdana, Tahoma";
fontsize="75%";
fontstyle="normal";
headerbgcolor="#CC9900";
headercolor="#CC9900";
offbgcolor="#CC9900";
offcolor="#CC9900";
onbgcolor="#CC9900";
oncolor="#CC9900";
padding=5;
pagebgcolor="#CC9900";
pagecolor="#666666";
}

with(menuStyle3=new mm_style()){
bordercolor="#CC9900";
borderstyle="solid";
borderwidth=0;
fontfamily="Arial, Verdana, Tahoma";
fontsize="85%";
fontstyle="normal";
headerbgcolor="#CC9900";
headercolor="#000000";
offbgcolor="#CC9900";
offcolor="#FFFFFF";
onbgcolor="#CC9900";
oncolor="#666666";
rawcss="padding-left:6px;padding-right:10px";
padding=4;
pagebgcolor="#CC9900";
pagecolor="#666666";
separatorcolor="#CC9900";
separatorsize=1;
}

with(menuStyleSub2=new mm_style()){
bordercolor="#CC9900";
borderstyle="solid";
borderwidth=0;
fontfamily="Arial, Verdana, Tahoma";
fontsize="85%";
fontstyle="normal";
headerbgcolor="#CC9900";
headercolor="#000000";
offbgcolor="#CC9900";
offcolor="#FFFFFF";
onbgcolor="#CC9900";
oncolor="#666666";
padding=2;
rawcss="padding-left:6px;padding-right:10px";
pagebgcolor="#CC9900";
pagecolor="#666666";
separatorcolor="#CC9900";
separatorsize=1;
}



with(milonic=new menuname("About")){
style=menuStyle3;
left="offset=-10";
aI("offfunction=on();onfunction=off();text=MISSION STATEMENT;url=http://www.innocenceproject.org/about/Mission-Statement.php;");
aI("offfunction=on();onfunction=off();text=FAQs;url=http://www.innocenceproject.org/about/FAQs.php;");
aI("offfunction=on();onfunction=off();text=BOARD OF DIRECTORS;url=http://www.innocenceproject.org/about/Board-of-Directors.php;");
aI("offfunction=on();onfunction=off();text=STAFF DIRECTORY;url=http://www.innocenceproject.org/about/Staff-Directory.php;");
aI("showmenu=_OPPORT;text=OPPORTUNITIES &raquo;;url=http://www.innocenceproject.org/about/Opportunities.php;");
aI("offfunction=on();onfunction=off();text=SPEAKERS' BUREAU;url=http://www.innocenceproject.org/Content/2030.php;");
aI("offfunction=on();onfunction=off();text=ARTISTS' COMMITTEE;url=http://www.innocenceproject.org/Content/1983.php;");
aI("offfunction=on();onfunction=off();text=OTHER PROJECTS;url=http://www.innocenceproject.org/about/Other-Projects.php;");
aI("offfunction=on();onfunction=off();text=CONTACT US<br><br>;url=http://www.innocenceproject.org/about/Contact-Us.php;");
}

with(milonic=new menuname("_OPPORT")){
style=menuStyleSub2;
left="offset=10";
top="offset=-20";
aI("offfunction=on();onfunction=off();text=<div class=\"smallspace\"></div>Internships;url=http://www.innocenceproject.org/about/Opportunities-Internships.php;");
aI("offfunction=on();onfunction=off();text=Employment;url=http://www.innocenceproject.org/about/Opportunities-Employment.php;");
aI("offfunction=on();onfunction=off();text=Volunteer<br><div class=\"smallspace\"></div>;url=http://www.innocenceproject.org/about/Opportunities-Volunteer.php;");
}

with(milonic=new menuname("Home")){
style=menuStyle3;
left="offset=-10";
}

with(milonic=new menuname("Donate")){
style=menuStyle3;
left="offset=-10";
//aI("offfunction=on();onfunction=off();text=CAPITAL CAMPAIGN;url=http://www.innocenceproject.org/donate/Capital-Campaign.php;");
aI("offfunction=on();onfunction=off();text=DONATE ONLINE;url=http://www.innocenceproject.org/donateonline;");
aI("offfunction=on();onfunction=off();text=DONATE BY MAIL/PHONE;url=http://www.innocenceproject.org/donate/Donate-By-Mail.php;");
aI("offfunction=on();onfunction=off();text=RECURRING DONATIONS;url=https://secure2.convio.net/ip/site/Donation2?idb=728777099&df_id=1202&1202.donation=root;");
aI("offfunction=on();onfunction=off();text=IN MEMORY;url=https://secure2.convio.net/ip/site/Donation2?idb=728777099&df_id=1601&1601.donation=root;");
aI("offfunction=on();onfunction=off();text=IN HONOR;url=https://secure2.convio.net/ip/site/Donation2?idb=191893903&df_id=1600&1600.donation=root;");
aI("offfunction=on();onfunction=off();text=MATCHING GIFTS;url=http://matchinggifts.com/innocenceproject/;");
aI("offfunction=on();onfunction=off();text=CREDIT CARD POINTS;url=https://secure2.convio.net/ip/site/SPageNavigator/Credit_Card_Points;");
aI("offfunction=on();onfunction=off();text=EXONEREE FUND;url=https://secure2.convio.net/ip/site/Donation2?idb=191893903&df_id=1180&1180.donation=root;");
aI("offfunction=on();onfunction=off();text=SPECIAL EVENTS;url=http://www.innocenceproject.org/Content/Special_Events.php;");
}

with(milonic=new menuname("News")){
style=menuStyle3;
left="offset=-10";
aI("offfunction=on();onfunction=off();text=INNOCENCE BLOG;url=http://www.innocenceproject.org/news/Blog.php;");
aI("offfunction=on();onfunction=off();text=PRESS RELEASES;url=http://www.innocenceproject.org/news/Press-Releases.php;");
aI("offfunction=on();onfunction=off();text=LEGAL INFORMATION;url=http://www.innocenceproject.org/news/Legal-Information.php;");
aI("offfunction=on();onfunction=off();text=FACT SHEETS;url=http://www.innocenceproject.org/news/Fact-Sheets.php;");
aI("offfunction=on();onfunction=off();text=VIDEO CENTER;url=http://www.innocenceproject.org/news/Video-Center.php;");
aI("offfunction=on();onfunction=off();text=REPORTS & PUBLICATIONS;url=http://www.innocenceproject.org/Content/Reports__Publications.php;");
aI("offfunction=on();onfunction=off();text=E-NEWSLETTERS;url=http://www.innocenceproject.org/Content/ENewsletters.php");
aI("offfunction=on();onfunction=off();text=NATIONAL VIEW;url=http://www.innocenceproject.org/news/National-View.php;");
aI("offfunction=on();onfunction=off();text=LINKS<br><br>;url=http://www.innocenceproject.org/news/Links.php;");
}

drawMenus();


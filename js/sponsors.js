//global variables
var pageCategory; //the category of the page (ie. LIT, Girls Encoded)

$(document).ready(function() {
    pageCategory = $('meta[name=category]').attr("content");

    //Dynamically load sponsors
     $.ajax({
        type: "GET",
        url: "../data/sponsors.csv",
        dataType: "text",
        success: function(data) {processRecentNews(data);}
    });
});

//Template:
//<p class="recent-news-date">Sample date0</p>
//<p class="lead">This is a description of what's happening0 (see more <a href="">here</a>)</p>
function processRecentNews(allText) {
    arrData = parseCsv(allText);
    
    var rowNum = -1;
    var index = 1;
    for (var i=1; i<arrData.length; i++) {
        var data = arrData[i];
        
        var sponsor = {image:data[0], category:data[1]};

        var allCats = sponsor.category.split(',');
        var found = 0;
        //Is the document category in this array?
        for(var j=0; j<allCats.length; j++) {
            if(allCats[j][0]==' ') {
                allCats[j] = allCats[j].substr(1);
            }
            if(pageCategory==allCats[j]) {
                found = 1;
                break;
            }
        }
        if(found==1) {
            if(index % 4 == 1) { //append new row
                rowNum = rowNum + 1;
                $('#sponsors').append('<div class="row" id="row' + rowNum +'">');
            }
            index = index + 1;
            
            entry = '<div class="col-md-3"><img src="images/sponsors/'+ sponsor.image + '" class="profile_pic"><p class="lead"><b></div>';
            $('#row' + rowNum).append(entry);
        }
    }
}
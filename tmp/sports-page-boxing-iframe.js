

$(document).ready(function() {
	
    // show /hide more text on movie synopsis
	$('.movie-row').delegate('a.more, a.less', 'click', function(e){
		e.preventDefault();
		$(this).parents('.movie-row').toggleClass('movierow-expanded');
	});
	
	
            
    $('.video-popup').colorbox({width:"600px", height: "500px", rel:"video-gallery", current: "{current} of {total}", title: function(){
        var titleCaption = $(this).find('.title').text();
        return titleCaption;
        }, cid: function(){
            var clipID = $(this).attr("id");
            return clipID;
        }
    });
    
    $("#lse-currentlyplaying #lse-movie-image").html("<div class='nowplaying'></div>");
    
    $(".fb-like").click(function(){
        var fbimage = $("#cp-moviethumb").val();
        window.open("http://www.facebook.com/sharer.php?s=100&p[url]=http://www.epixhd.com/sports&p[images][0]="+fbimage+"&p[title]=See The Action On EPIX Sports&p[summary]=Watch Live Boxing Events on EpixHD","sharer","toolbar=0,status=0,width=626,height=436");
        return false;
    });
    $('.video-popup').click(function(){
        var clipParentThumb = $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().find("#lse-movie-nowplaying").parent().attr("data-thumb");
        $("#fb-thumb").val(clipParentThumb);
    });
    
    $(document).bind('cbox_complete', function(){
        $('#cboxBottomCenter').html('<div class="social"><span class="twitter"></span><span class="facebook"></span></div>');
         
        // facebook button 
        $(".social .facebook").click(function(){
            var fbimage = $("#cboxLoadedContent img").attr('src');
            window.open("http://www.facebook.com/sharer.php?s=100&p[url]=http://www.epixhd.com/sports&p[images][0]="+fbimage+"&p[title]=See The Action On EPIX Sports&p[summary]=Watch the latest fights, plus see photos, videos and more on EPIX Sports.","sharer","toolbar=0,status=0,width=626,height=436");
        });
        
        // twitter button 
        $(document).delegate(".social .twitter", "click", function() {
            var twitterText   = "Get front row access to the latest fights on @EpixSports: ";
            var tweetURL = 'http://twitter.com/share?via=EpixHD&url=http://epx.ms/108teuQ&text=' + twitterText;
            window.open(tweetURL, 'twitter', 'toolbar=0,status=1,width=575,height=400');
            return false;
        });
        
    });
            
    /*
        have to fix the current of total bug
    */
    $('.video-popup').colorbox({width:"600px", height: "500px", rel:"video-gallery", current: "{current} of {total}", title: function(){
        var titleCaption = $(this).find('.title').text();
        return titleCaption;
        }, cid: function(){
            var clipID = $(this).attr("id");
            return clipID;
        }
    });
            
    /* 
        load a new movie when clicked on
        uncomment the following code for phase 2 of this Envelope Screening Series
    */
    
    
    /* scrollbar */
    function execScrollBar (rootElement) {
         $("#" + rootElement).mCustomScrollbar("horizontal",400,"easeOutCirc",1.05,"fixed","no","no",10);
    }
    
    
    $('.dragger').mouseover(function() {
        var parentElement = $(this).attr("data-id");
        $(this).parent().prevUntil('.horWrapper').find('li').show();        
        var draggerListSize = $(this).parent().prevUntil('.horWrapper').find('li').length;
        if (draggerListSize > 3) {

            execScrollBar(parentElement);
        }
        
       });
            
            
    if ($(".customScrollBox").length){
        var clListSize = $(this).find('li').length;
        if (clListSize > 4) {
            $('#collections .customScrollBox').find('li:gt(3)').hide();
        }
    }
            
    $("#lse-content > div").each(function(counter) {
        if($(this).find('li').length < 4){
            $(this).find('.dragger_container').hide();
        }
    });
            
            
    $("#lse-content > div").addClass("movie-row");
				$("#lse-currentlyplaying .row-2").addClass("movie-row");
				$("#lse-currentlyplaying .row-2").attr("id","currently-playing-video-row");

	$('.trailers-and-clips .video-popup').bind("click", showSlidePlayer);

        function showSlidePlayer(e) {
        	
        	e.preventDefault();
						
          $('.slidePlayerContainer').animate({height: '0px'}, 500, 'jswing', function() {
    		    $(this).remove();
    	    });
        	
						
        	//get the asset ID from the href
        	var href = $(this).attr("href");
        	href = href.replace("/epixassets/asset/","");
        	href = href.replace("/movie/","");
        	var assetId = href.substring(href.lastIndexOf('/')+1);


        	var parentDiv = $(this).parents('.movie-row');
    	    var divId = parentDiv.attr('id');

            slidePlayerContainer = $('<div class="slidePlayerContainer"></div>');
            slidePlayer = $('<div id="slidePlayer-'+divId+'"></div>');
            
            parentDiv.after(slidePlayerContainer);
           
            slidePlayerContainer.append(slidePlayer);
            contentDiv = $('<div class="slide-clip-content"></div>');
            slidePlayerContainer.prepend(contentDiv);
            
            showExtrasPlayer(assetId, 'slidePlayer-'+divId, contentDiv, "bottom");
            
            extrasPlayerEffectOpen(slidePlayerContainer);
    	                
    	    return false;
    	}
            
            
            function showExtrasPlayer(item, clipDiv, clipContentDiv, type) {

         
                var assetID = item;

                divID=clipDiv;

              $.getJSON('/ajax/asset/',{'asset_id':assetID, 'type':2},function(data){
                clipData = data;
                   if(data.success) {
                        if (type != 'fader'){
                            if(data.movie)
                                $(clipContentDiv).html('<div id="close'+type+'" class="close-player"><a href="#"><img src="http://content.epixhd.com/styleassets/closebutton.png" /></a></div><h1>'+data.movie.title+':<br/>'+data.title+'</h1>');
                            else
                                $(clipContentDiv).html('<div id="close'+type+'" class="close-player"><a href="#"><img src="http://content.epixhd.com/styleassets/closebutton.png" /></a></div><h1>'+data.title+'</h1>');                    
                            if(data.description) $(clipContentDiv).append('<p>'+data.description+'</p>');
                            //if(data.tags) $(clipContentDiv).append('<p>Tags: '+data.tags+'</p>');
                            

                                if(data.movie) {
                                    $(clipContentDiv).append('<h2><a href="'+data.movie.url+'">Go to the movie page</a></h2>');
                                }
                            
                            if ((user_status.loggedin) && (data.movie)) {
                                if(data.movie.inwindow){
                                    movieTagName = data.movie.url.split('.com/')[1];
                                    $(clipContentDiv).append('<h2><a href="/submit_schedule/'+movieTagName+'">watch with friends</a></h2>');
                                }
                            } 
                        } 
                        if(data.rating == "R"){ 
                            if(user_status.loggedin) y=2; //logged in so can watch
                            else y=0; //not logged in, prompt                             
                            var x = readCookie('epixAgeRating');
                            
                            if((x == 1) || (y == 2)) createClipPlayer(data, divID);
                            else{
                                $('#'+divID).empty().hide();
                                
                                if(type == "fader"){
                                    //$('.slideshow-slide').hide();
                                    $('#mature-gate').prependTo('#slideshow').css({'display':'block','position':'absolute','z-index':'10'});
                                    $('#slideshow-bg .loader .indicator').hide();
                                }   
                                else {
                                    if(type == 'bottom') sliderDiv = $('.slidePlayerContainer');
                                    else sliderDiv = $('#topSlidePlayerContainer'); 
                                    $('#mature-gate').appendTo(sliderDiv).show();
                                }
                                if ((x == 0) || (y == 1)) $('#gatekeeper').show(); //can't watch
                                else $('#rating-control').show(); //ask age 
                            }
                        }
                        else {
                            $('#'+divID).show();
                            $('#mature-gate').hide();
                            createClipPlayer(data, divID);
                        }
                   }
               });
            }//showExtrasPlayer
            
            
            
            
            function extrasPlayerEffectClose(div, type) {
            	
        	  //$('#mature-gate').appendTo($('#content')).hide();
        	    
        	  div.animate({height: '0px'}, 500, 'jswing', function() {
        	    //$(this).empty().remove();
        		div.remove();
        	  });
                
              return false;
              
            }//close effect
            
            
            function extrasPlayerEffectOpen(div) {
             	  div.animate({height: '245px'}, 1000, 'easeOutCubic', function() {
             	      //autoScroll(div);
             	  });
            }//open effect
            
            
            
            $(document).delegate('.close-player a','click', function(){
            	
        	    var thediv = $(this).parents('.slidePlayerContainer');

        	    //var divId = $(this).parents('.tab_content').attr('id');
        	    //$('#'+currentCategory+' .slidePlayerClip').removeClass('active');
        	    extrasPlayerEffectClose(thediv, "bottom");
        	
        	    return false;
        	});// close action
            
            
            function createClipPlayer(data,divID){
                //alert(divID);
                // Pass the movie information
                if(data.movie) {
                    var pid = data.movie.id;
                    var pname = data.movie.title;
                }
                else {
                    var pid = data.id;
                    var pname = data.category;
                }
                
                var flash_data = {
                    flashvars: {
                        
                        content_type:         'videoextra',
                        content_subtype:         data.category,
                        asset_id:        data.id,
                        asset_name:    data.category,
                        parent_title_asset_id:     pid,
                        parent_title_asset_name:     pname,
                        user_mso:       '0',
                        user_coupon:       '0',
                        anon_user_id:     '0',
                        mode:         'solo',
                        host:         false,
                        jsAPI:        true,
                        contentID:    'epix1',
                        playlist:     data.smil,
                        roomID:       '0',
                        username:     '',
                        userID:       '',
                        token:        '',
                        autoplay:      true,
						playerVersion: "2.0.37.1",
						config: 'client.config.v2.0.37.1.xml',
						thumbUrl: 'http://www.cbs.com/community/images/default_profile_image.png',
						profileUrl: 'http://www.example.com',
						pageUrl: 'http://epixplayer.clipsync.com/Epix.aspx'
                
                    },
                    params: {
                        id:            divID,
                        width:         440,
                        height:        215,
						quality: 'high',
						bgcolor: '#404040',
						allowscriptaccess: 'always',
						allowFullScreen: 'true',
						menu: 'false',
						wmode: 'transparent'
                    }
                };
            	UFLogEvent(pname, pid);	 
                swfobject.embedSWF('/Epix.v2.0.37.1.swf', flash_data.params.id, flash_data.params.width, flash_data.params.height, '10.0.0', '/static/js/expressInstall.swf', flash_data.flashvars, flash_data.params);
				//setupPlayer(flash_data);
                $('#slideshow-bg .loader .indicator').hide();
            }//createClipPlayer
            
            
            
        }); //end doc ready




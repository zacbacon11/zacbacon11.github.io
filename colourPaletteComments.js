

$(document).ready(function () {
		$.ajax({
            url: "instagramImageDataFilteredComments.csv",
            async: false,
            success: function (csvd) {
                data = $.csv.toArrays(csvd);
            },
            dataType: "text",
            complete: function () {

            	
            }
        });

                for(i = 1; i < 9; i++) {
                    console.log(i);
                    createElements();
                }

                            


	function createElements() {
	
		var ulElementContainer = document.getElementById('ulContainer');
		var liElement = document.createElement('li');

        var liID = 'liID' + i;

		liElement.setAttribute('class', 'imgfeedcontainer');
        liElement.setAttribute('id', liID);
		ulElementContainer.appendChild(liElement);

        liElement.setAttribute('onClick', 'logId(this.id)');

		var svgns = "http://www.w3.org/2000/svg";
		var svgElement = document.createElementNS(svgns, 'svg');
		svgElement.setAttribute('class', 'palettesvg');
		svgElement.setAttribute('id', 'svg' + i);
		svgElement.setAttribute('width', '100%');
		svgElement.setAttribute('height', '100%');
		svgElement.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

        liElement.appendChild(svgElement);

		var rectElement1 = document.createElementNS(svgns, 'rect');
		rectElement1.setAttribute('x', '0');
		rectElement1.setAttribute('y', '0');
		rectElement1.setAttribute('height', '100%');
		rectElement1.setAttribute('width', '100%');
		rectElement1.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

		svgElement.appendChild(rectElement1);

		var rectElement2 = document.createElementNS(svgns, 'rect');
		rectElement2.setAttribute('x', '50%');
		rectElement2.setAttribute('y', '0');
		rectElement2.setAttribute('height', '100%');
		rectElement2.setAttribute('width', '35%');
		rectElement2.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

		svgElement.appendChild(rectElement2);

        var rectElement3 = document.createElementNS(svgns, 'rect');
        rectElement3.setAttribute('x', '85%');
        rectElement3.setAttribute('y', '0');
        rectElement3.setAttribute('height', '100%');
        rectElement3.setAttribute('width', '16%');
        rectElement3.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

        svgElement.appendChild(rectElement3);





		console.log(i);
				var imgElement = document.createElement('img')
            	imgElement.setAttribute("src", data[i][2]);
                imgElement.setAttribute('class', 'mainImg');
            	liElement.appendChild(imgElement);

                var divElement = document.createElement('div');
                divElement.setAttribute('class','infoDiv');
            liElement.appendChild(divElement);

            var divLeftElement = document.createElement('div');
                divLeftElement.setAttribute('class','infoLeft');
            divElement.appendChild(divLeftElement);

            var divRightElement = document.createElement('div');
                divRightElement.setAttribute('class','infoRight');
            divElement.appendChild(divRightElement);

            var dpElement = document.createElement('img')
                dpElement.setAttribute("src", data[i][2]);
                dpElement.setAttribute('class','dpPic');
                dpElement.setAttribute('id','dp' + i);
                divLeftElement.appendChild(dpElement);

            var captionElement = document.createElement('p');
            captionElement.setAttribute('id','p' + i);
            captionElement.setAttribute('class','caption');
            divRightElement.appendChild(captionElement);

            var handleElement = document.createElement('h4');
            handleElement.setAttribute('id','hand' + i);
            handleElement.setAttribute('class','handle');
            divLeftElement.appendChild(handleElement);

            handleElement.innerHTML = '@MSFW16';




            }



    var counter = 1;   

    getColorJSONP();   

    



    function getColorJSONP() {

        $.ajax({
            url: 'http://mkweb.bcgsc.ca/color-summarizer/',
            async: true,
            type: 'GET',
            dataType: 'jsonp',
            jsonpCallback: 'colorsummary',
            data:{
                url: data[counter][2],
                precision: 'low',
                num_clusters: '3',
                jsonp: '1'
            },
            //Alter HTML elements and attributes
            success: function(result){
            	

            	//Find color value from JSONP output
               	var priColor = result.clusters['0'].rgb;
               	var secColor = result.clusters['1'].rgb;
                var terColor = result.clusters['2'].rgb;

                var priPercentage = result.clusters['0'].f;
                var secPercentage = result.clusters['1'].f;
                var terPercentage = result.clusters['2'].f;
                

                priPercentage = priPercentage.toFixed(2);
                secPercentage = secPercentage.toFixed(2);
                terPercentage = terPercentage.toFixed(2);

                priPercentage = priPercentage*100;
                secPercentage = secPercentage*100;
                terPercentage = 100 - (priPercentage + secPercentage);

                console.log(priColor);
                console.log(secColor);
                console.log(terColor);
                console.log(priPercentage);
                console.log(secPercentage);
                console.log(terPercentage);

               	//Set palette colors
               	var svgID = 'svg' + counter;
               	console.log(svgID);

               	var setPriColor = document.getElementById(svgID).children[0];
              	var setSecColor = document.getElementById(svgID).children[1];
                var setTerColor = document.getElementById(svgID).children[2];

                console.log(setPriColor);
                console.log(setSecColor);
                console.log(setTerColor);

		        setPriColor.setAttribute("style", "fill:rgb(" + priColor + ");");
                setPriColor.setAttribute("width", priPercentage + '%');

		        setSecColor.setAttribute("style", "fill:rgb(" + secColor + ");");
                setSecColor.setAttribute("width", secPercentage + '%');
                setSecColor.setAttribute("x", priPercentage + '%');

                var terStartPoint = priPercentage + secPercentage;

                setTerColor.setAttribute("style", "fill:rgb(" + terColor + ");");
                setTerColor.setAttribute("width", terPercentage + '%');
                setTerColor.setAttribute("x", terStartPoint + '%');

                var svgElem = document.getElementById(svgID);

                var comments = data[counter][6];
                var likes = data[counter][5];
                var caption = data[counter][4];

                var commentsMax = 89;
            

                

                function map_range(value, low1, high1, low2, high2) {
                    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
                }

                var svgOpacity = map_range(comments, 0, 100, 0.3, 0.9);

                svgElem.style.opacity = svgOpacity;

                capID = 'p' + counter;

                var capElement = document.getElementById(capID);
                capElement.innerHTML = caption;




                counter++;
               if(counter < 9) {
                getColorJSONP();
               }
		        

            }
        });
    }

    

    });







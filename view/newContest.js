var myApp = angular.module('ProjectApp', []);
 
myApp.controller('ProjectController', ['$scope', '$http', function($scope, $http,fileUpload){
    $scope.run=[];
    $scope.index=[];
    if(localStorage.getItem('index')==undefined){
      for(i=0;i<10;i++){$scope.index.push('Upload!');}
      localStorage.setItem('index',JSON.stringify($scope.index));
    }
    $scope.numberQuestion=localStorage.getItem('numberOfEntries')=='undefined'?'':localStorage.getItem('numberOfEntries');
    //if($scope.numberQuestion==undefined){$scope.numberQuestion=0;}



    $scope.callDown=function(){ 
      localStorage.setItem('clicked',0);
      localStorage.setItem('numberOfEntries',$scope.numberQuestion);
      $scope.numberQuestion=localStorage.getItem('numberOfEntries');
      $scope.index=JSON.parse(localStorage.getItem('index'));
      for(var i =0;i<localStorage.getItem('numberOfEntries');i++){$scope.run.push({'index':i,'button':$scope.index[i+1]});}
      smoothScroll(document.getElementById('second'));
    };

    $scope.getNumber=function(x){
      var temp=JSON.parse(localStorage.getItem('index'));
      temp[x]='Done';
      localStorage.setItem('index',JSON.stringify(temp));
    }


    $scope.requested = function(){

    if($scope.isadmin==1){
      window.location="request.html";
    }
    else{
      //alert('Yo boi');
      $scope.tell="";
      $http.get('/requestAdmin?name='+localStorage.getItem("storageName"))
      .success(function(response){
        if(response==1){$scope.tell="Successfull request!";}
        else if(response==-1){$scope.tell="Already request was made!";}
        else if(response==0){$scope.tell="Unsuccessfull request!";}
        document.getElementById('tellMessage').style.display="block"; 
      });
    }
  };

  $scope.getUserName = function(){
    var userLoggedIn = localStorage.getItem("storageName");
    var show="";

    $http.get('/getProfile?uname='+userLoggedIn)
    .success(function(response){
      console.log(response);
      $scope.marks=(response);
    });


    $http.get('/isAdmin?name='+userLoggedIn)
    .success(function(response){
      console.log(response);
      $scope.isadmin=response;
      if(response=="1"){
        show="Admin requests !";
        var mydiv = document.getElementById("uploadQuest");
        var aTag = document.createElement('a');
        aTag.setAttribute('href',"uploadQuestion.html");
        aTag.innerHTML = "Upload Question";
        mydiv.appendChild(aTag);

        var mydiv2 = document.getElementById("admin2");
        var aTag2 = document.createElement('a');
        aTag2.setAttribute('href',"request.html");
        aTag2.innerHTML = show;
        mydiv2.appendChild(aTag2);

      }
      else {
        show="Become admin !";
        var mydiv3 = document.getElementById("admin2");
        var aTag3 = document.createElement('a');
        aTag3.setAttribute('href','#');

        aTag3.innerHTML = show;
        mydiv3.appendChild(aTag3);
      }
    });

    $scope.usernameLoggedIn = userLoggedIn;
    $scope.score=[0.0,0.0,0.0,0.0];
    
    $http.get('/getScore?name='+userLoggedIn)
    .success(function(response){
      $scope.Answers = response;
      console.log(response);
      if(response!=0){
        
        var x=0,marks;
        for(i in response){
          if (response.hasOwnProperty(i)) {
            //$scope.display.push({'ques':i,'id':x, 'marks':$scope.marks[i]});
            x+=1;
          }
        }

        

        
        
        for(i=0;i<response.length;i++){
          //console.log(response[i]);
/*          if(response["naive"][1]=='-'){document.getElementById('naive').src="na.png";} 
          else if(response["naive"][1]=='0' && response["naive"][2]=='0' && response["naive"][3]=='0'){document.getElementById('naive').src="redCross.png";$scope.score[0]=0.0;}
          else if(response["naive"][1]=='1' && response["naive"][2]=='1' && response["naive"][3]=='1'){document.getElementById('naive').src="greenTick.jpg";$scope.score[0]=100;}
          else{document.getElementById('naive').src="alert.png";if(Number(response['naive'][1])+Number(response['naive'][2])+Number(response['naive'][3])==1){$scope.score[0]=33.3}else{$scope.score[0]=66.6;}}
*/

        } 
        /*if(response["naive"][1]=='-'){document.getElementById('naive').src="na.png";} 
        else if(response["naive"][1]=='0' && response["naive"][2]=='0' && response["naive"][3]=='0'){document.getElementById('naive').src="redCross.png";$scope.score[0]=0.0;}
        else if(response["naive"][1]=='1' && response["naive"][2]=='1' && response["naive"][3]=='1'){document.getElementById('naive').src="greenTick.jpg";$scope.score[0]=100;}
        else{document.getElementById('naive').src="alert.png";if(Number(response['naive'][1])+Number(response['naive'][2])+Number(response['naive'][3])==1){$scope.score[0]=33.3}else{$scope.score[0]=66.6;}}

        if(response["power"][1]=='-'){document.getElementById('power').src="na.png";}
        else if(response["power"][1]==0 && response["power"][2]==0 && response["power"][3]==0){document.getElementById('power').src="redCross.png";$scope.score[1]=0.0;}
        else if(response["power"][1]==1 && response["power"][2]==1 && response["power"][3]==1){document.getElementById('power').src="greenTick.jpg";$scope.score[1]=100;}
        else{document.getElementById('power').src="alert.png";if(Number(response['power'][1])+Number(response['power'][2])+Number(response['power'][3])==1){$scope.score[1]=33.3}else{$scope.score[1]=66.6;}}

        if(response["chess"][1]=='-'){document.getElementById('aston').src="na.png";}
        else if(response["chess"][1]==0 && response["chess"][2]==0 && response["chess"][3]==0){document.getElementById('aston').src="redCross.png";$scope.score[2]=0.0;}
        else if(response["chess"][1]==1 && response["chess"][2]==1 && response["chess"][3]==1){document.getElementById('aston').src="greenTick.jpg";$scope.score[2]=100;}
        else{document.getElementById('aston').src="alert.png";if(Number(response['naive'][1])+Number(response['naive'][2])+Number(response['naive'][3])==1){$scope.score[0]=33.3}else{$scope.score[0]=66.6;}}

        if(response["grasshopper"][1]=='-'){document.getElementById('ostap').src="na.png";}
        else if(response["grasshopper"][1]==0 && response["grasshopper"][2]==0 && response["grasshopper"][3]==0){document.getElementById('ostap').src="redCross.png";$scope.score[3]=0.0;}
        else if(response["grasshopper"][1]==1 && response["grasshopper"][2]==1 && response["grasshopper"][3]==1){document.getElementById('ostap').src="greenTick.jpg";$scope.score[3]=100;}
        else{document.getElementById('ostap').src="alert.png";if(Number(response['ostap'][1])+Number(response['ostap'][2])+Number(response['ostap'][3])==1){$scope.score[3]=33.3}else{$scope.score[3]=66.6;}}*/
      
      }
      else{
//        alert('Hi');
        document.getElementById('naive').src="na.png";
        document.getElementById('aston').src="na.png";
        document.getElementById('ostap').src="na.png";
        document.getElementById('power').src="na.png";
      }
      console.log($scope.score);

      console.log(localStorage.getItem('clicked'));

      if(localStorage.getItem('clicked')!=0){
        console.log(localStorage.getItem('clicked'));
        $scope.callDown();
      }

    });
  };

  $scope.getUserName();


}
]);


window.smoothScroll = function(target) {
            $('#second').show();
            var scrollContainer = target;
            do { //find scroll container
                scrollContainer = scrollContainer.parentNode;
                if (!scrollContainer) return;
                scrollContainer.scrollTop += 1;
            } while (scrollContainer.scrollTop == 0);

            var targetY = 0;
            do { //find the top of target relatively to the container
                if (target == scrollContainer) break;
                targetY += target.offsetTop;
            } while (target = target.offsetParent);

            scroll = function(c, a, b, i) {
                i++; if (i > 30) return;
                c.scrollTop = a + (b - a) / 30 * i;
                setTimeout(function(){ scroll(c, a, b, i); }, 20);
            }
            // start scrolling
            scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
            
        }

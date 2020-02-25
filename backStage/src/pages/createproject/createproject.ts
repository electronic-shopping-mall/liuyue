import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

/**
 * Generated class for the CreateprojectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-createproject',
  templateUrl: 'createproject.html',
})
export class CreateprojectPage {

  constructor(public http:HttpClient,public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
   // console.log('ionViewDidLoad CreateprojectPage');
    var input = document.getElementById("file_input");  
    var btn = document.getElementById("see_btn");
    var result,div;  
   
    if(typeof FileReader==='undefined'){  
        result.innerHTML = "抱歉，你的浏览器不支持 FileReader";  
        input.setAttribute('disabled','disabled');  
    }else{  
        input.addEventListener('change',readFile,false);  
    }　　　　　//handler  
  
     
      
      
    var dataArr = { data : [] }; //直接传base64数据  
    var fd = null;  //FormData方式发送请求  
     
     
    function readFile(){  
        console.log(222,this.files);  
            fd = new FormData();  
            var iLen = this.files.length; 
            console.log(iLen); 
        for(var i=0;i<iLen;i++){  
            if (!input['value'].match(/.jpg|.gif|.png|.bmp/i)){　　//判断上传文件格式  
                return alert("上传的图片格式不正确，请重新选择");  
            }  
            var reader = new FileReader();  
            fd.append(i,this.files[i]);  
            reader.readAsDataURL(this.files[i]);  //转成base64  
            var fileName = this.files[i].name; 
            reader.onload = function(e){  
                var imgMsg = {  
                    name : fileName,//获取文件名  
                    base64 : this.result   //reader.readAsDataURL方法执行完后，base64数据储存在reader.result里  
                }  
                dataArr.data.push(imgMsg); 
                console.log(dataArr.data); 
                result = '<div style="display:none" class="result" ><img src="'+this.result+'" alt=""/></div>';  
                div = document.createElement('div');  
                div.innerHTML = result;  
                div['className'] = 'float';  
                document.getElementsByClassName('imgdiv')[0].appendChild(div);  　　//插入dom树  
                var img = div.getElementsByTagName('img')[0];  
                img.onload = function(){  
                    var nowHeight = ReSizePic(this); //设置图片大小  
                    this.parentNode.style.display = 'block';  
                    var oParent = this.parentNode;  
                    if(nowHeight){  
                        oParent.style.paddingTop = (oParent.offsetHeight - nowHeight)/2 + 'px';  
                    }  
                }  
            }  
        }  
          
       
    }  
      
      
    function send(){  
        console.log("上传");
        $.ajax({  
            url:'http://47.93.236.222:8000/api/uploadproject',  
            type : 'post',  
            data : fd,  
            dataType: 'json',  
            processData: false,  // 用FormData传fd时需有这两项  
            contentType: false,  
            success : function(data){  
                console.log('返回的数据：'+JSON.stringify(data))  
          　}   
        })  
    }  
      
    var oBtn = document.getElementById('push_btn');
    oBtn.onclick=function(){  
            // if(!input.files.length){  
            //     return alert('请先选择文件');  
            // }  
        send();  
    }  
    function ReSizePic(ThisPic) {  
      var RePicWidth = 200; //这里修改为您想显示的宽度值  
    
      var TrueWidth = ThisPic.width; //图片实际宽度  
      var TrueHeight = ThisPic.height; //图片实际高度  
        
      if(TrueWidth>TrueHeight){  
          //宽大于高  
          var reWidth = RePicWidth;  
          ThisPic.width = reWidth;  
          //垂直居中  
          var nowHeight = TrueHeight * (reWidth/TrueWidth);  
          return nowHeight;  //将图片修改后的高度返回，供垂直居中用  
      }else{  
          //宽小于高  
          var reHeight = RePicWidth;  
          ThisPic.height = reHeight;  
      }  
    } 
  }
  


  
  //创建系统作品
//   projectID;//作品id
  keyword;//关键字
  context;//详情描述
  img;//作品图片
  place;//作品地点
  create(){
    // this.projectID=document.getElementById('projectID');
    this.place=document.getElementById('place');
    this.keyword=document.getElementById('keyword');
    this.context=document.getElementById('context');
    this.http.post('/api/officialProject/create',{context:this.context.value,keyword:this.keyword.value,place:this.place.value}).subscribe(data=>{
      console.log(data);
    })
    
  }

  back(){
    this.navCtrl.pop();
  }
}

window.onload = function(){
	let box = document.getElementById("box");
	let arrImgs = ["img/540-1.jpg","img/540-2.jpg","img/540-3.jpg","img/540-4.jpg","img/540-5.jpg"];

	let banner = {
		width:100,
		height:1.88,
		left:0,
		top:10,
		lisColor:"rgba(0,0,0,0)",
		imgNum:5,
		timeSpace:4000,
		liObj:{
			"border-radius":"50%",
			"border":"2px solid #523669",
			"cursor":"pointer",
			"display":"inline-block",
			"list-style":"none",
			"margin":"0 10px"
		}
	}

	banner.objBox = box;
	banner.imgSrc = arrImgs;
	let a = new GlideImgs(banner);
	a.ulBox(0,.1,.05,.05);
	a.imgsMove();
	box.onmouseover = function(){
		a.mouseover();
	}
	box.onmouseout = function(){
		a.mouseout();
	}
	console.log(!undefined);
}
//缺点：如果实例对象对方法做的修改会反映到原型prototype
function GlideImgs(obj){
		this.objBox = obj.objBox;
		this.width = obj.width;
		this.height = obj.height;
		this.left = obj.left;
		this.top = obj.top;
		this.lisColor = obj.lisColor;
		this.imgSrc = obj.imgSrc;
		this.imgNum = obj.imgNum;
		this.timeSpace = obj.timeSpace;
		this.spanLeft = null;
		this.spanRight = null;
		this.ordTimer = null;
		this.ord = 0;//记录图片序号
		this.liObj = obj.liObj;
		this.spanObjLeft  = obj.spanObjLeft;
		this.spanObjRight = obj.spanObjRight;
}	

	GlideImgs.prototype.ulBox = function(right,bottom,width,height){

				//初始化轮播框
				this.objBox.style.cssText = "overflow:hidden;margin:0 auto;"
				this.objBox.style.left = this.left+"rem";
				this.objBox.style.top = this.top+"rem";
				this.objBox.style.width = this.width+"%";
				this.objBox.style.height = this.height+"rem";

				for(let m=0;m<this.imgNum;m++){
					this.objBox.appendChild( document.createElement("img"));
				}
				
				this.img = this.objBox.children;
				for(let j=0;j<this.img.length;j++){
					this.img[j].style.cssText = "position:absolute;opacitys:0;filter:alpha(opacity=0)"
					this.img[j].style.width = this.width+"%";
					this.img[j].style.height = this.height+"rem";
					this.img[j].src = this.imgSrc[j];
				}
					this.img[0].style.zIndex = "1";
				let ul = document.createElement("ul");
				this.objBox.appendChild(ul);
				ul.style.cssText = "position:absolute;margin:0;z-index:20;width:100vw;height:.1rem;margin-left:-50px;padding:0;text-align:center";
				ul.style.right = right+"rem";
				ul.style.bottom = bottom+"rem";
				
				
				for(let i=0;i<this.imgNum;i++){
					let li = document.createElement("li");
					ul.appendChild(li);
					let styleli = "";
					for(let key in this.liObj){
						styleli += key+":"+this.liObj[key]+";";
					}
					li.style.cssText = styleli;
                    li.style.backgroundColor = this.lisColor;
                    li.style.verticalAlign = "top";
					li.style.width = width+"rem";
					li.style.height = height+"rem";
				}
				
				this.lis = this.objBox.lastElementChild.childNodes;
				this.lis[0].style.backgroundColor = '#F7B200';
				this.lis[0].style.border = "2px solid rgba(0,0,0,0)"; 
				for(let n=0;n<this.lis.length;n++){
					this.lis[n].onclick = ()=>{this.goImg(n);};
				}
				
				this.spanLeft = document.createElement("span");
				this.objBox.appendChild(this.spanLeft);
				// this.spanLeft.addEventListener("click",this.toLeft,false);
				this.spanLeft.onclick = ()=>{
					this.toLeft();
				}

				let stylespanLeft = "";
				for(let key in this.spanObjLeft){
					stylespanLeft += key+":"+this.spanObjLeft[key]+";";
				}
				this.spanLeft.style.cssText = stylespanLeft ;
				this.spanLeft.className = "banner-left-span";

				this.spanRight = document.createElement("span");
				this.objBox.appendChild(this.spanRight);
				// this.spanRight.addEventListener("click",this.toRight,false);
				this.spanRight.onclick = ()=>{
					this.toRight();
				}
				let stylespanRight = "";
				for(let key in this.spanObjRight){
					stylespanRight += key+":"+this.spanObjRight[key]+";";
				}
				this.spanRight.style.cssText = stylespanRight ;
				this.spanRight.className = "banner-right-span";
			}
			
	GlideImgs.prototype.imgsMove = function(){
				this.ordTimer = setInterval(()=>{
					let outOrd = this.ord;
					this.ord++;
					if(this.ord>this.imgNum-1){
						this.ord = 0;
					}
					this.changes(outOrd,this.ord);
					this.changeLis(this.ord);
				},this.timeSpace)
			}
			
	GlideImgs.prototype.toLeft = function(){
				let outOrd = this.ord
				this.ord--;
				if(this.ord<0){
					 this.ord = this.imgSrc.length-1;
				}
				this.changes(outOrd,this.ord);
				this.changeLis(this.ord);
			}

	GlideImgs.prototype.toRight = function(){
				let outOrd = this.ord;
				this.ord++;
				if(this.ord>this.imgSrc.length-1){
					 this.ord = 0;
				}
				console.log(outOrd,this.ord);
				console.log(this.imgSrc.length)
				this.changes(outOrd,this.ord);
				this.changeLis(this.ord);
			}

	GlideImgs.prototype.changes = function(outOrd,sub){
				//把指定的图片显示出来[outNum]淡出，[inNum]淡ru
				let imgs = this.objBox.children;
				for(var i=0;i<imgs.length-3;i++){
					imgs[i].style.zIndex = "0";
				}
				imgs[outOrd].style.zIndex = "2";
				imgs[sub].style.zIndex = "1";
				
				let opacitys = 0;
				let director = 1;
				let offTime = setInterval(function(){
					//改变数据
					opacitys = opacitys+director*0.05;
					//处理边界
						if(opacitys>=1){
							opacitys=1;
							clearInterval(offTime);
						}
					//改变样式
					imgs[outOrd].style.opacity =1-opacitys;
					imgs[sub].style.opacity = opacitys;	
					},this.timeSpace/2/(this.width/this.inc))
			}
			
	GlideImgs.prototype.changeLis = function(num){
				for(let i=0;i<this.lis.length;i++){
					this.lis[i].style.border = "2px solid #523669";
					this.lis[i].style.backgroundColor = this.lisColor;
				}
				this.lis[num].style.backgroundColor = "#F7B200";
				this.lis[num].style.border = "2px solid rgba(0,0,0,0)"; 
			}
			
	GlideImgs.prototype.goImg = function(num){
				window.clearInterval(this.ordTimer);
				let outOrd = ord;
				ord = num;
				this.changeLis(num);
				this.changes(outOrd,num);
				this.imgsMove();
			}

	GlideImgs.prototype.mouseover = function(){
			 window.clearInterval(this.ordTimer);
			}
		
	GlideImgs.prototype.mouseout = function(){
			this.imgsMove();
			}
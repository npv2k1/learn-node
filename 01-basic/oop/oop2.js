function khoaHoc(ten,hocphi){
	this.Ten=ten;
	this.Hocphi=hocphi;
}
khoaHoc.prototype.mota= function(){
	console.log("hello"+ this.Hocphi+this.Ten)
}
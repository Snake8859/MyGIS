package cn.gis.bean;
/**
 * 
 * @author Snake
 * 会员类
 */
public class User {

	
	  /*`openId` varchar(64) NOT NULL COMMENT '用户id',
  `nickName` varchar(64) DEFAULT NULL COMMENT '用户昵称',
  `sex` int(1) DEFAULT NULL COMMENT '用户性别',
  `province` varchar(64) DEFAULT NULL COMMENT '用户省份',
  `city` varchar(64) DEFAULT NULL COMMENT ' 用户城市',
  `isPay` int(1) DEFAULT NULL COMMENT '是否缴费',
  `signatureWord` varchar(256) DEFAULT NULL COMMENT '个性签名',*/
	
	private String openId;
	private String nickName;
	private int sex;
	private String province;
	private String city;
	private int isPay;
	private String signatureWord;
	
	
	public String getOpenId() {
		return openId;
	}
	public void setOpenId(String openId) {
		this.openId = openId;
	}
	public String getNickName() {
		return nickName;
	}
	public void setNickName(String nickName) {
		this.nickName = nickName;
	}
	public int getSex() {
		return sex;
	}
	public void setSex(int sex) {
		this.sex = sex;
	}
	public String getProvince() {
		return province;
	}
	public void setProvince(String province) {
		this.province = province;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public int getIsPay() {
		return isPay;
	}
	public void setIsPay(int isPay) {
		this.isPay = isPay;
	}
	public String getSignatureWord() {
		return signatureWord;
	}
	public void setSignatureWord(String signatureWord) {
		this.signatureWord = signatureWord;
	}
	@Override
	public String toString() {
		return "User [openId=" + openId + ", nickName=" + nickName + ", sex=" + sex + ", isPay=" + isPay + "]";
	}

	
	
	
}

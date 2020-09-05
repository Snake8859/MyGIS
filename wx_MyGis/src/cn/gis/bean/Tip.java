package cn.gis.bean;

public class Tip {
	/*  `tId` varchar(64) NOT NULL COMMENT '建议id',
  `tipWords` varchar(512) NOT NULL COMMENT '建议内容',
  `telePhone` varchar(64) DEFAULT NULL COMMENT '手机号码',
  `openId` varchar(64) NOT NULL,*/
	private String tId;
	private String openId;
	private String tipWords;
	private String telePhone;
	
	public String gettId() {
		return tId;
	}
	public void settId(String tId) {
		this.tId = tId;
	}
	public String getOpenId() {
		return openId;
	}
	public void setOpenId(String openId) {
		this.openId = openId;
	}
	public String getTipWords() {
		return tipWords;
	}
	public void setTipWords(String tipWords) {
		this.tipWords = tipWords;
	}
	public String getTelePhone() {
		return telePhone;
	}
	public void setTelePhone(String telePhone) {
		this.telePhone = telePhone;
	}
	
}
